import type { Metadata } from 'next';
import { getPostsByCategory, getLatestPosts, DEMO_POSTS } from '@/lib/blogger';
import PostCard       from '@/components/ui/PostCard';
import Sidebar        from '@/components/layout/Sidebar';
import ScrollReveal   from '@/components/animations/ScrollReveal';
import PageTransition from '@/components/animations/PageTransition';

export const metadata: Metadata = {
  title: 'Anime Reviews',
  description: 'In-depth anime reviews covering all seasons and genres. Find out which anime is worth watching with expert analysis from Senpai Spot.',
};

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ReviewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page   = Math.max(1, parseInt(params.page ?? '1', 10));

  let { posts, totalPages } = await getPostsByCategory('reviews', page, 9);
  if (posts.length === 0) posts = DEMO_POSTS.filter(p => p.categories.includes('reviews'));
  if (posts.length === 0) posts = DEMO_POSTS.slice(0, 9);

  const trending = await getLatestPosts(5);

  // Star rating display for reviews
  const getRating = (id: string) => {
    const ratings = [9.2, 8.8, 9.5, 7.9, 8.4, 9.1, 8.7, 9.3, 8.1];
    const idx = parseInt(id.replace(/\D/g, '').slice(-1) || '0', 10);
    return ratings[idx % ratings.length];
  };

  return (
    <PageTransition>
      {/* Banner */}
      <div className="relative py-20 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel font-black text-white mb-4">
            Anime <span className="gradient-text">Reviews</span>
          </h1>
          <p className="text-white/45 text-base sm:text-lg max-w-xl">
            Deep-dive reviews and honest ratings for the anime you love — and the ones you should skip.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12">

          <div>
            {/* Score legend */}
            <div className="flex items-center gap-2 mb-8 p-3 rounded-xl bg-dark-700 border border-orange-500/10">
              <span className="text-xs text-white/40 font-accent tracking-wider uppercase">Score Guide:</span>
              {[
                { label: 'Must Watch', color: 'text-green-400', min: 9 },
                { label: 'Great',      color: 'text-orange-400', min: 8 },
                { label: 'Good',       color: 'text-yellow-400', min: 7 },
              ].map(s => (
                <span key={s.label} className={`text-xs font-semibold font-accent ${s.color} px-2 py-0.5 rounded border border-current/20`}>
                  {s.min}+ — {s.label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.04} direction="up">
                  <div className="relative">
                    <PostCard post={post} index={i} priority={i < 3} />
                    {/* Score badge overlay */}
                    <div className="absolute top-14 right-3 z-10 w-10 h-10 rounded-full bg-[#0a0a0a]/90 border-2 border-orange-500 flex items-center justify-center shadow-orange">
                      <span className="text-xs font-bold text-orange-500 font-accent">
                        {getRating(post.id).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {page > 1 && (
                  <a href={`/reviews?page=${page - 1}`} className="btn-ghost py-2 px-5 text-sm">← Previous</a>
                )}
                <span className="flex items-center px-4 text-sm text-white/40 font-accent">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <a href={`/reviews?page=${page + 1}`} className="btn-primary py-2 px-5 text-sm">Next →</a>
                )}
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
