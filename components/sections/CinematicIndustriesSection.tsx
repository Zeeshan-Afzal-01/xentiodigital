'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Icon, IconName } from '@/components/icons'

type IndustryCard = {
  key: string
  icon: IconName
  description: string
}

const INDUSTRIES: IndustryCard[] = [
  { key: 'industryFinance', icon: 'Finance', description: 'Secure fintech, payments, and compliance solutions.' },
  { key: 'industryHealthcare', icon: 'Healthcare', description: 'HIPAA-compliant platforms and patient experience.' },
  { key: 'industryEcommerce', icon: 'Ecommerce', description: 'High-converting storefronts and marketplaces.' },
  { key: 'industryEducation', icon: 'Education', description: 'LMS, EdTech, and learning engagement tools.' },
  { key: 'industryRealEstate', icon: 'Home', description: 'Listings, CRM, virtual tours, and deal flow.' },
  { key: 'industryTravelTourism', icon: 'Globe', description: 'Booking engines and travel experience platforms.' },
  { key: 'industryLogistics', icon: 'Package', description: 'Supply chain, fleet, and delivery management.' },
  { key: 'industrySaaS', icon: 'Cloud', description: 'Scalable cloud software and subscription products.' },
]

const MOBILE_BREAKPOINT = 768
const DESKTOP_VISIBLE = 3

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
}

export default function CinematicIndustriesSection() {
  const t = useTranslations('serviceCategoryPage')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const cb = () => setIsMobile(mq.matches)
    cb()
    mq.addEventListener('change', cb)
    return () => mq.removeEventListener('change', cb)
  }, [])

  const industries = useMemo(
    () =>
      INDUSTRIES.map((it) => {
        const detailsRaw = t.raw(`${it.key}Details` as Parameters<typeof t.raw>[0])
        const details = Array.isArray(detailsRaw) ? detailsRaw : []
        return {
          ...it,
          title: t(it.key),
          description: t(`${it.key}Desc` as Parameters<typeof t>[0]) || it.description,
          details: details as string[],
        }
      }),
    [t]
  )

  const visibleCount = isMobile ? 1 : DESKTOP_VISIBLE
  const maxIndex = Math.max(0, industries.length - visibleCount)
  const visibleIndustries = industries.slice(currentIndex, currentIndex + visibleCount)

  const goPrev = () => {
    setDirection(-1)
    setCurrentIndex((i) => Math.max(0, i - 1))
  }
  const goNext = () => {
    setDirection(1)
    setCurrentIndex((i) => Math.min(maxIndex, i + 1))
  }

  return (
    <motion.section
      ref={sectionRef}
      className="industries-modern themeable-section section-padding"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      aria-labelledby="industries-modern-heading"
    >
      {/* Background: floating gradient blobs */}
      <div className="industries-modern__bg" aria-hidden>
        <div className="industries-modern__blob industries-modern__blob--1" />
        <div className="industries-modern__blob industries-modern__blob--2" />
        <div className="industries-modern__blob industries-modern__blob--3" />
      </div>

      <div className="industries-modern__container">
        <motion.header
          className="industries-modern__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="industries-modern__kicker">{t('industriesSectionSub')}</p>
          <h2 id="industries-modern-heading" className="industries-modern__heading">
            {t('industriesHeading')}
          </h2>
          <p className="industries-modern__sub">
            {t('industriesSubtext')}
          </p>
        </motion.header>

        <div className="industries-modern__slider-wrap">
          <button
            type="button"
            className="industries-modern__nav industries-modern__nav--prev"
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous industries"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="industries-modern__slider">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="industries-modern__slider-inner"
              >
                {visibleIndustries.map((industry) => (
                  <motion.article
                    key={industry.key}
                    className="industries-modern__card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Link href={`/${locale}/services?industry=${encodeURIComponent(industry.key)}`} className="industries-modern__card-link">
                      <div className="industries-modern__card-inner">
                        <div className="industries-modern__card-glow" aria-hidden />
                        <div className="industries-modern__card-icon">
                          <Icon name={industry.icon} className="industries-modern__card-icon-svg" strokeWidth={2} />
                        </div>
                  <h3 className="industries-modern__card-title">{industry.title}</h3>
                  <p className="industries-modern__card-desc">{industry.description}</p>
                  {industry.details.length > 0 && (
                    <ul className="industries-modern__card-details">
                      {industry.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <span className="industries-modern__card-cta">
                          {t('exploreSolutions')}
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="industries-modern__nav industries-modern__nav--next"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next industries"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  )
}
