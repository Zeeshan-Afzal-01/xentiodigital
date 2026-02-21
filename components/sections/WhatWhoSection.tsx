'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { servicesData } from '@/lib/services-data'

const ARROW_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.858293 10.0328L10.0793 14.106H0V15.8901H9.72531L0.70865 19.5348L1.37729 21.189L10.5791 17.4694L3.56054 24.4895L4.82227 25.7509L11.5681 19.0037L7.71138 27.7305L9.3433 28.4517L13.4204 19.2263V29.3125H15.2046V19.5914L18.8473 28.6023L20.5015 27.9336L16.7821 18.7331L23.7999 25.751L25.0615 24.4894L18.3181 17.7459L27.041 21.601L27.7623 19.969L18.5328 15.8901H28.625V14.106H18.9012L27.9147 10.4638L27.2463 8.8096L18.0432 12.5283L25.0615 5.51174L23.8 4.24998L17.0598 10.9886L20.9116 2.26866L19.2795 1.54775L15.2046 10.7728V0.6875H13.4204V10.4149L9.77634 1.39626L8.1221 2.06468L11.8412 11.2691L4.82221 4.25006L3.5606 5.51166L10.3034 12.2544L1.57921 8.40077L0.858293 10.0328Z"
      fill="currentColor"
    />
  </svg>
)

const WHO_SERVICES = servicesData.slice(0, 3)

const WHO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=420&h=571&fit=crop', alt: 'Digital strategy' },
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=428&h=578&fit=crop', alt: 'E-commerce' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=420&h=570&fit=crop', alt: 'Growth marketing' },
]

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 * i },
  }),
}

const wordReveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
}

const itemReveal = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
}

export default function WhatWhoSection() {
  const t = useTranslations('who')
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: '-80px' })

  const headlineWords = t('headline').split(/\s+/)

  const goTo = (next: number) => {
    setDirection(next > mobileIndex ? 1 : -1)
    setMobileIndex(next)
  }

  return (
    <motion.section
      ref={sectionRef}
      className="ia-what-who themeable-section section-padding relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isSectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Background layers */}
      <div className="ia-who-bg-glow" aria-hidden />
      <div className="ia-who-bg-grid" aria-hidden />

      <div className="inner container-custom max-w-[1380px] relative z-10">
        <div className="ia-who">
          {/* Headline with word-by-word reveal + gradient */}
          <div ref={headlineRef} className="ia-who__headline mb-4">
            <motion.p
              className="ia-who__headline-text"
              variants={container}
              initial="hidden"
              animate={isHeadlineInView ? 'visible' : 'hidden'}
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="ia-word inline-block mr-[0.25em]"
                  variants={wordReveal}
                >
                  <span className="ia-word__in">{word}</span>
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className="ia-who__services mt-12 lg:mt-16">
            <div className="ia-who__services-left">
              {WHO_SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemReveal}
                  initial="hidden"
                  animate={isSectionInView ? 'visible' : 'hidden'}
                  custom={index}
                >
                  <Link
                    href={`/${locale}/services#${service.slug}`}
                    className="ia-who__service-item group block relative"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                  >
                    <div className="ia-who__service-row flex items-start gap-4">
                      <motion.span
                        className="ia-who__service-icon flex-shrink-0 w-8 h-8 block"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        {ARROW_SVG}
                      </motion.span>
                      <div className="min-w-0 flex-1">
                        <div className="ia-who__service-heading">{service.name}</div>
                        <div className="ia-who__service-features">
                          {service.subServices
                            .slice(0, 3)
                            .map((s) => s.name)
                            .join(' — ')}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="ia-who__services-right hidden lg:block">
              {WHO_IMAGES.map((img, index) => (
                <motion.div
                  key={index}
                  className={`ia-who__service-img ${activeIndex === index ? 'active' : ''}`}
                  style={{ zIndex: 9 - index }}
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.98,
                    y: activeIndex === index ? 0 : 8,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    width={420}
                    height={571}
                    loading="lazy"
                    className="ia-who__service-img-inner"
                    animate={{ scale: activeIndex === index ? 1.03 : 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <div className="ia-who__service-img-shine" aria-hidden />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile slider with AnimatePresence */}
          <div className="ia-who__services-slider-wrap lg:hidden mt-10">
            <div className="relative overflow-hidden rounded-2xl min-h-[380px]">
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={mobileIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Link href={`/${locale}/services#${WHO_SERVICES[mobileIndex].slug}`} className="block h-full">
                    <div className="ia-who__service-img relative w-full aspect-[3/4] max-h-[400px] rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={WHO_IMAGES[mobileIndex].src}
                        alt={WHO_IMAGES[mobileIndex].alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="ia-who__service-heading text-xl font-normal text-white mb-1">
                      {WHO_SERVICES[mobileIndex].name}
                    </div>
                    <div className="ia-who__service-features text-sm text-white/70">
                      {WHO_SERVICES[mobileIndex].subServices
                        .slice(0, 3)
                        .map((s) => s.name)
                        .join(' — ')}
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="case-service-control flex items-center justify-end mt-6 text-white text-lg">
              <span className="case-service-control-count mr-4 font-mono tabular-nums">
                <span>{String(mobileIndex + 1).padStart(2, '0')}</span>/<span>03</span>
              </span>
              <div className="case-service-control-btns flex gap-3">
                <motion.button
                  type="button"
                  className="slick-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-[var(--brand-primary)] hover:bg-white/5 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Previous"
                  onClick={() => goTo(mobileIndex === 0 ? 2 : mobileIndex - 1)}
                  disabled={mobileIndex === 0}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  className="slick-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-[var(--brand-primary)] hover:bg-white/5 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Next"
                  onClick={() => goTo(mobileIndex === 2 ? 0 : mobileIndex + 1)}
                  disabled={mobileIndex === 2}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
