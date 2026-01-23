import type { Metadata } from 'next'
import Link from 'next/link'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'UX/UI Design Services - User-Centered Design Solutions',
  description: 'Professional UX/UI design services that create intuitive, beautiful interfaces that convert visitors into customers and enhance user satisfaction.',
}

const features = [
  'User Research - Understand your audience through surveys, interviews, and analytics',
  'Wireframing & Prototyping - Visualize designs before development',
  'Visual Design - Beautiful, on-brand interfaces that engage users',
  'Usability Testing - Ensure your design works for real users',
  'Design Systems - Consistent design language across all touchpoints',
  'Responsive Design - Seamless experiences across all devices',
]

const benefits = [
  {
    title: 'Higher Conversions',
    description: 'Well-designed interfaces guide users toward taking action, increasing conversion rates.',
  },
  {
    title: 'Better User Satisfaction',
    description: 'Intuitive designs reduce frustration and create positive user experiences.',
  },
  {
    title: 'Reduced Development Costs',
    description: 'Clear design specifications reduce revisions and development time.',
  },
  {
    title: 'Competitive Advantage',
    description: 'Superior design sets you apart from competitors and builds brand trust.',
  },
]

export default function UXUIDesignPage() {
  const structuredData = generateStructuredData('Service', {
    serviceType: 'UX/UI Design',
    description: 'Professional UX/UI design services that create intuitive, beautiful interfaces.',
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
            UX/UI Design Services
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Create intuitive, beautiful interfaces that convert visitors into customers and enhance user satisfaction.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">What We Offer</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              Our UX/UI design services focus on creating user-centered solutions that not only 
              look great but also function flawlessly. We combine research, creativity, and best 
              practices to design experiences that users love.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Design?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let&apos;s discuss your design needs and create interfaces that users love.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
