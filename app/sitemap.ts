import { MetadataRoute } from 'next'
import { getAllServices, servicesData } from '@/lib/services-data'
import { getAllBlogs } from '@/lib/blog-service'
import { hasFirebaseAdminEnv } from '@/lib/firebase-admin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.xentiodigital.com'
  
  // Base routes
  const baseRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/testimonials',
    '/team',
    '/careers',
    '/contact',
    '/blog',
  ]

  // Service category routes
  const categoryRoutes = servicesData.map((category) => `/services/${category.slug}`)

  // Individual service routes
  const allServices = getAllServices()
  const serviceRoutes = allServices.map((service) => `/services/${service.slug}`)

  // Blog post routes (Firestore). If env is missing locally, we skip.
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    if (hasFirebaseAdminEnv()) {
      const blogPosts = await getAllBlogs('en')
      blogRoutes = blogPosts
        .filter((p) => p.published)
        .map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
    }
  } catch {
    blogRoutes = []
  }

  // Combine all routes
  const routes = [...baseRoutes, ...categoryRoutes, ...serviceRoutes]

  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.8 : 0.7,
  }))

  return [...routeEntries, ...blogRoutes]
}
