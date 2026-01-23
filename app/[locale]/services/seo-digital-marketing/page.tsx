import type { Metadata } from 'next'
import Link from 'next/link'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'SEO & Digital Marketing Services - Grow Your Online Presence',
  description: 'Comprehensive SEO strategies and digital marketing campaigns to increase your online visibility, drive qualified leads, and grow your business.',
}

const features = [
  'Keyword Research & Strategy - Data-driven keyword targeting for maximum visibility',
  'On-Page SEO Optimization - Technical and content optimization for better rankings',
  'Content Marketing - High-quality content that attracts and engages your audience',
  'Link Building - Strategic backlink acquisition to boost domain authority',
  'Local SEO - Optimize for local search to attract nearby customers',
  'Analytics & Reporting - Track performance with detailed analytics and insights',
]

const benefits = [
  {
    title: 'Increased Visibility',
    description: 'Rank higher in search results and get discovered by more potential customers.',
  },
  {
    title: 'Targeted Traffic',
    description: 'Attract visitors who are actively searching for your products or services.',
  },
  {
    title: 'Long-Term Results',
    description: 'SEO provides sustainable, long-term growth compared to paid advertising.',
  },
  {
    title: 'Better ROI',
    description: 'Organic traffic is free, making SEO one of the most cost-effective marketing channels.',
  },
]

export default function SEODigitalMarketingPage() {
  const structuredData = generateStructuredData('Service', {
    serviceType: 'SEO & Digital Marketing',
    description: 'Comprehensive SEO strategies and digital marketing campaigns to increase online visibility.',
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
            SEO & Digital Marketing
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Increase your online visibility, drive qualified leads, and grow your business with our comprehensive SEO and digital marketing services.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">What We Offer</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              Our SEO and digital marketing services are designed to help your business get found 
              online, attract the right audience, and convert visitors into customers. We use proven 
              strategies and data-driven approaches to deliver measurable results.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Online Presence?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let&apos;s discuss your marketing goals and create a strategy that drives results.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
