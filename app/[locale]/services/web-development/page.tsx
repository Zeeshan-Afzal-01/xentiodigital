import type { Metadata } from 'next'
import Link from 'next/link'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Web Development Services - Custom Websites & Applications',
  description: 'Professional web development services including responsive websites, web applications, and e-commerce platforms built with modern technologies.',
}

const features = [
  'Responsive Design - Mobile-first approach ensuring perfect display on all devices',
  'Modern Technologies - Built with React, Next.js, Node.js, and other cutting-edge frameworks',
  'Performance Optimization - Fast loading times and optimal user experience',
  'SEO-Friendly - Built-in SEO best practices for better search engine visibility',
  'Secure & Scalable - Enterprise-grade security and architecture that grows with your business',
  'Content Management - Easy-to-use CMS for managing your website content',
]

const benefits = [
  {
    title: 'Increased Online Presence',
    description: 'A professional website establishes your brand and makes you accessible 24/7 to potential customers.',
  },
  {
    title: 'Better User Experience',
    description: 'Intuitive navigation and fast loading times keep visitors engaged and reduce bounce rates.',
  },
  {
    title: 'Higher Conversion Rates',
    description: 'Optimized design and user flow guide visitors toward taking action, whether it\'s making a purchase or contacting you.',
  },
  {
    title: 'Competitive Advantage',
    description: 'Stand out from competitors with a modern, professional website that reflects your brand quality.',
  },
]

export default function WebDevelopmentPage() {
  const structuredData = generateStructuredData('Service', {
    serviceType: 'Web Development',
    description: 'Professional web development services including responsive websites, web applications, and e-commerce platforms.',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Web Development Services
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Transform your online presence with custom websites and web applications built for performance, scalability, and user experience.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">What We Offer</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              Our web development services cover everything from simple business websites to complex 
              web applications. We use modern technologies and best practices to ensure your website 
              is fast, secure, and provides an excellent user experience.
            </p>

            <h3 className="text-2xl font-semibold text-high-contrast mb-4">Key Features</h3>
            <ul className="space-y-3 mb-12">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-primary-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted-enhanced">{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold text-high-contrast mb-6">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="glass rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-high-contrast mb-2">{benefit.title}</h4>
                  <p className="text-muted-enhanced">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Website?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let&apos;s discuss your project and create a custom solution that drives results.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
