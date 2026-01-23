import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServices, servicesData } from '@/lib/services-data'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'
import ServicePageTemplate from '@/components/ServicePageTemplate'
import ServiceCategoryPageContent from './ServiceCategoryPageContent'

interface PageProps {
  params: Promise<{
    locale: string
    service: string
  }>
}

export async function generateStaticParams() {
  const allServices = getAllServices()
  const categorySlugs = servicesData.map((cat) => ({ service: cat.slug }))
  const serviceSlugs = allServices.map((service) => ({ service: service.slug }))
  
  // Combine both categories and individual services
  return [...categorySlugs, ...serviceSlugs]
}

export async function generateMetadata({ params }: PageProps) {
  const { service: serviceSlug } = await params
  
  // Check if it's a category first
  const category = servicesData.find((cat) => cat.slug === serviceSlug)
  if (category) {
    const metaTitle = category.metaTitle || `${category.name} Services | Xentio Digital`
    const metaDescription = category.metaDescription || `${category.description} Expert ${category.name.toLowerCase()} solutions to transform your business.`
    const path = `/services/${serviceSlug}`
    
    const metadata = generateSEOMetadata({
      title: metaTitle,
      description: metaDescription,
      path,
    })

    // Add structured data for category
    const structuredData = generateStructuredData('Service', {
      '@type': 'Service',
      name: category.name,
      description: category.description,
      provider: {
        '@type': 'Organization',
        name: 'Xentio Digital',
      },
      serviceType: category.name,
      areaServed: 'Worldwide',
    })

    return {
      ...metadata,
      other: {
        'structured-data': JSON.stringify(structuredData),
      },
    }
  }
  
  // Then check if it's an individual service
  const service = getServiceBySlug(serviceSlug)
  if (!service) {
    return {
      title: 'Service Not Found | Xentio Digital',
    }
  }

  const metaTitle = service.metaTitle || `${service.name} | Xentio Digital`
  const metaDescription = service.metaDescription || service.description
  const path = `/services/${serviceSlug}`

  return generateSEOMetadata({
    title: metaTitle,
    description: metaDescription,
    path,
  })
}

export default async function ServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params
  
  // First check if it's a category
  const category = servicesData.find((cat) => cat.slug === serviceSlug)
  if (category) {
    // Add structured data script for category pages
    const structuredData = generateStructuredData('Service', {
      '@type': 'Service',
      name: category.name,
      description: category.description,
      provider: {
        '@type': 'Organization',
        name: 'Xentio Digital',
      },
      serviceType: category.name,
      areaServed: 'Worldwide',
    })

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          suppressHydrationWarning
        />
        <ServiceCategoryPageContent category={category} />
      </>
    )
  }
  
  // Then check if it's an individual service
  const service = getServiceBySlug(serviceSlug)
  if (!service) {
    notFound()
  }

  // Generate structured data
  const structuredData = generateStructuredData('Service', {
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Xentio Digital',
    },
    serviceType: service.name,
    areaServed: 'Worldwide',
  })

  // Get category slug for breadcrumb
  const serviceCategory = servicesData.find((cat) => cat.id === service.categoryId)
  const categorySlug = serviceCategory?.slug || service.categoryId

  const breadcrumbData = generateStructuredData('BreadcrumbList', {
    items: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.xentiodigital.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.xentiodigital.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.categoryName,
        item: `https://www.xentiodigital.com/services/${categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: service.name,
        item: `https://www.xentiodigital.com/services/${serviceSlug}`,
      },
    ],
  })

  const structuredDataJson = JSON.stringify(structuredData)
  const breadcrumbDataJson = JSON.stringify(breadcrumbData)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataJson,
        }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbDataJson,
        }}
        suppressHydrationWarning
      />
      <ServicePageTemplate service={service} />
    </>
  )
}
