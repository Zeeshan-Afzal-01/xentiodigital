import type { Metadata } from 'next'
import Link from 'next/link'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Mobile App Development - iOS & Android Apps',
  description: 'Professional mobile app development services for iOS and Android. Native and cross-platform solutions that engage users and drive business growth.',
}

const features = [
  'Native & Cross-Platform - iOS, Android, and React Native solutions',
  'User-Centered Design - Intuitive interfaces that users love',
  'Performance Optimized - Fast, responsive apps that work seamlessly',
  'Secure & Compliant - Built with security best practices and data protection',
  'App Store Optimization - Help getting your app discovered and downloaded',
  'Ongoing Support - Maintenance and updates to keep your app current',
]

const benefits = [
  {
    title: 'Reach More Customers',
    description: 'Mobile apps provide direct access to your customers, increasing engagement and loyalty.',
  },
  {
    title: 'Enhanced User Experience',
    description: 'Native mobile experiences are faster and more intuitive than mobile websites.',
  },
  {
    title: 'Push Notifications',
    description: 'Keep users engaged with timely notifications and updates.',
  },
  {
    title: 'Offline Capabilities',
    description: 'Enable users to access key features even without internet connectivity.',
  },
]

export default function MobileAppsPage() {
  const structuredData = generateStructuredData('Service', {
    serviceType: 'Mobile App Development',
    description: 'Professional mobile app development services for iOS and Android platforms.',
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
            Mobile App Development
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Create powerful mobile applications for iOS and Android that engage users and drive business growth.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">What We Offer</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              Our mobile app development services cover native iOS and Android apps, as well as 
              cross-platform solutions. We focus on creating apps that are not only functional but 
              also provide exceptional user experiences that keep users coming back.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Mobile App?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let&apos;s discuss your app idea and bring it to life.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
