import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Web Development Services - Custom Websites & Applications',
  description: 'Professional web development services including responsive websites, web applications, and e-commerce platforms built with modern technologies.',
}

export default async function WebDevelopmentPage() {
  const t = await getTranslations('common')
  const tServices = await getTranslations('services')
  const locale = await getLocale()
  const features = (tServices.raw('webDevelopmentPage.features') as string[]) ?? []
  const benefits = (tServices.raw('webDevelopmentPage.benefits') as Array<{ title: string; description: string }>) ?? []
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
            {tServices('webDevelopmentPage.title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            {tServices('webDevelopmentPage.subtitle')}
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6">{t('whatWeOffer')}</h2>
            <p className="text-lg text-muted-enhanced mb-8">
              {tServices('webDevelopmentPage.intro')}
            </p>

            <h3 className="text-2xl font-semibold text-high-contrast mb-4">{t('keyFeatures')}</h3>
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

            <h3 className="text-2xl font-semibold text-high-contrast mb-6">{t('benefits')}</h3>
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
          <h2 className="text-3xl font-bold mb-4">{t('ctaReadyTitle')}</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            {t('ctaReadySubtitle')}
          </p>
          <Link href={`/${locale}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-block">
            {t('getFreeQuote')}
          </Link>
        </div>
      </section>
    </>
  )
}
