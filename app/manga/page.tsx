import type { Metadata } from 'next';
import { getPostsByCategory, getLatestPosts, DEMO_POSTS } from '@/lib/sanity';
import PostCard       from '@/components/ui/PostCard';
import Sidebar        from '@/components/layout/Sidebar';
import ScrollReveal   from '@/components/animations/ScrollReveal';
import PageTransition from '@/components/animations/PageTransition';

export const metadata: Metadata = {
  title: 'Manga',
  description: 'Manga news, reviews, chapter discussions and recommendations. Stay updated with the best manga on Senpai Spot.',
};
export const revalidate = 300;

interface PageProps { searchParams: Promise<{ page?: string }> }

export default async function MangaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page   = Math.max(1, parseInt(params.page ?? '1', 10));

  let { posts, totalPages } = await getPostsByCategory('manga', page, 9);
  if (posts.length === 0) posts = DEMO_POSTS.filter(p => p.categories.includes('manga'));
  if (posts.length === 0) posts = DEMO_POSTS.slice(0, 9);

  const trending = await getLatestPosts(5);

  return (
    <PageTransition>
      <div className="relative py-20 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel font-black text-white mb-4">
            <span className="gradient-text">Manga</span> Universe
          </h1>
          <p className="text-white/45 text-base sm:text-lg max-w-xl">
            Chapter discussions, manga reviews, and the latest releases from the world of manga.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.04} direction="up">
                  <PostCard post={post} index={i} priority={i < 3} />
                </ScrollReveal>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {page > 1 && <a href={`/manga?page=${page - 1}`} className="btn-ghost py-2 px-5 text-sm">← Previous</a>}
                <span className="flex items-center px-4 text-sm text-white/40 font-accent">Page {page} of {totalPages}</span>
                {page < totalPages && <a href={`/manga?page=${page + 1}`} className="btn-primary py-2 px-5 text-sm">Next →</a>}
              </div>
            )}
          </div>
          <ScrollReveal direction="right" delay={0.2}>
            <Sidebar trendingPosts={trending.length ? trending : DEMO_POSTS.slice(0, 5)} />
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
