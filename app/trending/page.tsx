import type { Metadata } from 'next';
import { getLatestPosts, DEMO_POSTS } from '@/lib/sanity';
import PostCard       from '@/components/ui/PostCard';
import ScrollReveal   from '@/components/animations/ScrollReveal';
import PageTransition from '@/components/animations/PageTransition';
import { FiTrendingUp, FiZap } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Trending',
  description: "What's hot in anime right now. Discover the trending anime, manga, and news stories on Senpai Spot.",
};
export const dynamic = 'force-dynamic';

export default async function TrendingPage() {
  let posts = await getLatestPosts(12);
  if (posts.length === 0) posts = DEMO_POSTS;

  // Split into hot (top 3) and trending (rest)
  const hotPosts      = posts.slice(0, 3);
  const trendingPosts = posts.slice(3);

  return (
    <PageTransition>
      <div className="relative py-20 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/15 via-[#1a0500]/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel font-black text-white mb-4">
            {"What's"} <span className="gradient-text">Trending</span>
          </h1>
          <p className="text-white/45 text-base sm:text-lg max-w-xl">
            The hottest anime content right now -- real-time trending picks from the community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Hot right now -- top 3 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <FiZap className="text-orange-500" size={22} />
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
              Hot Right Now
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {hotPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <div className="relative">
                  <PostCard post={post} index={i} priority />
                  {/* Hot badge */}
                  <div className="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-orange">
                    <span className="text-white text-xs font-bold font-accent">#{i + 1}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* More trending */}
        {trendingPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <FiTrendingUp className="text-orange-500" size={22} />
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                Also Trending
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trendingPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.05} direction="up">
                  <PostCard post={post} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
