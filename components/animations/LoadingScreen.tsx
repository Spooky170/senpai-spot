'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast-load progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,122,0,0.08) 0%, transparent 60%)' }}
          />

          {/* Animated circles */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-orange-500/20"
              style={{ width: i * 120, height: i * 120 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative text-center mb-10"
          >
            <div className="brand-logo text-5xl font-black tracking-[0.15em] select-none">
              SENPAI
            </div>
            <div className="text-white/30 font-accent font-light tracking-[0.5em] text-lg mt-1 select-none">
              SPOT
            </div>
            {/* Glow dot */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500"
              style={{ boxShadow: '0 0 10px rgba(255,122,0,0.9)' }}
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden relative"
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
              style={{ boxShadow: '0 0 8px rgba(255,122,0,0.7)' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs text-white/20 font-accent tracking-[0.25em] uppercase"
          >
            Your Ultimate Anime Destination
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
