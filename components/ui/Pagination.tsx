'use client';

import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages:  number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page numbers to show
  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3)  pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Prev */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300',
          currentPage === 1
            ? 'border-white/8 text-white/20 cursor-not-allowed'
            : 'border-orange-500/20 text-white/60 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/5'
        )}
      >
        <FiChevronLeft size={16} />
      </motion.button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="text-white/20 px-1 text-sm">
            ···
          </span>
        ) : (
          <motion.button
            key={p}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(p as number)}
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-accent font-semibold border transition-all duration-300',
              currentPage === p
                ? 'bg-orange-500 border-orange-500 text-white shadow-orange'
                : 'border-white/8 text-white/50 hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/5'
            )}
          >
            {p}
          </motion.button>
        )
      )}

      {/* Next */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300',
          currentPage === totalPages
            ? 'border-white/8 text-white/20 cursor-not-allowed'
            : 'border-orange-500/20 text-white/60 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/5'
        )}
      >
        <FiChevronRight size={16} />
      </motion.button>
    </div>
  );
}
