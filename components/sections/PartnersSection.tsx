'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { servicesData } from '@/lib/services-data'

/** Flat list of service names + slugs for the partners sliders (from website services) */
function getServicesForSliders(): { name: string; slug: string }[] {
  const list: { name: string; slug: string }[] = []
  for (const cat of servicesData) {
    list.push({ name: cat.name, slug: cat.slug })
    for (const sub of cat.subServices) {
      list.push({ name: sub.name, slug: sub.slug })
    }
  }
  return list
}

const ALL_SERVICES = getServicesForSliders()
const ROW1_SERVICES = ALL_SERVICES.slice(0, 8)
const ROW2_SERVICES = ALL_SERVICES.slice(8, 16)

const preVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.1,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
}

const ctaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
}

function ServiceSlide({ name, slug, locale }: { name: string; slug: string; locale: string }) {
  return (
    <Link
      href={`/${locale}/services/${slug}`}
      className="m-slide client-item partners-client-item partners-service-item"
    >
      <div className="partners-service-name">{name}</div>
    </Link>
  )
}

function SliderRow({
  services,
  reverse,
  locale,
}: {
  services: { name: string; slug: string }[]
  reverse?: boolean
  locale: string
}) {
  return (
    <div className={`m-slider -client-logos slider-css__wrap ${reverse ? '-reverse' : ''}`}>
      <div className="m-slider__wrapper slider-css">
        {services.map((s, i) => (
          <ServiceSlide key={`a-${i}-${s.slug}`} name={s.name} slug={s.slug} locale={locale} />
        ))}
      </div>
      <div className="m-slider__wrapper slider-css" aria-hidden="true">
        {services.map((s, i) => (
          <ServiceSlide key={`b-${i}-${s.slug}`} name={s.name} slug={s.slug} locale={locale} />
        ))}
      </div>
    </div>
  )
}

export default function PartnersSection() {
  const t = useTranslations('partners')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={sectionRef}
      className="m-partners colors-inverted section-padding"
      aria-labelledby="partners-title"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Futuristic background layers */}
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="m-partners__top" ref={headingRef}>
        <div className="c-heading -h2 text-center">
          <motion.div
            className="c-heading__pre partners-pre"
            variants={preVariants}
            initial="hidden"
            animate={isHeadingInView ? 'visible' : 'hidden'}
          >
            {t('pre')}
          </motion.div>
          <motion.h2
            id="partners-title"
            className="c-heading__title partners-title-futuristic"
            variants={titleVariants}
            initial="hidden"
            animate={isHeadingInView ? 'visible' : 'hidden'}
          >
            {t('title')}
          </motion.h2>
        </div>
      </div>

      <motion.div
        className="partners-rows-wrap"
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
      >
        <SliderRow services={ROW1_SERVICES} locale={locale} />
      </motion.div>
      <motion.div
        className="partners-rows-wrap"
        variants={rowVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={1}
      >
        <SliderRow services={ROW2_SERVICES} reverse locale={locale} />
      </motion.div>

      <motion.div
        className="block-center"
        variants={ctaVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Link href={`/${locale}/services`} className="c-btn -glow partners-cta">
          <span>{t('cta')}</span>
          <span className="c-btn__ico">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </motion.div>
    </motion.section>
  )
}
