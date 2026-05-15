'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Anime News', href: '/anime-news' },
  { label: 'Reviews',    href: '/reviews' },
  { label: 'Manga',      href: '/manga' },
  { label: 'Trending',   href: '/trending' },
  { label: 'About',      href: '/about' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname  = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Main navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-orange-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <span className="brand-logo text-2xl lg:text-3xl font-black tracking-widest select-none">
                  SENPAI
                </span>
                <span className="text-white font-light tracking-[0.35em] text-lg lg:text-xl ml-1 font-accent select-none">
                  SPOT
                </span>
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium font-accent tracking-wider uppercase transition-colors duration-300',
                      isActive ? 'text-orange-500' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                        style={{ boxShadow: '0 0 8px rgba(255,122,0,0.7)' }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(v => !v)}
                className="relative p-2 rounded-lg text-white/70 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                aria-label="Toggle search"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {searchOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiX size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiSearch size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiX size={22} />
                    </motion.div>
                  ) : (
                    <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiMenu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-orange-500/10 bg-[#0a0a0a]/98 backdrop-blur-xl"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500/60" size={18} />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search anime, reviews, manga..."
                    className="w-full pl-12 pr-24 py-3 rounded-lg search-input text-sm bg-orange-500/5 border border-orange-500/20"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-1.5 px-4 text-xs"
                  >
                    Search
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#0d0d0d] border-l border-orange-500/15 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between p-6 border-b border-orange-500/10">
                <span className="brand-logo text-xl font-black tracking-widest">SENPAI SPOT</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-white/50 hover:text-orange-500 hover:bg-orange-500/10 transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center px-4 py-3.5 rounded-lg font-accent font-semibold tracking-wider uppercase text-sm transition-all duration-300',
                          isActive
                            ? 'bg-orange-500/15 text-orange-500 border border-orange-500/25'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        )}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3 shadow-[0_0_6px_rgba(255,122,0,0.8)]" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Contact link */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.35 }}
                >
                  <Link
                    href="/contact"
                    className="flex items-center px-4 py-3.5 rounded-lg font-accent font-semibold tracking-wider uppercase text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    Contact
                  </Link>
                </motion.div>
              </nav>

              {/* Panel footer */}
              <div className="p-6 border-t border-orange-500/10">
                <form onSubmit={handleSearch} className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500/50" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Quick search..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg search-input text-sm text-sm"
                  />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
