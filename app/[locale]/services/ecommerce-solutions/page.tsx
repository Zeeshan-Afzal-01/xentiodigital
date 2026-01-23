import type { Metadata } from 'next'
import Link from 'next/link'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'eCommerce Solutions - Online Store Development',
  description: 'Complete eCommerce platforms with secure payment processing, inventory management, and seamless shopping experiences that drive sales.',
}

const features = [
  'Custom Store Design - Unique, brand-aligned online storefronts',
  'Payment Integration - Secure payment gateways (Stripe, PayPal, etc.)',
  'Inventory Management - Real-time stock tracking and management',
  'Shopping Cart & Checkout - Optimized conversion funnels',
  'Product Catalog - Easy product management and organization',
  'Order Management - Complete order processing and fulfillment system',
]

const benefits = [
  {
    title: '24/7 Sales',
    description: 'Sell products around the clock without geographical limitations.',
  },
  {
    title: 'Scalable Growth',
    description: 'Handle increasing traffic and sales as your business grows.',
  },
  {
    title: 'Customer Insights',
    description: 'Track customer behavior and preferences to improve marketing.',
  },
  {
    title: 'Reduced Costs',
    description: 'Lower overhead compared to physical retail locations.',
  },
]

export default function EcommerceSolutionsPage() {
  const structuredData = generateStructuredData('Service', {
    serviceType: 'eCommerce Solutions',
    description: 'Complete eCommerce platforms with secure payment processing and inventory management.',
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
            eCommerce Solutions
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Build a powerful online store with secure payment processing, inventory management, and seamless shopping experiences.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">What We Offer</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              Our eCommerce solutions are designed to help you sell products online effectively. 
              We create secure, user-friendly online stores that provide excellent shopping experiences 
              and drive conversions.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Online Store?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let&apos;s discuss your eCommerce needs and create a solution that drives sales.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
