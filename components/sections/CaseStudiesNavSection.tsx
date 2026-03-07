'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState, useEffect, useRef } from 'react'

type CaseItem = {
  name: string
  summary: string
  keywords?: string[]
  metric1Value: string
  metric1Line1: string
  metric1Line2: string
  metric2Value: string
  metric2Line1: string
  metric2Line2: string
  bgImage: string
}

const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06 + 0.1, duration: 0.35 },
  }),
  exit: { opacity: 0, y: -8 },
}

export default function CaseStudiesNavSection() {
  const t = useTranslations('caseStudies')
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const [keywordIndex, setKeywordIndex] = useState(0)
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null)
  const [hoverReunite, setHoverReunite] = useState(false) // usi hover ke dauran letters phir jur jayen
  const reuniteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const items = useMemo(() => {
    const raw = t.raw('items') as CaseItem[]
    return Array.isArray(raw) ? raw : []
  }, [t])

  const active = items[activeIndex]
  const keywords = active?.keywords ?? []

  // Preload all background images so switching is instant
  useEffect(() => {
    items.forEach((item) => {
      if (item?.bgImage) {
        const img = new Image()
        img.src = item.bgImage
      }
    })
  }, [items])

  // Cycle through keywords every 2s
  useEffect(() => {
    if (keywords.length <= 1) return
    const id = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length)
    }, 2200)
    return () => clearInterval(id)
  }, [keywords.length])

  if (!items.length) return null

  return (
    <section
      className="case-studies-nav section-padding themeable-section"
      aria-labelledby="case-studies-nav-heading"
    >
      <div className="case-studies-nav__layout">
        {/* Left: stacked background images (all preloaded), fade active */}
        <div className="case-studies-nav__left">
          <div className="case-studies-nav__left-bg-wrap">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="case-studies-nav__left-bg"
                style={{ backgroundImage: `url(${item.bgImage})` }}
                initial={false}
                animate={{ opacity: activeIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                aria-hidden
              />
            ))}
          </div>
          <div className="case-studies-nav__left-overlay" aria-hidden />
          <div className="case-studies-nav__left-list-wrap">
            <h2 id="case-studies-nav-heading" className="case-studies-nav__title">
              {t('title')}
            </h2>
            <ul className="case-studies-nav__list" role="tablist">
              {items.map((item, index) => (
                <li key={index} className="case-studies-nav__list-item">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    aria-controls="case-studies-nav-panel"
                    id={`case-studies-tab-${index}`}
                    className={`case-studies-nav__tab ${activeIndex === index ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveIndex(index)
                      setKeywordIndex(0)
                    }}
                    onMouseEnter={() => {
                      setHoveredTabIndex(index)
                      setHoverReunite(false)
                      if (reuniteTimeoutRef.current) clearTimeout(reuniteTimeoutRef.current)
                      reuniteTimeoutRef.current = setTimeout(() => {
                        setHoverReunite(true)
                        reuniteTimeoutRef.current = null
                      }, 420)
                    }}
                    onMouseLeave={() => {
                      setHoveredTabIndex(null)
                      setHoverReunite(false)
                      if (reuniteTimeoutRef.current) clearTimeout(reuniteTimeoutRef.current)
                    }}
                  >
                    <span
                      className="case-studies-nav__tab-text"
                      style={activeIndex === index ? { color: '#38bdf8', fontWeight: 600 } : undefined}
                    >
                      {Array.from(item.name).map((letter, i) => {
                        const isHovered = hoveredTabIndex === index
                        const scattered = isHovered && !hoverReunite
                        return (
                          <motion.span
                            key={`${index}-${i}-${letter}`}
                            className="case-studies-nav__tab-letter"
                            initial={false}
                            animate={{
                              opacity: scattered ? 0.35 : 1,
                              y: scattered ? -14 - (i % 4) * 3 : 0,
                              x: scattered ? (i - item.name.length / 2) * 8 : 0,
                              rotate: scattered ? (i % 2 === 0 ? -8 : 8) : 0,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 26,
                              delay: scattered ? i * 0.018 : i * 0.012,
                            }}
                            style={{ display: 'inline-block' }}
                          >
                            {letter === ' ' ? '\u00A0' : letter}
                          </motion.span>
                        )
                      })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: content with motion + keyword line */}
        <div
          id="case-studies-nav-panel"
          role="tabpanel"
          aria-labelledby={`case-studies-tab-${activeIndex}`}
          className="case-studies-nav__right"
        >
          <p className="case-studies-nav__tagline">
            {t('tagline')} <strong className="case-studies-nav__tagline-bold">{t('taglineBold')}</strong>
          </p>
          <div className="case-studies-nav__logo-flow">
            <div className="case-studies-nav__logo-main" aria-hidden>
              {active?.name}
            </div>
            <div className="case-studies-nav__logo-line" aria-hidden />
            <div className="case-studies-nav__logo-ghost" aria-hidden>
              {active?.name}
            </div>
          </div>

          {/* Animated keyword line */}
          {keywords.length > 0 && (
            <div className="case-studies-nav__keywords-wrap" aria-hidden>
              <span className="case-studies-nav__keywords-prefix">Key focus: </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywordIndex}
                  className="case-studies-nav__keyword"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {keywords[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={activeIndex}
                className="case-studies-nav__content-inner"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
              >
                <motion.p className="case-studies-nav__summary" variants={contentVariants} custom={0}>
                  {active.summary}
                </motion.p>
                <div className="case-studies-nav__metrics">
                  <motion.div className="case-studies-nav__metric" variants={contentVariants} custom={1}>
                    <span className="case-studies-nav__metric-value">{active.metric1Value}</span>
                    <span className="case-studies-nav__metric-lines">
                      {active.metric1Line1}
                      <br />
                      {active.metric1Line2}
                    </span>
                  </motion.div>
                  <motion.div className="case-studies-nav__metric" variants={contentVariants} custom={2}>
                    <span className="case-studies-nav__metric-value">{active.metric2Value}</span>
                    <span className="case-studies-nav__metric-lines">
                      {active.metric2Line1}
                      <br />
                      {active.metric2Line2}
                    </span>
                  </motion.div>
                </div>
                <motion.div className="case-studies-nav__ctas" variants={contentVariants} custom={3}>
                  <Link
                    href={`/${locale}/portfolio`}
                    className="case-studies-nav__btn case-studies-nav__btn--primary"
                  >
                    {t('ctaRead', { name: active.name })} &gt;
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="case-studies-nav__btn case-studies-nav__btn--secondary"
                  >
                    {t('ctaPlan')} &gt;
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
