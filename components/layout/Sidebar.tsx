import Link from 'next/link';
import Image from 'next/image';
import { FiTrendingUp, FiTag, FiZap } from 'react-icons/fi';
import { BlogPost, BlogCategory } from '@/types';
import { formatDate, getCategoryColor, getCategoryLabel } from '@/lib/utils';

interface SidebarProps {
  trendingPosts?: BlogPost[];
  categories?:    BlogCategory[];
  tags?:          string[];
}

export default function Sidebar({
  trendingPosts = [],
  categories    = [],
  tags          = [],
}: SidebarProps) {
  return (
    <aside className="space-y-6 lg:space-y-8">

      {/* Trending Widget */}
      {trendingPosts.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header flex items-center gap-2">
            <FiTrendingUp size={14} />
            Trending Now
          </div>
          <div className="p-4 space-y-4">
            {trendingPosts.slice(0, 5).map((post, i) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="flex items-start gap-3 group"
              >
                {/* Rank number */}
                <span className="flex-shrink-0 w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold font-accent flex items-center justify-center mt-0.5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {i + 1}
                </span>
                {/* Thumbnail */}
                {post.thumbnail && (
                  <div className="relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/75 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 leading-snug font-medium">
                    {post.title}
                  </p>
                  <p className="text-[10px] text-white/30 mt-1 font-accent">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header flex items-center gap-2">
            <FiZap size={14} />
            Categories
          </div>
          <div className="p-4 space-y-2">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg group hover:bg-orange-500/5 transition-all duration-300"
              >
                <span className="text-sm text-white/60 group-hover:text-white transition-colors font-medium">
                  {cat.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-accent font-semibold ${getCategoryColor(cat.slug)}`}>
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags Widget */}
      {tags.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header flex items-center gap-2">
            <FiTag size={14} />
            Popular Tags
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {tags.slice(0, 20).map(tag => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="tag-item"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA Widget */}
      <div className="sidebar-widget overflow-hidden">
        <div className="relative p-6 text-center">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/5" />
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center mx-auto mb-4">
              <FiZap className="text-orange-500" size={20} />
            </div>
            <h3 className="font-cinzel font-bold text-sm tracking-wider text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              Get the latest anime news and reviews delivered fresh to your feed.
            </p>
            <Link
              href="/contact"
              className="btn-primary text-xs py-2 px-6 inline-block"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>

    </aside>
  );
}
