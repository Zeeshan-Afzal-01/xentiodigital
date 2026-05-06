'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const WORK_STEPS = [
  'Contact Us (Free)',
  'Audit and Strategy',
  'Execution',
  'Reporting and Optimization',
]

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

function ServiceSlide({ name }: { name: string }) {
  return (
    <div className="m-slide client-item partners-client-item partners-service-item">
      <div className="partners-service-name">{name}</div>
    </div>
  )
}

function SliderRow({
  services,
  reverse,
}: {
  services: { name: string }[]
  reverse?: boolean
}) {
  return (
    <div className={`m-slider -client-logos slider-css__wrap ${reverse ? '-reverse' : ''}`}>
      <div className="m-slider__wrapper slider-css">
        {services.map((s, i) => (
          <ServiceSlide key={`a-${i}-${s.name}`} name={s.name} />
        ))}
      </div>
      <div className="m-slider__wrapper slider-css" aria-hidden="true">
        {services.map((s, i) => (
          <ServiceSlide key={`b-${i}-${s.name}`} name={s.name} />
        ))}
      </div>
    </div>
  )
}

export default function PartnersSection() {
  const t = useTranslations('partners')
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={sectionRef}
      className="m-partners colors-inverted themeable-section section-padding"
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
        <SliderRow services={WORK_STEPS.map((name) => ({ name }))} />
      </motion.div>
    </motion.section>
  )
}
