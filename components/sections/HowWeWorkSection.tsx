'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

const STEPS = [
  {
    number: '01',
    title: 'Contact Us (Free)',
    description:
      'You tell us about your business and your goals. We listen. This is completely free and there is no pressure. If we are the right fit, we move to the next step.',
    cta: { label: 'Contact Us', href: '/contact' },
  },
  {
    number: '02',
    title: 'Audit and Strategy',
    description:
      'We analyze your website, SEO health, ad accounts, competitors, and target audience. Then we build a custom strategy tailored to your business before spending a single dollar.',
    cta: null,
  },
  {
    number: '03',
    title: 'Execution',
    description:
      'Once you approve the strategy, our team gets to work. SEO specialists, paid ads experts, and web developers all aligned toward the same growth goal.',
    cta: null,
  },
  {
    number: '04',
    title: 'Reporting and Optimization',
    description:
      'Every week you receive a report showing exactly what your campaigns are doing. We continuously improve your results until the numbers make you happy.',
    cta: null,
  },
]

export default function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const locale = useLocale()

  return (
    <motion.section
      ref={sectionRef}
      className="how-we-work themeable-section relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      aria-labelledby="how-we-work-heading"
    >
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="how-we-work__container relative z-10">
        <motion.header
          className="how-we-work__header"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="how-we-work__kicker">HOW WE WORK</p>
          <h2 id="how-we-work-heading" className="how-we-work__heading">
            A Simple Process. Exceptional Results.
          </h2>
          <p className="how-we-work__sub">
            We follow a proven 4-step process with every client. No guesswork, no delays, no confusion about what happens next.
          </p>
        </motion.header>

        <div className="how-we-work__row">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="how-we-work__step"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="how-we-work__step-number">{step.number}</div>
              <h3 className="how-we-work__step-title">{step.title}</h3>
              <p className="how-we-work__step-desc">{step.description}</p>
              {step.cta && (
                <Link href={`/${locale}${step.cta.href}`} className="how-we-work__step-cta">
                  {step.cta.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
