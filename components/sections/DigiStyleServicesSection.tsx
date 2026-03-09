'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useRef } from 'react'

import { servicesData } from '@/lib/services-data'
import { Icon, IconName } from '@/components/icons'

/** Curated 8 services for the Digi-style cards */
function getDigiServices() {
  const bySlug: Record<string, { id: string; name: string; slug: string; icon: string; description: string }> = {}
  for (const cat of servicesData) {
    if (cat.subServices?.length) {
      for (const sub of cat.subServices) {
        bySlug[sub.slug] = {
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          icon: sub.icon,
          description: sub.intro ?? sub.description,
        }
      }
    } else {
      bySlug[cat.slug] = {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.intro ?? cat.description,
      }
    }
  }
  const order = [
    'web-development',
    'ui-ux-design',
    'ecommerce-solutions',
    'custom-software',
    'app-development',
    'digital-marketing',
    'seo',
    'google-ads',
  ]
  return order.map((s) => bySlug[s]).filter(Boolean).slice(0, 8)
}

const DIGI_SERVICES = getDigiServices()

function DigiServiceCard({
  service,
  href,
  exploreText,
}: {
  service: (typeof DIGI_SERVICES)[0]
  href: string
  exploreText: string
}) {
  return (
    <Link href={href} className="digi-services__card">
      <div className="digi-services__card-content">
        <div className="digi-services__card-icon">
          <Icon name={service.icon as IconName} className="digi-services__card-icon-inner" strokeWidth={2} />
        </div>
        <h3 className="digi-services__card-title">{service.name}</h3>
        <p className="digi-services__card-desc">
          {service.description.length > 200 ? `${service.description.slice(0, 200)}...` : service.description}
        </p>
        <span className="digi-services__card-link">
          {exploreText}
          <Icon name="ArrowRight" className="digi-services__card-arrow" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  )
}

export default function DigiStyleServicesSection() {
  const t = useTranslations('digiServices')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="digi-services digi-services--simple themeable-section section-padding relative overflow-hidden"
    >
      <div className="digi-services__bg" aria-hidden />
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="digi-services__container">
        <div className="digi-services__left">
          <div className="digi-services__accent-line" aria-hidden />
          <p className="digi-services__sub">{t('subHeading')}</p>
          <h2 className="digi-services__heading">{t('heading')}</h2>
          <p className="digi-services__para">{t('para1')}</p>
          <p className="digi-services__para digi-services__para--last">{t('para2')}</p>
        </div>

        <div className="digi-services__right-wrap is-mobile digi-services__right-wrap--sticky-scroll">
          <div className="digi-services__right" role="region" aria-label={t('scrollLabel')}>
            {DIGI_SERVICES.map((service) => (
              <DigiServiceCard
                key={service.id}
                service={service}
                href={`/${locale}/services/${service.slug}`}
                exploreText={t('exploreLink', { service: service.name })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
