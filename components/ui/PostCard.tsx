'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { BlogPost } from '@/types';
import { formatDate, getCategoryColor, getCategoryLabel } from '@/lib/utils';

interface PostCardProps {
  post:       BlogPost;
  priority?:  boolean;
  index?:     number;
  variant?:   'default' | 'horizontal' | 'compact';
}

export default function PostCard({ post, priority = false, index = 0, variant = 'default' }: PostCardProps) {
  const category = post.categories[0] || 'general';

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="post-card flex gap-4 p-4 glow-border-hover"
      >
        {post.thumbnail && (
          <Link href={`/post/${post.slug}`} className="flex-shrink-0 relative w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="128px"
              className="object-cover hover:scale-110 transition-transform duration-500"
              priority={priority}
              unoptimized
            />
          </Link>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <span className={`category-badge text-[10px] mb-2 inline-block border ${getCategoryColor(category)}`}>
              {getCategoryLabel(category)}
            </span>
            <Link href={`/post/${post.slug}`}>
              <h3 className="text-sm font-semibold text-white/90 hover:text-orange-400 transition-colors duration-300 line-clamp-2 leading-snug font-accent">
                {post.title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-white/30 flex items-center gap-1">
              <FiCalendar size={10} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-[10px] text-white/30 flex items-center gap-1">
              <FiClock size={10} />
              {post.readingTime}m
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 group"
      >
        <Link href={`/post/${post.slug}`} className="flex-1 min-w-0">
          <h3 className="text-sm text-white/70 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <span className="text-[10px] text-white/30 mt-1 block">{formatDate(post.publishedAt)}</span>
        </Link>
      </motion.article>
    );
  }

  // Default card
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="post-card group glow-border-hover h-full flex flex-col"
    >
      {/* Thumbnail */}
      <Link href={`/post/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden flex-shrink-0">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={priority}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a0a00] to-[#0d0d0d] flex items-center justify-center">
            <span className="brand-logo text-2xl opacity-30">SS</span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span className={`category-badge border ${getCategoryColor(category)}`}>
            {getCategoryLabel(category)}
          </span>
        </div>
        {/* Reading time badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white/70">
          <FiClock size={9} />
          {post.readingTime}m
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/post/${post.slug}`} className="flex-1">
          <h2 className="font-cinzel font-bold text-base text-white group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 leading-tight mb-3">
            {post.title}
          </h2>
          <p className="text-sm text-white/50 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </Link>

        {/* Meta footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[9px] text-orange-500 font-bold font-accent flex-shrink-0">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-white/35 truncate max-w-[80px]">{post.author}</span>
          </div>
          <span className="text-xs text-white/30 flex items-center gap-1">
            <FiCalendar size={10} />
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </motion.article>

  );
}
