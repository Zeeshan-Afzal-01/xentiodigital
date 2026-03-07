'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const HEADLINE_PARTS = [
  { text: 'A Journey of ', accent: false },
  { text: '3 years', accent: true },
  { text: ' with ', accent: false },
  { text: '1050+', accent: true },
  { text: ' projects ', accent: false },
  { text: '350+', accent: true },
  { text: ' tech partnerships', accent: false },
]

const METRICS = [
  { value: '95%', label: 'Client Satisfaction Rate' },
  { value: 'Zero', label: 'Detractors' },
  { value: '81.8', label: 'Net Promoter Score' },
  { value: 'Avg. 3 Years', label: 'Client Relationship' },
]

const ROTATE_INTERVAL_MS = 2000

export default function JourneyStatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-rotate: 95% → Zero → 81.8 → Avg. 3 Years → loop
  useEffect(() => {
    if (!isInView) return
    const id = setInterval(() => {
      setDirection(1)
      setActiveIndex((i) => (i + 1) % METRICS.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isInView])

  const goTo = (next: number) => {
    setDirection(next >= activeIndex ? 1 : -1)
    setActiveIndex(next)
  }

  return (
    <motion.section
      ref={sectionRef}
      className="journey-stats themeable-section relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Same background as PartnersSection: glow orbs + grid */}
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="journey-stats__container relative z-10">
        <motion.h2
          className="journey-stats__headline text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {HEADLINE_PARTS.map((part, i) =>
            part.accent ? (
              <span key={i} className="journey-stats__accent">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </motion.h2>

        {/* Single rotating card: one stat at a time with 3D flip */}
        <motion.div
          className="journey-stats__rotating-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="journey-stats__rotating-card">
            {/* Progress bar: fills until next flip */}
            <div className="journey-stats__progress-track" aria-hidden>
              <motion.div
                className="journey-stats__progress-fill"
                key={activeIndex}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: ROTATE_INTERVAL_MS / 1000, ease: 'linear' }}
              />
            </div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                className="journey-stats__rotating-face"
                custom={direction}
                initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <div className="journey-stats__value journey-stats__value--big">
                  {METRICS[activeIndex].value}
                </div>
                <div className="journey-stats__label journey-stats__label--big">
                  {METRICS[activeIndex].label}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots + labels */}
          <div className="journey-stats__dots">
            {METRICS.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`journey-stats__dot ${i === activeIndex ? 'active' : ''}`}
                aria-label={`Show ${m.label}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
          <div className="journey-stats__dot-labels">
            {METRICS.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`journey-stats__dot-label ${i === activeIndex ? 'active' : ''}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
