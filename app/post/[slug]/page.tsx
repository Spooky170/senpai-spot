import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiShare2, FiTag } from 'react-icons/fi';
import { FaXTwitter, FaFacebook, FaReddit } from 'react-icons/fa6';
import { getPostBySlug, getRelatedPosts, DEMO_POSTS } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { getCategoryColor, getCategoryLabel } from '@/lib/utils';
import PostCard       from '@/components/ui/PostCard';
import ScrollReveal   from '@/components/animations/ScrollReveal';
import PageTransition from '@/components/animations/PageTransition';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug)
    || DEMO_POSTS.find(p => p.slug === slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title:       post.title,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      images:      post.thumbnail ? [{ url: post.thumbnail }] : [],
      type:        'article',
      publishedTime: post.publishedAt,
      modifiedTime:  post.updatedAt,
      authors:     [post.author],
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.excerpt,
      images:      post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = await getPostBySlug(slug);
  if (!post) post = DEMO_POSTS.find(p => p.slug === slug) ?? null;
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);
  const relatedFallback = related.length ? related : DEMO_POSTS.filter(p => p.id !== post!.id).slice(0, 3);

  const category    = post.categories[0] || 'general';
  const postUrl     = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://senpaispot.com'}/post/${post.slug}`;
  const tweetText   = encodeURIComponent(`${post.title} via @senpaispot`);

  return (
    <PageTransition>
      <article>
        {/* Post header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
          <div className="mb-6">
            {/* Back link */}
            <Link
              href={`/${category === 'reviews' ? 'reviews' : category === 'manga' ? 'manga' : 'anime-news'}`}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-orange-400 transition-colors font-accent tracking-wider uppercase mb-6"
            >
              <FiArrowLeft size={12} />
              Back
            </Link>

            {/* Category badge */}
            <div className="mb-4">
              <span className={`category-badge border ${getCategoryColor(category)}`}>
                {getCategoryLabel(category)}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-cinzel font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6 text-balance">
              {post.title}
            </h1>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-orange-500/30 via-orange-500/10 to-transparent mb-8" />
          </div>

          {/* Post body */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_60px] gap-8">
            {/* Article content */}
            <div className="prose-anime max-w-none">
              {Array.isArray(post.content)
                ? <PortableText value={post.content} />
                : <div dangerouslySetInnerHTML={{ __html: post.content }} />
              }
            </div>

            {/* Sticky share sidebar */}
            <div className="hidden lg:flex flex-col items-center gap-3 sticky top-28 h-fit">
              <span className="text-[10px] text-white/20 font-accent tracking-widest uppercase rotate-90 mb-2">Share</span>
              {[
                {
                  icon: FaXTwitter,
                  href: `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(postUrl)}`,
                  label: 'Share on X',
                  color: 'hover:text-sky-400 hover:border-sky-400/30',
                },
                {
                  icon: FaFacebook,
                  href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
                  label: 'Share on Facebook',
                  color: 'hover:text-blue-400 hover:border-blue-400/30',
                },
                {
                  icon: FaReddit,
                  href: `https://reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`,
                  label: 'Share on Reddit',
                  color: 'hover:text-orange-400 hover:border-orange-400/30',
                },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-lg border border-white/8 text-white/30 flex items-center justify-center transition-all duration-300 ${color}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-white/5">
              <FiTag className="text-orange-500/50" size={14} />
              {post.tags.map(tag => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="tag-item">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile share */}
          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-white/5 lg:hidden">
            <span className="text-xs text-white/40 font-accent tracking-wider uppercase">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/8 text-white/40 hover:text-sky-400 transition-colors"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/8 text-white/40 hover:text-blue-400 transition-colors"
            >
              <FaFacebook size={16} />
            </a>
          </div>

        </div>

        {/* Related Posts */}
        {relatedFallback.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-16">
            <ScrollReveal>
              <div className="mb-10">
                <div className="section-divider mb-4" />
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                  Related <span className="gradient-text">Posts</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedFallback.map((rp, i) => (
                  <PostCard key={rp.id} post={rp} index={i} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}
      </article>
    </PageTransition>
  );
}
