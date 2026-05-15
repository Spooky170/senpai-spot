'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiTrendingUp } from 'react-icons/fi';
import { BlogPost } from '@/types';
import { formatDate, getCategoryColor, getCategoryLabel } from '@/lib/utils';

interface HeroSectionProps {
  featuredPosts: BlogPost[];
}

export default function HeroSection({ featuredPosts }: HeroSectionProps) {
  const primary   = featuredPosts[0];
  const secondary = featuredPosts.slice(1, 3);

  if (!primary) {
    return <HeroPlaceholder />;
  }

  const category = primary.categories[0] || 'general';

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col justify-end overflow-hidden">

      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        {primary.thumbnail ? (
          <Image
            src={primary.thumbnail}
            alt={primary.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a0500] via-[#0d0d0d] to-[#050505]" />
        )}
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
      </div>

      {/* Floating orange glow */}
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">

          {/* Main hero post */}
          <div className="lg:col-span-2 space-y-5">
            {/* FEATURED badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-accent font-bold tracking-widest uppercase shadow-orange">
                <FiTrendingUp size={11} />
                Featured
              </span>
              <span className={`category-badge border ${getCategoryColor(category)}`}>
                {getCategoryLabel(category)}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/post/${primary.slug}`}>
                <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white hover:text-orange-300 transition-colors duration-300 max-w-3xl text-balance">
                  {primary.title}
                </h1>
              </Link>
            </motion.div>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed line-clamp-3"
            >
              {primary.excerpt}
            </motion.p>

            {/* Meta + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap items-center gap-5"
            >
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span>{formatDate(primary.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <FiClock size={11} />
                  {primary.readingTime} min read
                </span>
                <span>By {primary.author}</span>
              </div>
              <Link
                href={`/post/${primary.slug}`}
                className="btn-primary flex items-center gap-2 group/btn"
              >
                Read Article
                <FiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Secondary posts (right column) */}
          {secondary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {secondary.map((post, i) => {
                const cat = post.categories[0] || 'general';
                return (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="flex items-start gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-white/8 hover:border-orange-500/30 hover:bg-black/60 transition-all duration-300 group"
                  >
                    {/* Mini thumbnail */}
                    {post.thumbnail && (
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className={`category-badge border text-[9px] mb-1.5 inline-block ${getCategoryColor(cat)}`}>
                        {getCategoryLabel(cat)}
                      </span>
                      <h3 className="text-sm font-cinzel font-bold text-white/85 group-hover:text-orange-300 transition-colors duration-300 line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[10px] text-white/30 mt-1">{formatDate(post.publishedAt)}</p>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 hidden lg:flex"
        >
          <span className="text-[9px] text-white/20 tracking-[0.3em] uppercase font-accent">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-orange-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

// Placeholder when no posts are loaded
function HeroPlaceholder() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500] via-[#0d0d0d] to-[#050505]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,122,0,0.1) 0%, transparent 60%)' }}
      />
      <div className="relative text-center space-y-6 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-orange-500 font-accent font-semibold tracking-[0.3em] uppercase text-sm mb-4">
            Welcome to
          </p>
          <h1 className="brand-logo text-6xl sm:text-8xl font-black tracking-widest select-none mb-2">
            SENPAI
          </h1>
          <div className="text-white/30 font-accent font-light tracking-[0.5em] text-2xl sm:text-4xl select-none">
            SPOT
          </div>
          <div className="section-divider mx-auto mt-6" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/50 text-lg leading-relaxed"
        >
          Your ultimate destination for anime news, reviews, manga, and everything in between.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/anime-news" className="btn-primary">Explore Anime News</Link>
          <Link href="/reviews" className="btn-ghost">Read Reviews</Link>
        </motion.div>
      </div>
    </section>
  );
}
