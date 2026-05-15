'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { debounce } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
  placeholder  = 'Search anime, reviews, manga...',
  defaultValue = '',
  className    = '',
  autoFocus    = false,
  size         = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sizeClasses = {
    sm: 'py-2 pl-9 pr-16 text-sm',
    md: 'py-3 pl-11 pr-20 text-base',
    lg: 'py-4 pl-12 pr-24 text-lg',
  }[size];

  const iconSize = { sm: 14, md: 16, lg: 20 }[size];

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <FiSearch
        size={iconSize}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500/50 pointer-events-none"
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${sizeClasses} rounded-xl search-input font-medium`}
        autoComplete="off"
        spellCheck="false"
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
  );
}
