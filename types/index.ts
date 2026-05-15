// ─────────────────────────────────────────────────────────────────────────────
//  Senpai Spot — TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id:          string;
  title:       string;
  slug:        string;
  excerpt:     string;
  content:     string;
  author:      string;
  publishedAt: string;
  updatedAt:   string;
  thumbnail:   string | null;
  categories:  string[];
  tags:        string[];
  url:         string;
  readingTime: number;   // minutes
  featured?:   boolean;
}

export interface BlogCategory {
  name:  string;
  slug:  string;
  count: number;
}

export interface PaginatedPosts {
  posts:      BlogPost[];
  total:      number;
  page:       number;
  perPage:    number;
  totalPages: number;
  nextToken?: string;
}

export interface SearchResult {
  posts:   BlogPost[];
  query:   string;
  total:   number;
}

export interface TrendingItem {
  rank:        number;
  title:       string;
  slug:        string;
  url:         string;
  thumbnail:   string | null;
  category:    string;
  views?:      string;
}

export interface NavItem {
  label:    string;
  href:     string;
  icon?:    string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url:      string;
  icon:     string;
}

export interface SiteConfig {
  name:        string;
  tagline:     string;
  description: string;
  url:         string;
  social:      SocialLink[];
  nav:         NavItem[];
}

export interface AnimeRelease {
  title:      string;
  episode?:   string;
  studio?:    string;
  date?:      string;
  score?:     number;
  imageUrl?:  string;
}

export type PostCategory =
  | 'anime-news'
  | 'reviews'
  | 'manga'
  | 'trending'
  | 'editorials'
  | 'lists'
  | 'guides'
  | 'general';

export interface PageMeta {
  title:       string;
  description: string;
  openGraph?: {
    title?:       string;
    description?: string;
    image?:       string;
    url?:         string;
  };
  twitter?: {
    title?:       string;
    description?: string;
    image?:       string;
    card?:        'summary' | 'summary_large_image';
  };
}

// Blogger RSS/Atom feed types
export interface BloggerFeedEntry {
  id:          string;
  title:       string;
  link:        string;
  published:   string;
  updated:     string;
  author:      string;
  summary:     string;
  content:     string;
  categories:  string[];
  thumbnail?:  string;
}

export interface BloggerFeed {
  title:   string;
  updated: string;
  entries: BlogPost[];
  total:   number;
}
