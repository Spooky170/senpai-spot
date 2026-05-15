import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar           from '@/components/layout/Navbar';
import Footer           from '@/components/layout/Footer';
import LoadingScreen    from '@/components/animations/LoadingScreen';
import ParticleBackground from '@/components/animations/ParticleBackground';
import ReadingProgress  from '@/components/ui/ReadingProgress';
import BackToTop        from '@/components/ui/BackToTop';

// ── Google Fonts ──────────────────────────────────────────────────────────────
const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
});
const cinzel = Cinzel({
  subsets:  ['latin'],
  variable: '--font-cinzel',
  display:  'swap',
  weight:   ['400', '500', '600', '700', '800', '900'],
});
const rajdhani = Rajdhani({
  subsets:  ['latin'],
  variable: '--font-rajdhani',
  display:  'swap',
  weight:   ['300', '400', '500', '600', '700'],
});
const jetbrains = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-jetbrains',
  display:  'swap',
  weight:   ['400', '500'],
});

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://senpaispot.com'),
  title: {
    default:  'Senpai Spot — Your Ultimate Anime Destination',
    template: '%s | Senpai Spot',
  },
  description: 'Senpai Spot is your go-to source for the latest anime news, in-depth reviews, manga updates, and trending discussions in the anime community.',
  keywords: ['anime', 'manga', 'anime news', 'anime reviews', 'anime blog', 'senpai spot', 'anime community'],
  authors:  [{ name: 'Senpai Spot' }],
  creator:  'Senpai Spot',
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:          process.env.NEXT_PUBLIC_SITE_URL || 'https://senpaispot.com',
    siteName:    'Senpai Spot',
    title:       'Senpai Spot — Your Ultimate Anime Destination',
    description: 'Your go-to source for the latest anime news, reviews, manga, and community content.',
  },
  twitter: {
    card:    'summary_large_image',
    site:    '@senpaispot',
    creator: '@senpaispot',
  },
  robots: {
    index:   true,
    follow:  true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor:    '#ff7a00',
  colorScheme:   'dark',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  5,
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${rajdhani.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-dark-800 text-white antialiased min-h-screen flex flex-col">
        {/* Loading screen (only on first visit) */}
        <LoadingScreen />

        {/* Ambient particle background */}
        <ParticleBackground />

        {/* Reading progress bar */}
        <ReadingProgress />

        {/* Sticky navigation */}
        <Navbar />

        {/* Main page content */}
        <main className="relative z-10 flex-1 pt-16 lg:pt-20">
          {children}
        </main>

        {/* Site footer */}
        <Footer />

        {/* Back-to-top button */}
        <BackToTop />
      </body>
    </html>
  );
}
