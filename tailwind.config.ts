import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff7a00',
          600: '#ea6800',
          700: '#c2570a',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        dark: {
          900: '#050505',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
          500: '#222222',
          400: '#2a2a2a',
          300: '#333333',
          200: '#444444',
          100: '#555555',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-cinzel)', 'serif'],
        accent:  ['var(--font-rajdhani)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'orange-glow':    'radial-gradient(circle at center, rgba(255,122,0,0.3) 0%, transparent 70%)',
        'hero-gradient':  'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%)',
        'card-gradient':  'linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(10,10,10,0.95) 100%)',
        'orange-linear':  'linear-gradient(135deg, #ff7a00 0%, #ff4500 100%)',
        'orange-radial':  'radial-gradient(circle, #ff7a00 0%, #ff4500 100%)',
      },
      boxShadow: {
        'orange':      '0 0 20px rgba(255,122,0,0.4)',
        'orange-lg':   '0 0 40px rgba(255,122,0,0.3)',
        'orange-sm':   '0 0 10px rgba(255,122,0,0.5)',
        'orange-glow': '0 0 60px rgba(255,122,0,0.2), 0 0 120px rgba(255,122,0,0.1)',
        'card':        '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.6)',
        'glass':       '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'pulse-orange':  'pulseOrange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow':          'glow 2s ease-in-out infinite alternate',
        'shimmer':       'shimmer 1.5s infinite',
        'spin-slow':     'spin 8s linear infinite',
        'slide-up':      'slideUp 0.5s ease-out',
        'slide-down':    'slideDown 0.5s ease-out',
        'fade-in':       'fadeIn 0.6s ease-out',
        'scale-in':      'scaleIn 0.5s ease-out',
        'particle':      'particle 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,122,0,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,122,0,0.8)' },
        },
        glow: {
          from: { textShadow: '0 0 10px rgba(255,122,0,0.5)' },
          to:   { textShadow: '0 0 20px rgba(255,122,0,0.9), 0 0 40px rgba(255,122,0,0.5)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to:   { transform: 'translateY(0)',     opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to:   { transform: 'scale(1)',   opacity: '1' },
        },
        particle: {
          '0%':   { transform: 'translateY(100vh) translateX(0)',     opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) translateX(100px)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
      },
      transitionTimingFunction: {
        'spring':      'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth':      'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
