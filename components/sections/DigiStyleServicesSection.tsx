'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useRef } from 'react'

import { Icon, IconName } from '@/components/icons'

type DigiService = {
  id: string
  name: string
  headline: string
  description: string
  icon: IconName
  cta: string
  href: string | null
}

const DIGI_SERVICES: DigiService[] = [
  {
    id: 'seo',
    name: 'Search Engine Optimization (SEO)',
    headline: 'Rank Higher on Google. Get Found by People Who Are Ready to Buy.',
    description:
      'SEO is the most powerful long-term investment you can make in your business. We handle everything - technical SEO, content strategy, keyword research, on-page optimization, and link building - across all industries. Whether you run an ecommerce store, a local service business, a SaaS company, or a B2B firm, we build SEO strategies that bring you consistent, compounding organic traffic.',
    icon: 'Search',
    cta: 'Explore SEO Services',
    href: '/services/seo-digital-marketing',
  },
  {
    id: 'google-ads',
    name: 'Google Ads Management',
    headline: 'Stop Wasting Ad Budget. Start Getting Clicks That Actually Convert.',
    description:
      'Google Ads is one of the fastest ways to put your business in front of people who are actively searching for what you offer. We set up, manage, and continuously optimize your campaigns - from Search and Shopping to Display and YouTube. You get maximum return on every dollar spent.',
    icon: 'Target',
    cta: 'Explore Google Ads',
    href: null,
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads (Facebook & Instagram)',
    headline: 'Reach Your Ideal Customers Where They Actually Spend Their Time.',
    description:
      'With over 3 billion people on Facebook and Instagram, the opportunity is massive - if you know how to target the right audience with the right creative. We build Meta Ads campaigns that build brand awareness, generate leads, and drive sales across every industry and every budget.',
    icon: 'Users',
    cta: 'Explore Meta Ads',
    href: null,
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    headline: 'TikTok Is Not Just for Teenagers Anymore. Your Customers Are There.',
    description:
      'TikTok has become one of the most powerful advertising platforms for businesses in 2025 and beyond. With lower competition and higher engagement than most platforms, TikTok Ads give you a serious edge. We create campaigns that stop the scroll and drive real action - from product sales to app downloads to lead generation.',
    icon: 'Sparkles',
    cta: 'Explore TikTok Ads',
    href: null,
  },
  {
    id: 'web-development',
    name: 'Web Development',
    headline: 'A Website That Looks Good Is Nice. One That Converts Visitors Into Customers Is Better.',
    description:
      'Your website is your best salesperson. It works 24 hours a day, 7 days a week. We build fast, beautiful, and conversion-focused websites on WordPress, Shopify, and custom platforms - designed to rank on Google, load in under 2 seconds, and turn your visitors into leads and buyers.',
    icon: 'Code',
    cta: 'Explore Web Development',
    href: '/services/web-development',
  },
]

function DigiServiceCard({
  service,
  locale,
}: {
  service: DigiService
  locale: string
}) {
  const cardBody = (
    <div className="digi-services__card-content">
      <div className="digi-services__card-icon">
        <Icon name={service.icon} className="digi-services__card-icon-inner" strokeWidth={2} />
      </div>
      <h3 className="digi-services__card-title">{service.name}</h3>
      <p className="digi-services__card-desc font-semibold">
        {service.headline}
      </p>
      <p className="digi-services__card-desc">
        {service.description}
      </p>
      {service.href ? (
        <span className="digi-services__card-link">
          {service.cta}
          <Icon name="ArrowRight" className="digi-services__card-arrow" strokeWidth={2.5} />
        </span>
      ) : null}
    </div>
  )

  if (!service.href) {
    return (
      <article className="digi-services__card" aria-label={`${service.name} service card`}>
        {cardBody}
      </article>
    )
  }

  return (
    <Link href={`/${locale}${service.href}`} className="digi-services__card">
      {cardBody}
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
              <DigiServiceCard key={service.id} service={service} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
