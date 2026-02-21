import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const SERVICE_ICONS = ['Search', 'Target', 'Megaphone', 'Code'] as const

export default async function HomeServicesSection({ locale }: { locale: string }) {
  const t = await getTranslations('services')

  const homepageServices = t.raw('homepageServices') as Array<{ name: string; description: string }>
  const services = Array.isArray(homepageServices) && homepageServices.length >= 4
    ? homepageServices.slice(0, 4)
    : []

  if (services.length === 0) return null

  return (
    <section className="section-padding relative overflow-hidden py-24 md:py-32" aria-labelledby="home-services-heading">
      <div className="absolute inset-0 services-section-bg-static" aria-hidden="true" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 id="home-services-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card-surface rounded-3xl p-8 h-full flex flex-col group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                <Icon
                  name={SERVICE_ICONS[index] ?? 'Growth'}
                  className="w-8 h-8 text-high-contrast"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-high-contrast gradient-text">{service.name}</h3>
              <p className="text-muted-enhanced leading-relaxed flex-1">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/contact`}
            className="btn-secondary text-lg px-12 py-6 relative overflow-hidden group inline-block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10">{t('ctaButton')}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
