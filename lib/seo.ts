import { Metadata } from 'next'

export interface SEOProps {
  title: string
  description: string
  path?: string
  noindex?: boolean
  image?: string
}

export function generateSEOMetadata({
  title,
  description,
  path = '',
  noindex = false,
  image = '/og-image.jpg',
}: SEOProps): Metadata {
  const url = `https://www.xentiodigital.com${path}`
  const imageUrl = `https://www.xentiodigital.com${image}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Service' | 'BreadcrumbList' | 'Article', data?: any) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'Xentio Digital',
        url: 'https://www.xentiodigital.com',
        logo: 'https://www.xentiodigital.com/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-XXX-XXX-XXXX',
          contactType: 'Customer Service',
          email: 'info@xentiodigital.com',
        },
        sameAs: [
          'https://www.linkedin.com/company/xentio-digital',
          'https://www.twitter.com/xentiodigital',
          'https://www.facebook.com/xentiodigital',
        ],
      }

    case 'WebSite':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: 'Xentio Digital',
        url: 'https://www.xentiodigital.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.xentiodigital.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }

    case 'Service':
      return {
        ...baseStructuredData,
        '@type': 'Service',
        serviceType: data?.serviceType || 'Digital Services',
        provider: {
          '@type': 'Organization',
          name: 'Xentio Digital',
        },
        areaServed: 'Worldwide',
        ...data,
      }

    case 'BreadcrumbList':
      return {
        ...baseStructuredData,
        '@type': 'BreadcrumbList',
        itemListElement: data?.items || [],
      }

    case 'Article':
      return {
        ...baseStructuredData,
        '@type': 'Article',
        ...data,
      }

    default:
      return baseStructuredData
  }
}
