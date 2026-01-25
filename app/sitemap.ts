import { MetadataRoute } from 'next';
import { getAllArticleSlugs } from '@/data/services/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kiemthepc2009.com'; // Replace with actual domain if known, or localhost placeholder
  
  // Static routes
  const routes = [
    '',
    '/news',
    '/download',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic news routes
  const articleSlugs = getAllArticleSlugs();
  const newsRoutes = articleSlugs.map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...newsRoutes];
}
