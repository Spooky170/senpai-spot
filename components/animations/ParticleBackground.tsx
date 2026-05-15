'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x:    number;
  y:    number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse:   number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const PARTICLE_COUNT = Math.min(50, Math.floor(W * H / 20000));
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      size:    Math.random() * 2 + 0.5,
      speedX:  (Math.random() - 0.5) * 0.4,
      speedY:  (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      pulse:   Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', resize, { passive: true });

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        const alpha = (p.opacity + Math.sin(p.pulse) * 0.15);

        // Draw glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0,   `rgba(255,122,0,${alpha})`);
        grad.addColorStop(0.5, `rgba(255,122,0,${alpha * 0.4})`);
        grad.addColorStop(1,   `rgba(255,122,0,0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,0,${Math.min(1, alpha * 1.5)})`;
        ctx.fill();
      }

      // Draw connecting lines between nearby particles
      if (frame % 2 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255,122,0,${(1 - dist / 120) * 0.08})`;
              ctx.lineWidth   = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.35 }}
    />
  );
}
