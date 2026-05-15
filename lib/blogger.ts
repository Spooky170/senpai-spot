// ─────────────────────────────────────────────────────────────────────────────
//  Senpai Spot — Blogger RSS / JSON Feed Integration
//  Supports both Blogger JSON feed (alt=json) and Google Blogger API v3
// ─────────────────────────────────────────────────────────────────────────────

import {
  BlogPost,
  PaginatedPosts,
  BlogCategory,
  BloggerFeed,
} from '@/types';
import {
  stripHtml,
  extractFirstImage,
  calcReadingTime,
  slugify,
  truncate,
  decodeHtmlEntities,
  buildBloggerFeedUrl,
  getPlaceholderImage,
} from './utils';

const BLOGGER_ID    = process.env.BLOGGER_BLOG_ID          || '5909176973464303118';
const BLOGGER_API   = process.env.BLOGGER_API_KEY          || '';

// Resolve the base feed URL:
//   1. Prefer an explicit blogspot URL (NEXT_PUBLIC_BLOGGER_URL)
//   2. Fall back to the GData feeds endpoint using the numeric Blog ID
//      e.g. https://www.blogger.com/feeds/5909176973464303118/posts/default
const _rawUrl = process.env.NEXT_PUBLIC_BLOGGER_URL || '';
const BLOGGER_URL   = _rawUrl && _rawUrl !== 'https://yourblog.blogspot.com'
  ? _rawUrl
  : `https://www.blogger.com/feeds/${BLOGGER_ID}/posts/default`;

// Flag so buildBloggerFeedUrl knows whether to append /feeds/posts/default
const USING_ID_FEED = !process.env.NEXT_PUBLIC_BLOGGER_URL ||
  process.env.NEXT_PUBLIC_BLOGGER_URL === 'https://yourblog.blogspot.com';

const CACHE_TTL     = 5 * 60 * 1000; // 5 minutes

// ────────────── Simple in-memory cache ──────────────
const cache = new Map<string, { data: unknown; ts: number }>();

function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { cache.delete(key); return null; }
  return entry.data as T;
}
function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, ts: Date.now() });
}

// ────────────── Parse a raw Blogger JSON feed entry into BlogPost ──────────────
function parseEntry(entry: Record<string, unknown>): BlogPost {
  // Title
  const titleObj = entry['title'] as Record<string, unknown> | undefined;
  const title = decodeHtmlEntities(String(titleObj?.['$t'] ?? ''));

  // Links — find the alternate link (public post URL)
  const links = (entry['link'] as Array<Record<string, string>> | undefined) ?? [];
  const altLink = links.find(l => l['rel'] === 'alternate');
  const url = altLink?.['href'] ?? '';

  // Content / summary
  const contentObj = entry['content'] as Record<string, unknown> | undefined;
  const summaryObj = entry['summary'] as Record<string, unknown> | undefined;
  const rawContent = String(contentObj?.['$t'] ?? summaryObj?.['$t'] ?? '');
  const content = rawContent;

  // Excerpt
  const plain   = stripHtml(rawContent);
  const excerpt = truncate(plain, 200);

  // Dates
  const publishedObj = entry['published'] as Record<string, unknown> | undefined;
  const updatedObj   = entry['updated']   as Record<string, unknown> | undefined;
  const publishedAt  = String(publishedObj?.['$t'] ?? '');
  const updatedAt    = String(updatedObj?.['$t']   ?? publishedAt);

  // Author
  const authorArr    = entry['author'] as Array<Record<string, unknown>> | undefined;
  const authorNameObj = authorArr?.[0]?.['name'] as Record<string, unknown> | undefined;
  const author       = String(authorNameObj?.['$t'] ?? 'Senpai Spot');

  // Categories (labels in Blogger)
  const categoryArr  = entry['category'] as Array<Record<string, string>> | undefined;
  const categories   = (categoryArr ?? []).map(c => c['term'] ?? '').filter(Boolean);
  const tags         = categories;

  // Thumbnail — try media:thumbnail first, then first <img> in content
  const mediaThumbnail = entry['media$thumbnail'] as Record<string, string> | undefined;
  let thumbnail: string | null = mediaThumbnail?.['url'] ?? null;
  if (!thumbnail) thumbnail = extractFirstImage(rawContent);
  if (thumbnail) {
    // Upgrade low-res blogger thumbnails
    thumbnail = thumbnail.replace(/\/s\d+(-c)?\//, '/s800/').replace(/=s\d+(-c)?$/, '=s800');
  }
  if (!thumbnail) thumbnail = getPlaceholderImage(title);

  // ID / slug
  const idObj = entry['id'] as Record<string, unknown> | undefined;
  const rawId = String(idObj?.['$t'] ?? url);
  const id    = rawId.split('post-').pop() ?? slugify(title);
  const slug  = slugify(title) || id;

  // Reading time
  const readingTime = calcReadingTime(rawContent);

  return {
    id,
    title,
    slug,
    excerpt,
    content,
    author,
    publishedAt,
    updatedAt,
    thumbnail,
    categories,
    tags,
    url,
    readingTime,
  };
}

// ────────────── Fetch JSON feed from Blogger ──────────────
async function fetchFeed(url: string): Promise<BloggerFeed> {
  const cached = getCache<BloggerFeed>(url);
  if (cached) return cached;

  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) throw new Error(`Blogger feed error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  const feed = json['feed'] as Record<string, unknown>;

  const titleObj = feed['title'] as Record<string, unknown> | undefined;
  const updObj   = feed['updated'] as Record<string, unknown> | undefined;
  const totalObj = feed['openSearch$totalResults'] as Record<string, unknown> | undefined;

  const entries  = ((feed['entry'] as Array<Record<string, unknown>>) ?? []).map(parseEntry);
  const result: BloggerFeed = {
    title:   String(titleObj?.['$t'] ?? 'Senpai Spot'),
    updated: String(updObj?.['$t']   ?? ''),
    entries,
    total:   Number(totalObj?.['$t'] ?? entries.length),
  };

  setCache(url, result);
  return result;
}

// ────────────── PUBLIC API ──────────────

/**
 * Fetch paginated posts from the Blogger JSON feed.
 */
export async function getPosts(
  page    = 1,
  perPage = 9,
  label?:  string,
): Promise<PaginatedPosts> {
  const startIndex = (page - 1) * perPage + 1;
  const url = buildBloggerFeedUrl(BLOGGER_URL, {
    maxResults: perPage,
    startIndex,
    label,
  });

  try {
    const feed   = await fetchFeed(url);
    const posts  = feed.entries as BlogPost[];

    return {
      posts,
      total:      feed.total,
      page,
      perPage,
      totalPages: Math.ceil(feed.total / perPage),
    };
  } catch (error) {
    console.error('[Blogger] getPosts error:', error);
    return { posts: [], total: 0, page, perPage, totalPages: 0 };
  }
}

/**
 * Fetch a single post by its slug.
 * Searches recent posts and matches by slugified title.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Fetch a batch and find by slug
    const url  = buildBloggerFeedUrl(BLOGGER_URL, { maxResults: 50 });
    const feed = await fetchFeed(url);
    const post = (feed.entries as BlogPost[]).find(p => p.slug === slug);
    return post ?? null;
  } catch (error) {
    console.error('[Blogger] getPostBySlug error:', error);
    return null;
  }
}

/**
 * Fetch featured posts (latest N posts).
 */
export async function getFeaturedPosts(count = 3): Promise<BlogPost[]> {
  try {
    const url  = buildBloggerFeedUrl(BLOGGER_URL, { maxResults: count });
    const feed = await fetchFeed(url);
    return (feed.entries as BlogPost[]).slice(0, count);
  } catch (error) {
    console.error('[Blogger] getFeaturedPosts error:', error);
    return [];
  }
}

/**
 * Fetch latest posts.
 */
export async function getLatestPosts(count = 6): Promise<BlogPost[]> {
  try {
    const url  = buildBloggerFeedUrl(BLOGGER_URL, { maxResults: count });
    const feed = await fetchFeed(url);
    return feed.entries as BlogPost[];
  } catch (error) {
    console.error('[Blogger] getLatestPosts error:', error);
    return [];
  }
}

/**
 * Search posts by query string.
 */
export async function searchPosts(query: string, maxResults = 20): Promise<BlogPost[]> {
  if (!query.trim()) return [];
  try {
    const url  = buildBloggerFeedUrl(BLOGGER_URL, { maxResults, query });
    const feed = await fetchFeed(url);
    return feed.entries as BlogPost[];
  } catch (error) {
    console.error('[Blogger] searchPosts error:', error);
    return [];
  }
}

/**
 * Fetch all categories/labels used in the blog.
 * Uses the Blogger API if key + blog ID are available,
 * otherwise falls back to parsing a large feed batch.
 */
export async function getCategories(): Promise<BlogCategory[]> {
  // If API key + blog ID are set, use the labels endpoint
  if (BLOGGER_API && BLOGGER_ID) {
    const cacheKey = 'categories';
    const cached   = getCache<BlogCategory[]>(cacheKey);
    if (cached) return cached;

    try {
      const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_ID}/posts?key=${BLOGGER_API}&maxResults=500&fields=items(labels)`;
      const res    = await fetch(apiUrl, { next: { revalidate: 3600 } });
      const json   = await res.json();

      const count: Record<string, number> = {};
      for (const item of json.items ?? []) {
        for (const label of item.labels ?? []) {
          count[label] = (count[label] ?? 0) + 1;
        }
      }

      const cats: BlogCategory[] = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .map(([name, cnt]) => ({ name, slug: slugify(name), count: cnt }));

      setCache(cacheKey, cats);
      return cats;
    } catch {/* fall through */}
  }

  // Fallback: parse a large JSON feed
  try {
    const url  = buildBloggerFeedUrl(BLOGGER_URL, { maxResults: 50 });
    const feed = await fetchFeed(url);
    const count: Record<string, number> = {};
    for (const post of feed.entries as BlogPost[]) {
      for (const cat of post.categories) {
        count[cat] = (count[cat] ?? 0) + 1;
      }
    }
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map(([name, cnt]) => ({ name, slug: slugify(name), count: cnt }));
  } catch (error) {
    console.error('[Blogger] getCategories error:', error);
    return [];
  }
}

/**
 * Get posts by category label.
 */
export async function getPostsByCategory(
  categoryLabel: string,
  page    = 1,
  perPage = 9,
): Promise<PaginatedPosts> {
  return getPosts(page, perPage, categoryLabel);
}

/**
 * Get related posts (same category, excluding current post).
 */
export async function getRelatedPosts(post: BlogPost, count = 3): Promise<BlogPost[]> {
  try {
    const label = post.categories[0];
    if (!label) return getLatestPosts(count);

    const url  = buildBloggerFeedUrl(BLOGGER_URL, { maxResults: 10, label });
    const feed = await fetchFeed(url);
    return (feed.entries as BlogPost[])
      .filter(p => p.id !== post.id)
      .slice(0, count);
  } catch (error) {
    console.error('[Blogger] getRelatedPosts error:', error);
    return [];
  }
}

// Demo/fallback posts when the Blogger feed is not yet configured
export const DEMO_POSTS: BlogPost[] = Array.from({ length: 9 }, (_, i) => ({
  id:          `demo-${i + 1}`,
  title:       [
    'Demon Slayer Season 4 — Full Season Review',
    'Solo Leveling Manhwa vs Anime: Which Is Better?',
    'Top 10 Anime of Spring 2025 You Must Watch',
    'Jujutsu Kaisen Chapter 270 — Major Spoilers!',
    'One Piece: The Final Saga Explained',
    'Attack on Titan Legacy — Why It Changed Anime Forever',
    'Chainsaw Man Part 2 Manga Review',
    'Frieren: Beyond Journey\'s End — A Masterpiece?',
    'My Hero Academia Season 8 Announcement',
  ][i],
  slug:        [
    'demon-slayer-season-4-review',
    'solo-leveling-manhwa-vs-anime',
    'top-10-anime-spring-2025',
    'jujutsu-kaisen-chapter-270-spoilers',
    'one-piece-final-saga-explained',
    'attack-on-titan-legacy',
    'chainsaw-man-part-2-review',
    'frieren-beyond-journey-end-review',
    'my-hero-academia-season-8',
  ][i],
  excerpt:     'This is a placeholder post. Connect your Blogger blog via the environment variables to see your real content here.',
  content:     '<p>This is a placeholder post. Connect your Blogger blog via the environment variables to see your real content here.</p>',
  author:      'Senpai Spot',
  publishedAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
  updatedAt:   new Date(Date.now() - i * 86400000).toISOString(),
  thumbnail:   null,
  categories:  [['anime', 'manga', 'review', 'news', 'trending', 'manga', 'review', 'anime', 'news'][i]],
  tags:        [['anime', 'manga', 'review', 'news', 'trending', 'manga', 'review', 'anime', 'news'][i]],
  url:         `https://senpaispot.blogspot.com/demo-${i + 1}`,
  readingTime: Math.ceil(Math.random() * 8) + 2,
}));
