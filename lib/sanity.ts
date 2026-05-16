import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { BlogPost, BlogCategory, PaginatedPosts } from '@/types'

// ─── Client ──────────────────────────────────────────────────────────────────

export const client = createClient({
  projectId: 'ttm6ob66',
  dataset:   'production',
  apiVersion: '2024-01-01',
  useCdn:    false,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) =>
  builder.image(source).auto('format').fit('max').url()

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countWords(body: any[]): number {
  if (!Array.isArray(body)) return 200
  return body.reduce((acc, block) => {
    if (block._type !== 'block' || !block.children) return acc
    return acc + block.children.reduce((a: number, c: any) =>
      a + (c.text ? c.text.split(/\s+/).length : 0), 0)
  }, 0)
}

function toPost(doc: any): BlogPost {
  const words = countWords(doc.body || [])
  return {
    id:          doc._id,
    title:       doc.title        || '',
    slug:        doc.slug?.current || '',
    excerpt:     doc.excerpt      || '',
    content:     doc.body         || [],
    author:      'Senpai Spot',
    publishedAt: doc.publishedAt  || doc._createdAt || new Date().toISOString(),
    updatedAt:   doc._updatedAt   || new Date().toISOString(),
    thumbnail:   doc.mainImage
      ? builder.image(doc.mainImage).width(800).height(450).url()
      : null,
    categories:  doc.categories   || [],
    tags:        doc.tags         || [],
    url:         `/post/${doc.slug?.current || ''}`,
    readingTime: Math.max(1, Math.round(words / 200)),
    featured:    doc.featured     || false,
  }
}

// ─── No-cache fetch wrapper ───────────────────────────────────────────────────
// Forces Next.js to skip its Data Cache for every Sanity query so
// publish/unpublish/delete in Sanity is reflected on the next page request.

const NO_CACHE = { next: { revalidate: 0 } } as const

function q(query: string, params?: Record<string, unknown>) {
  return client.fetch(query, params ?? {}, NO_CACHE)
}

// ─── Field projections ────────────────────────────────────────────────────────

const FIELDS = `
  _id, title, slug, excerpt, mainImage,
  categories, tags, publishedAt, _updatedAt, featured
`
const FIELDS_WITH_BODY = `${FIELDS}, body`

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getFeaturedPosts(count = 3): Promise<BlogPost[]> {
  try {
    const docs = await q(
      `*[_type == "post"] | order(publishedAt desc) [0...${count}] { ${FIELDS} }`
    )
    return docs.map(toPost)
  } catch (err) {
    console.error('[Sanity] getFeaturedPosts:', err)
    return []
  }
}

export async function getLatestPosts(count = 9): Promise<BlogPost[]> {
  try {
    const docs = await q(
      `*[_type == "post"] | order(publishedAt desc) [0...${count}] { ${FIELDS} }`
    )
    return docs.map(toPost)
  } catch (err) {
    console.error('[Sanity] getLatestPosts:', err)
    return []
  }
}

export async function getPosts(page = 1, perPage = 9): Promise<PaginatedPosts> {
  try {
    const start = (page - 1) * perPage
    const [docs, total] = await Promise.all([
      q(`*[_type == "post"] | order(publishedAt desc) [${start}...${start + perPage}] { ${FIELDS} }`),
      q(`count(*[_type == "post"])`),
    ])
    return {
      posts: docs.map(toPost),
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    }
  } catch (err) {
    console.error('[Sanity] getPosts:', err)
    return { posts: [], total: 0, page, perPage, totalPages: 0 }
  }
}

export async function getPostsByCategory(
  category: string, page = 1, perPage = 9
): Promise<PaginatedPosts> {
  try {
    const start = (page - 1) * perPage
    const [docs, total] = await Promise.all([
      q(
        `*[_type == "post" && $cat in categories] | order(publishedAt desc) [${start}...${start + perPage}] { ${FIELDS} }`,
        { cat: category }
      ),
      q(
        `count(*[_type == "post" && $cat in categories])`,
        { cat: category }
      ),
    ])
    return {
      posts: docs.map(toPost),
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    }
  } catch (err) {
    console.error('[Sanity] getPostsByCategory:', err)
    return { posts: [], total: 0, page, perPage, totalPages: 0 }
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const doc = await q(
      `*[_type == "post" && slug.current == $slug][0] { ${FIELDS_WITH_BODY} }`,
      { slug }
    )
    return doc ? toPost(doc) : null
  } catch (err) {
    console.error('[Sanity] getPostBySlug:', err)
    return null
  }
}

export async function getRelatedPosts(post: BlogPost, count = 3): Promise<BlogPost[]> {
  try {
    const cat = post.categories[0] || 'general'
    const docs = await q(
      `*[_type == "post" && _id != $id && $cat in categories] | order(publishedAt desc) [0...${count}] { ${FIELDS} }`,
      { id: post.id, cat }
    )
    return docs.map(toPost)
  } catch (err) {
    console.error('[Sanity] getRelatedPosts:', err)
    return []
  }
}

export async function searchPosts(query: string, count = 20): Promise<BlogPost[]> {
  try {
    const docs = await q(
      `*[_type == "post" && (title match $q || excerpt match $q)] | order(publishedAt desc) [0...${count}] { ${FIELDS} }`,
      { q: `*${query}*` }
    )
    return docs.map(toPost)
  } catch (err) {
    console.error('[Sanity] searchPosts:', err)
    return []
  }
}

const CATEGORY_DISPLAY: Record<string, string> = {
  'anime-news': 'Anime News',
  'reviews':    'Reviews',
  'manga':      'Manga',
  'trending':   'Trending',
}

export async function getCategories(): Promise<BlogCategory[]> {
  const cats = ['anime-news', 'reviews', 'manga', 'trending']
  try {
    const counts = await Promise.all(
      cats.map(cat =>
        q(`count(*[_type == "post" && $cat in categories])`, { cat })
      )
    )
    return cats.map((slug, i) => ({ name: CATEGORY_DISPLAY[slug] ?? slug, slug, count: counts[i] }))
  } catch {
    return cats.map(slug => ({ name: CATEGORY_DISPLAY[slug] ?? slug, slug, count: 0 }))
  }
}

// Empty fallback — no demo posts needed with Sanity
export const DEMO_POSTS: BlogPost[] = []
