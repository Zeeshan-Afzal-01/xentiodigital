import type { Metadata } from 'next'
import Link from 'next/link'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Desktop & Custom Software Development',
  description: 'Tailored desktop applications and custom software solutions designed to streamline your business operations and improve productivity.',
}

const features = [
  'Custom Development - Solutions built specifically for your business needs',
  'Cross-Platform Support - Windows, macOS, and Linux compatibility',
  'Integration Capabilities - Connect with existing systems and APIs',
  'Security & Compliance - Enterprise-grade security and data protection',
  'Scalable Architecture - Solutions that grow with your business',
  'Ongoing Maintenance - Support and updates to keep software current',
]

const benefits = [
  {
    title: 'Streamlined Operations',
    description: 'Automate processes and reduce manual work, improving efficiency.',
  },
  {
    title: 'Competitive Advantage',
    description: 'Custom solutions give you unique capabilities your competitors don\'t have.',
  },
  {
    title: 'Cost Savings',
    description: 'Reduce operational costs through automation and process optimization.',
  },
  {
    title: 'Data Control',
    description: 'Keep sensitive data on-premises with full control over security.',
  },
]

export default function DesktopCustomSoftwarePage() {
  const structuredData = generateStructuredData('Service', {
    serviceType: 'Desktop & Custom Software Development',
    description: 'Tailored desktop applications and custom software solutions for business operations.',
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
            Desktop & Custom Software
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Tailored desktop applications and custom software solutions designed to streamline your business operations.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">What We Offer</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              Our custom software development services create solutions tailored to your specific 
              business needs. Whether you need a desktop application or a custom software solution, 
              we build reliable, scalable systems that improve your operations.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Custom Software?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let&apos;s discuss your requirements and create a solution that transforms your operations.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
