import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name:        'Senpai Spot',
  tagline:     'Your Ultimate Anime Destination',
  description: 'Senpai Spot is your go-to source for the latest anime news, in-depth reviews, manga updates, and trending discussions in the anime community.',
  url:         process.env.NEXT_PUBLIC_SITE_URL || 'https://senpaispot.com',
  social: [
    { platform: 'Twitter',   url: process.env.NEXT_PUBLIC_TWITTER_URL   || 'https://twitter.com/senpaispot',   icon: 'FaXTwitter' },
    { platform: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/senpaispot', icon: 'FaInstagram' },
    { platform: 'YouTube',   url: process.env.NEXT_PUBLIC_YOUTUBE_URL   || 'https://youtube.com/@senpaispot',  icon: 'FaYoutube' },
    { platform: 'Discord',   url: process.env.NEXT_PUBLIC_DISCORD_URL   || 'https://discord.gg/senpaispot',    icon: 'FaDiscord' },
  ],
  nav: [
    { label: 'Home',       href: '/' },
    { label: 'Anime News', href: '/anime-news' },
    { label: 'Reviews',    href: '/reviews' },
    { label: 'Manga',      href: '/manga' },
    { label: 'Trending',   href: '/trending' },
    { label: 'About',      href: '/about' },
  ],
};

export const defaultMeta = {
  titleTemplate: '%s | Senpai Spot',
  defaultTitle:  'Senpai Spot — Your Ultimate Anime Destination',
  description:   siteConfig.description,
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:       siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    handle:    '@senpaispot',
    site:      '@senpaispot',
    cardType:  'summary_large_image',
  },
};
