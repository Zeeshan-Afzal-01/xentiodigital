'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ContactForm from '@/components/ContactForm'

export default function ContactFormSection() {
  const t = useTranslations('contact')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={sectionRef}
      className="contact-form-section themeable-section section-padding relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      aria-labelledby="contact-form-heading"
    >
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="contact-form-section__container">
        <motion.div
          className="contact-form-section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h2 id="contact-form-heading" className="contact-form-section__heading">
            {t('title')}
          </h2>
          <p className="contact-form-section__sub">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          className="contact-form-section__form-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.aside
            className="contact-form-section__visual"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="contact-form-section__visual-image" aria-hidden />
            <div className="contact-form-section__visual-overlay" aria-hidden />
            <div className="contact-form-section__visual-content">
              <p className="contact-form-section__visual-kicker">{t('kicker')}</p>
              <h3 className="contact-form-section__visual-title">{t('visualTitle')}</h3>
              <p className="contact-form-section__visual-sub">{t('visualSubtitle')}</p>
              <ul className="contact-form-section__visual-list">
                <li>{t('visualPoint1')}</li>
                <li>{t('visualPoint2')}</li>
                <li>{t('visualPoint3')}</li>
              </ul>
            </div>
          </motion.aside>
          <div className="contact-form-section__form-column">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
