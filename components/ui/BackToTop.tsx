'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white bg-orange-500 hover:bg-orange-400 transition-colors shadow-orange"
          style={{ boxShadow: '0 0 20px rgba(255,122,0,0.5), 0 4px 15px rgba(0,0,0,0.4)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
