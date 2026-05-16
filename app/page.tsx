import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { getFeaturedPosts, getLatestPosts, getCategories, DEMO_POSTS } from '@/lib/sanity';
import HeroSection    from '@/components/sections/HeroSection';
import SectionHeader  from '@/components/sections/SectionHeader';
import PostCard       from '@/components/ui/PostCard';
import FeaturedPostCard from '@/components/ui/FeaturedPostCard';
import Sidebar        from '@/components/layout/Sidebar';
import ScrollReveal   from '@/components/animations/ScrollReveal';

export const metadata: Metadata = {
  title: 'Senpai Spot — Your Ultimate Anime Destination',
  description: 'Your go-to source for the latest anime news, in-depth reviews, manga updates, and trending discussions.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featuredPosts  = await getFeaturedPosts(3);
  let latestPosts    = await getLatestPosts(9);
  let categories     = await getCategories();

  // Fall back to demo data if Blogger is not configured
  const usingDemo = featuredPosts.length === 0;
  if (usingDemo) {
    featuredPosts = DEMO_POSTS.slice(0, 3);
    latestPosts   = DEMO_POSTS;
  }

  const trendingPosts = latestPosts.slice(0, 5);
  const tags          = categories.map(c => c.name);

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection featuredPosts={featuredPosts} />

      {/* ── Demo notice ── */}
      {usingDemo && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-500/8 border border-orange-500/20 text-sm text-orange-400/80">
            <FiZap className="flex-shrink-0" size={16} />
            <span>
              No posts yet. Go to{' '}
              <a href="https://senpaispot.sanity.studio/studio" className="underline text-orange-400" target="_blank">senpaispot.sanity.studio</a>{' '}
              to create and publish your first post.
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16">

        {/* ── Featured Posts Grid ── */}
        <ScrollReveal>
          <section>
            <SectionHeader
              title="Featured Posts"
              accentWord="Featured"
              subtitle="Hand-picked stories from the anime world"
              action={{ label: 'View All', href: '/anime-news' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredPosts.map((post, i) => (
                <FeaturedPostCard key={post.id} post={post} index={i} large={i === 0} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Latest Posts + Sidebar ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12">

            {/* Posts grid */}
            <div>
              <ScrollReveal>
                <SectionHeader
                  title="Latest Posts"
                  accentWord="Latest"
                  subtitle="Stay up to date with fresh anime content"
                  action={{ label: 'View All', href: '/anime-news' }}
                />
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {latestPosts.map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 0.04} direction="up">
                    <PostCard post={post} index={i} />
                  </ScrollReveal>
                ))}
              </div>
              {latestPosts.length > 0 && (
                <ScrollReveal delay={0.3}>
                  <div className="flex justify-center mt-10">
                    <Link href="/anime-news" className="btn-ghost flex items-center gap-2 group">
                      Load More Posts
                      <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <ScrollReveal direction="right" delay={0.2}>
              <Sidebar
                trendingPosts={trendingPosts}
                categories={categories.slice(0, 8)}
                tags={tags.slice(0, 20)}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ── Categories Band ── */}
        {categories.length > 0 && (
          <ScrollReveal>
            <section>
              <SectionHeader title="Browse by Category" accentWord="Category" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Anime News', href: '/anime-news',  emoji: '📺' },
                  { label: 'Reviews',    href: '/reviews',     emoji: '⭐' },
                  { label: 'Manga',      href: '/manga',       emoji: '📖' },
                  { label: 'Trending',   href: '/trending',    emoji: '🔥' },
                  { label: 'General',    href: '/search?q=general',    emoji: '✍️' },
                ].map(cat => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-700 border border-orange-500/8 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 group text-center"
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-xs font-accent font-semibold tracking-wider uppercase text-white/50 group-hover:text-orange-400 transition-colors">
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

      </div>
    </>
  );
}
