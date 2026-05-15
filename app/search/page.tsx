import type { Metadata } from 'next';
import { searchPosts, DEMO_POSTS } from '@/lib/sanity';
import PostCard       from '@/components/ui/PostCard';
import SearchBar      from '@/components/ui/SearchBar';
import ScrollReveal   from '@/components/animations/ScrollReveal';
import PageTransition from '@/components/animations/PageTransition';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const query  = params.q ?? '';
  return {
    title:       query ? `Search: "${query}"` : 'Search',
    description: query ? `Search results for "${query}" on Senpai Spot.` : 'Search anime news, reviews, and manga on Senpai Spot.',
  };
}

const SUGGESTED = [
  'Demon Slayer', 'One Piece', 'Jujutsu Kaisen', 'Attack on Titan',
  'Solo Leveling', 'Frieren', 'Chainsaw Man', 'My Hero Academia',
];

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query  = (params.q ?? '').trim();

  let posts: typeof DEMO_POSTS = [];
  let usingFallback = false;

  if (query) {
    posts = await searchPosts(query, 20);
    if (posts.length === 0) {
      // Client-side fuzzy fallback with demo data
      posts = DEMO_POSTS.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.categories.some(c => c.toLowerCase().includes(query.toLowerCase()))
      );
      usingFallback = true;
    }
  }

  return (
    <PageTransition>
      {/* Search Header */}
      <div className="relative py-20 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500]/50 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-divider mx-auto mb-4" />
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-white mb-6">
            {query ? (
              <>Search: <span className="gradient-text">&ldquo;{query}&rdquo;</span></>
            ) : (
              <>Search <span className="gradient-text">Senpai Spot</span></>
            )}
          </h1>
          <SearchBar
            defaultValue={query}
            size="lg"
            placeholder="Search anime, reviews, manga..."
            autoFocus={!query}
            className="max-w-xl mx-auto"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* No query — show suggestions */}
        {!query && (
          <div className="text-center space-y-8">
            <div>
              <FiSearch className="text-orange-500/30 mx-auto mb-4" size={64} />
              <h2 className="text-xl font-cinzel font-bold text-white/60 mb-3">What are you looking for?</h2>
              <p className="text-white/35 text-sm">Try searching for your favourite anime, manga, or topic.</p>
            </div>
            <div>
              <p className="text-xs text-white/30 font-accent tracking-widest uppercase mb-4">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED.map(s => (
                  <Link
                    key={s}
                    href={`/search?q=${encodeURIComponent(s)}`}
                    className="tag-item"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div>
            {/* Result count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-white/40 font-accent">
                {posts.length > 0
                  ? `${posts.length} result${posts.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results for "${query}"`}
                {usingFallback && posts.length > 0 && (
                  <span className="ml-2 text-orange-500/60">(demo results)</span>
                )}
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {posts.map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 0.04} direction="up">
                    <PostCard post={post} index={i} priority={i < 4} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-6">
                <FiAlertCircle className="text-orange-500/30 mx-auto" size={56} />
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-white/60 mb-2">No Results Found</h3>
                  <p className="text-white/35 text-sm max-w-sm mx-auto">
                    We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a different keyword or browse our categories below.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/anime-news" className="btn-ghost text-sm py-2 px-5">Anime News</Link>
                  <Link href="/reviews"    className="btn-ghost text-sm py-2 px-5">Reviews</Link>
                  <Link href="/manga"      className="btn-ghost text-sm py-2 px-5">Manga</Link>
                  <Link href="/trending"   className="btn-ghost text-sm py-2 px-5">Trending</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
