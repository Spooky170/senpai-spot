'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { BlogPost } from '@/types';
import { formatDate, getCategoryColor, getCategoryLabel } from '@/lib/utils';

interface FeaturedPostCardProps {
  post:  BlogPost;
  large?: boolean;
  index?: number;
}

export default function FeaturedPostCard({ post, large = false, index = 0 }: FeaturedPostCardProps) {
  const category = post.categories[0] || 'general';

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group rounded-2xl overflow-hidden ${large ? 'aspect-[16/8]' : 'aspect-[16/9]'} cursor-pointer`}
    >
      {/* Background image */}
      {post.thumbnail ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes={large ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          priority={index === 0}
          unoptimized
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#1a0500] via-[#0d0d0d] to-[#050505]" />
      )}

      {/* Overlay gradient — always present, deepens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

      {/* Glowing bottom border on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 0 20px rgba(255,122,0,0.8)' }}
      />

      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 ${large ? 'p-8' : 'p-5'}`}>
        {/* Category badge */}
        <div className="mb-3">
          <span className={`category-badge border ${getCategoryColor(category)}`}>
            {getCategoryLabel(category)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/post/${post.slug}`}>
          <h2 className={`font-cinzel font-bold text-white group-hover:text-orange-300 transition-colors duration-300 leading-tight mb-3 ${large ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'}`}>
            {post.title}
          </h2>
        </Link>

        {/* Excerpt — only on large cards */}
        {large && (
          <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <FiCalendar size={11} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <FiClock size={11} />
              {post.readingTime} min read
            </span>
          </div>
          <Link
            href={`/post/${post.slug}`}
            className="flex items-center gap-1 text-xs text-orange-500 font-accent font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2"
          >
            Read <FiArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
