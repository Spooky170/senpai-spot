import { MetadataRoute } from 'next';
import { getLatestPosts } from '@/lib/blogger';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://senpaispot.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,             lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: `${SITE_URL}/anime-news`, lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${SITE_URL}/reviews`,    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${SITE_URL}/manga`,      lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${SITE_URL}/trending`,   lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.8 },
    { url: `${SITE_URL}/about`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  ];

  // Dynamic post pages
  try {
    const posts = await getLatestPosts(50);
    const postPages: MetadataRoute.Sitemap = posts.map(post => ({
      url:              `${SITE_URL}/post/${post.slug}`,
      lastModified:     new Date(post.updatedAt || post.publishedAt),
      changeFrequency:  'weekly' as const,
      priority:         0.7,
    }));
    return [...staticPages, ...postPages];
  } catch {
    return staticPages;
  }
}
