'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?:  number;
  duration?:  number;
  once?:      boolean;
}

export default function ScrollReveal({
  children,
  className  = '',
  delay      = 0,
  direction  = 'up',
  distance   = 24,
  duration   = 0.6,
  once       = true,
}: ScrollRevealProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const offset = {
    up:    { y: distance, x: 0 },
    down:  { y: -distance, x: 0 },
    left:  { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none:  { x: 0, y: 0 },
  }[direction];

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ ...offset, opacity: 0 }}
        animate={inView ? { x: 0, y: 0, opacity: 1 } : { ...offset, opacity: 0 }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
