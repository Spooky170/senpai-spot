import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, formatDistanceToNow } from 'date-fns';

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Slugify a string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Strip HTML tags from content
export function stripHtml(html: string): string {
  if (typeof window !== 'undefined') {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  // Server-side fallback
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Extract first image URL from HTML content
export function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

// Truncate text to given length
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

// Calculate estimated reading time (words per minute: 200)
export function calcReadingTime(content: string): number {
  const words = stripHtml(content).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Format date string
export function formatDate(dateStr: string): string {
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
    return format(date, 'MMMM d, yyyy');
  } catch {
    return dateStr;
  }
}

// Format relative date
export function formatRelativeDate(dateStr: string): string {
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return dateStr;
  }
}

// Format compact number (1.2K, 3.4M)
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

// Map category slug → display label
const CATEGORY_LABELS: Record<string, string> = {
  'anime-news': 'Anime News',
  'reviews':    'Reviews',
  'manga':      'Manga',
  'trending':   'Trending',
  'guides':     'Guides',
  'general':    'General',
};

export function getCategoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Map category slug → Tailwind colour classes
export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    'anime-news': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    'reviews':    'bg-purple-500/15 text-purple-400 border-purple-500/25',
    'manga':      'bg-blue-500/15 text-blue-400 border-blue-500/25',
    'trending':   'bg-red-500/15 text-red-400 border-red-500/25',
    'guides':     'bg-teal-500/15 text-teal-400 border-teal-500/25',
  };
  return map[category.toLowerCase()] ?? 'bg-orange-500/15 text-orange-400 border-orange-500/25';
}

// Generate placeholder image URL (using anime-safe placeholder)
export function getPlaceholderImage(seed: string): string {
  const colors = ['1a1a2e', '16213e', '0f3460', '1a0a00', '0d0d0d'];
  const idx = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % colors.length;
  return `https://placehold.co/800x450/${colors[idx]}/ff7a00?text=${encodeURIComponent('Senpai+Spot')}`;
}

// Check if URL is external
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Build Blogger RSS / GData feed URL.
// Works with:
//   - A blogspot domain: https://myblog.blogspot.com  (appends /feeds/posts/default)
//   - A raw GData feed:  https://www.blogger.com/feeds/<ID>/posts/default  (used as-is)
export function buildBloggerFeedUrl(
  blogUrl: string,
  options: {
    maxResults?: number;
    startIndex?: number;
    query?:      string;
    label?:      string;
    orderBy?:    'published' | 'updated';
  } = {}
): string {
  const {
    maxResults = 10,
    startIndex = 1,
    query,
    label,
    orderBy = 'published',
  } = options;

  // If the URL already looks like the GData feeds endpoint, use it as-is base
  const isGDataFeed = blogUrl.includes('/feeds/') && blogUrl.includes('/posts/default');
  const base = isGDataFeed
    ? blogUrl.replace(/\/$/, '')
    : `${blogUrl.replace(/\/$/, '')}/feeds/posts/default`;

  const params = new URLSearchParams({
    'alt':         'json',
    'max-results': String(maxResults),
    'start-index': String(startIndex),
    'orderby':     orderBy,
  });

  if (query) params.set('q', query);
  if (label) params.set('category', label);

  return `${base}?${params.toString()}`;
}

// Decode HTML entities
export function decodeHtmlEntities(html: string): string {
  if (typeof window !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  return html
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, ' ');
}

// Debounce utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
