'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function CaseStudiesSection() {
  const t = useTranslations('caseStudies')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const items = t.raw('items') as Array<{ title: string; metrics: string[] }>
  const validItems = Array.isArray(items) ? items : []

  if (validItems.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden py-20 md:py-28"
      aria-labelledby="case-studies-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-600/5 via-transparent to-secondary-600/5" aria-hidden />
      <div className="container-custom relative z-10">
        <motion.h2
          id="case-studies-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-12">
          {validItems.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-8 border bg-bg-elevated transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{ borderColor: 'var(--border-default)' }}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={index}
            >
              <h3 className="text-xl font-bold mb-4 text-high-contrast">{item.title}</h3>
              <ul className="space-y-2">
                {item.metrics?.map((metric, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-enhanced">
                    <span className="text-primary-500 font-bold">+</span>
                    {metric}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={`/${locale}/portfolio`}
            className="btn-primary inline-block px-10 py-4 text-base font-semibold"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
