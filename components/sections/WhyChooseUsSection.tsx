'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const REASONS = [
  {
    title: 'We are Obsessed With ROI, Not Vanity Metrics ',
    description:
      'Likes and impressions don"t pay your bills. We track what matters — leads, sales, and actual revenue.',
  },
  {
    title: 'We Work Across All Industries',
    description:
      'Whether you sell products, services, software, or anything in between — we have the SEO and paid advertising knowledge to grow it. We are not locked into one niche. We adapt to your market.',
  },
  {
    title: 'You Get Strategy First, Execution Second',
    description:
      'Before we touch your ads account or website, we study your business, your competitors, and your customers. That is how we build campaigns that actually work from day one.',
  },
  {
    title: 'Transparent Reporting, Every Single Week',
    description:
      'You will always know where your money is going and what it is returning. No black boxes. No vague reports. Just clear numbers that tell the real story.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

function cardVariants(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
      },
    }
  }
  return {
    hidden: { opacity: 0, y: 22, rotateX: -8 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
    },
  }
}

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const variants = cardVariants(!!reducedMotion)

  return (
    <motion.section
      ref={sectionRef}
      className="why-choose-us themeable-section relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      aria-labelledby="why-choose-us-heading"
    >
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="why-choose-us__container relative z-10">
        <motion.header
          className="why-choose-us__header"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="why-choose-us__kicker">WHY XENTIO DIGITAL</p>
          <h2 id="why-choose-us-heading" className="why-choose-us__heading">
          Why Businesses Choose Xentio Digital Over Other Agencies
          </h2>
          <p className="why-choose-us__sub">
          Most agencies talk about strategy. We talk about revenue. Here is what makes us different.
          </p>
        </motion.header>

        <motion.div
          className="why-choose-us__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={reducedMotion ? undefined : { perspective: '1200px' }}
        >
          {REASONS.map((item, index) => (
            <motion.article
              key={item.title}
              className="why-choose-us__card"
              variants={variants}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -4,
                      rotateY: 2,
                      rotateX: -2,
                      transition: { type: 'spring', stiffness: 400, damping: 28 },
                    }
              }
              style={{ transformStyle: reducedMotion ? undefined : 'preserve-3d' }}
            >
              <div className="why-choose-us__card-inner">
                <span className="why-choose-us__card-index" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="why-choose-us__card-title">{item.title}</h3>
                <p className="why-choose-us__card-desc">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
