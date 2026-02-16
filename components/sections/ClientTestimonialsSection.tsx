'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import styles from './ClientTestimonialsSection.module.scss'

const DS = 'https://www.digitalsilk.com/wp-content/uploads/2024/07'
const DS01 = 'https://www.digitalsilk.com/wp-content/uploads/2024/01'

const LOGOS = [
  { src: `${DS}/national-golf-foundation.svg`, alt: 'National Golf Foundation' },
  { src: `${DS}/smart-solutions.svg`, alt: 'Smart Software Solutions' },
  { src: `${DS}/promptcare.svg`, alt: 'PromptCare' },
  { src: `${DS}/benigro.svg`, alt: 'BeniGro' },
  { src: `${DS01}/buddha.svg`, alt: 'Buddha Brands' },
  { src: `${DS01}/rollink.svg`, alt: 'Rollink' },
  { src: `${DS}/amida.svg`, alt: 'Amida Technology Solutions' },
  { src: `${DS}/tray.svg`, alt: 'TRAY' },
  { src: `${DS}/growpath.svg`, alt: 'GrowPath' },
  { src: `${DS}/matrix.svg`, alt: 'Matrix New World Engineering' },
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

  const title = typeof t('title') === 'string' ? t('title') : 'What our clients LOVE about our work'
  const viewReviews = typeof t('viewReviews') === 'string' ? t('viewReviews') : 'View client reviews'
  const activeItem = items[activeIndex]

  return (
    <motion.section
      ref={sectionRef}
      className={styles.section}
      aria-label="Client testimonials"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.bgGlowLeft} aria-hidden />
      <div className={styles.bgGlowRight} aria-hidden />

      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>{title}</h2>

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
                {items.map((item, index) => (
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
                        <Image
                          src={LOGOS[index]?.src ?? LOGOS[0].src}
                          alt=""
                          width={120}
                          height={48}
                          loading={index < 3 ? 'eager' : 'lazy'}
                          sizes="80px"
                        />
                      </div>
                      <div className={styles.clientMeta}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.position}>{item.position}</div>
                      </div>
                    </div>
                  </div>
                ))}
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
              <div className={styles.designRushWidget}>
                <span className={styles.drIcon} aria-hidden>
                  <svg viewBox="0 0 40 44" fill="currentColor" width="100%" height="100%">
                    <path d="M20 0L2 8v14c0 11 8 20 18 22 10-2 18-11 18-22V8L20 0zm0 4.5L34 11v11c0 9-6 16.5-14 18.5-8-2-14-9.5-14-18.5V11l14-6.5z" opacity="0.9" />
                    <path d="M20 14c-2 1-4 3-4 6 0 2 1 3.5 2.5 4.5-1.5.8-2.5 2.5-2.5 4.5 0 3 2 5 4 6 2-1 4-3 4-6 0-2-1-3.7-2.5-4.5 1.5-1 2.5-2.5 2.5-4.5 0-3-2-5-4-6z" />
                  </svg>
                </span>
                <div className={styles.drTextBlock}>
                  <span className={styles.drCount}>34 REVIEWS</span>
                  <span className={styles.drOn}>ON DESIGNRUSH</span>
                  <span className={styles.drRating}>
                    <span className={styles.drScore}>4.9</span>
                    <span className={styles.drStars} aria-label="4.9 out of 5 stars">
                      <span className={styles.starFull} />
                      <span className={styles.starFull} />
                      <span className={styles.starFull} />
                      <span className={styles.starFull} />
                      <span className={styles.starPartial} />
                    </span>
                  </span>
                </div>
              </div>
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
