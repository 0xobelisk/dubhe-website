import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dubhe.network'
  
  // Static pages
  const staticPages = [
    '',
    '/engine',
    '/channel', 
    '/os',
    '/token',
    '/foundation',
    '/labs',
    '/grants',
    '/incubation',
    '/proposal',
    '/ambassador',
    '/moderators',
    '/events',
    '/privacy',
    '/terms',
    '/contact'
  ]

  const sitemap: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('/grants') || route.includes('/incubation') || route.includes('/proposal') ? 0.9 : 0.8,
  }))

  return sitemap
}