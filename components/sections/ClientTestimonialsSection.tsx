'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import styles from './ClientTestimonialsSection.module.scss'

const CLIENT_LOGOS = [
  {
    name: 'UK Vaper Wholesale',
    initials: 'UVW',
    color: '#38bdf8',
  },
  {
    name: 'No 1 Vape Wholesale',
    initials: 'N1V',
    color: '#a78bfa',
  },
  {
    name: 'GlowSkin Aesthetics',
    initials: 'GSA',
    color: '#34d399',
  },
]

const ROW_HEIGHT = 80
const VISIBLE_ROWS = 3
const TRACK_OFFSET = ROW_HEIGHT

export default function ClientTestimonialsSection() {
  const t = useTranslations('clientTestimonials')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const rawItems = t.raw('items') as Array<{ name: string; position: string; quote: string; quoteBold?: string }> | undefined
  const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : []

  const [activeIndex, setActiveIndex] = useState(0)
  const total = Math.max(items.length, 1)

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total)
  }, [total])

  if (items.length === 0) return null

  const sectionLabel = typeof t('sectionLabel') === 'string' ? t('sectionLabel') : 'WHAT OUR CLIENTS SAY'
  const title = typeof t('title') === 'string' ? t('title') : 'Real Businesses. Real Results. Real Words'
  const subtitle = typeof t('subtitle') === 'string' ? t('subtitle') : ''
  const viewReviews = typeof t('viewReviews') === 'string' ? t('viewReviews') : 'View client reviews'
  const activeItem = items[activeIndex]

  return (
    <motion.section
      ref={sectionRef}
      className={`${styles.section} themeable-section themeable-testimonials`}
      aria-label="Client testimonials"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.bgGlowLeft} aria-hidden />
      <div className={styles.bgGlowRight} aria-hidden />

      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.sectionLabel}>{sectionLabel}</p>
          <h2 className={styles.sectionHeading}>{title}</h2>
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </motion.div>

        <div className={styles.twoCol}>
          <div className={styles.leftCol}>
            <div className={styles.leftColInner}>
            <div className={styles.clientListWrap}>
              <div
                className={styles.clientListTrack}
                style={{
                  transform: `translate3d(0, ${-activeIndex * ROW_HEIGHT + TRACK_OFFSET}px, 0)`,
                }}
              >
                {items.map((item, index) => {
                  const logo = CLIENT_LOGOS[index]
                  return (
                    <div
                      key={index}
                      className={`${styles.clientRow} ${index === activeIndex ? styles.clientRowActive : ''}`}
                      style={{ height: ROW_HEIGHT }}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveIndex(index)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={index === activeIndex}
                      aria-label={`${item.name}, ${item.position}`}
                    >
                      <div className={styles.clientRowInner}>
                        <div className={styles.logoWrap}>
                          <div
                            className={styles.logoInitials}
                            style={{ borderColor: logo?.color ?? '#38bdf8', color: logo?.color ?? '#38bdf8' }}
                          >
                            {logo?.initials ?? item.name.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className={styles.clientMeta}>
                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.position}>{item.position}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
              <div className={styles.arrows}>
                <button type="button" className={styles.arrowPrev} onClick={goPrev} aria-label="Previous testimonial">
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 4L4 20h16L12 4z" />
                  </svg>
                </button>
                <button type="button" className={styles.arrowNext} onClick={goNext} aria-label="Next testimonial">
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 20L4 4h16L12 20z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.quoteBlock}>
              <div className={styles.quoteMark} aria-hidden />
              <p className={styles.quote}>
                {activeItem.quoteBold ? (() => {
                  const i = activeItem.quote.indexOf(activeItem.quoteBold)
                  if (i === -1) return activeItem.quote
                  const before = activeItem.quote.slice(0, i)
                  const after = activeItem.quote.slice(i + activeItem.quoteBold.length)
                  return <>{before}<strong>{activeItem.quoteBold}</strong>{after}</>
                })() : (
                  activeItem.quote
                )}
              </p>
            </div>
            <div className={styles.reviewsRow}>
              <Link href={`/${locale}/testimonials`} className={styles.viewReviewsBtn}>
                <span>{viewReviews}</span>
                <svg className={styles.btnIco} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
