'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon, IconName } from '@/components/icons'

const INDUSTRY_KEYS: { key: string; icon: IconName }[] = [
  { key: 'industryEcommerce', icon: 'Ecommerce' },
  { key: 'industryHealthcare', icon: 'Healthcare' },
  { key: 'industryFinance', icon: 'Finance' },
  { key: 'industryEducation', icon: 'Education' },
  { key: 'industryRealEstate', icon: 'Home' },
  { key: 'industryManufacturing', icon: 'Manufacturing' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
}

export default function IndustriesSection() {
  const t = useTranslations('serviceCategoryPage')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const subHeading = t('industriesSectionSub')
  const heading = t('industriesWeServe')
  const intro = t('industriesWeServeSub')

  return (
    <motion.section
      ref={sectionRef}
      className="industries-section themeable-section section-padding relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      aria-labelledby="industries-heading"
    >
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="industries-section__container">
        <motion.div
          className="industries-section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.div
            className="industries-section__accent-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          />
          <p className="industries-section__sub">{subHeading}</p>
          <h2 id="industries-heading" className="industries-section__heading">
            {heading}
          </h2>
          <p className="industries-section__intro">{intro}</p>
        </motion.div>

        <motion.div
          className="industries-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {INDUSTRY_KEYS.map(({ key, icon }) => (
            <motion.article
              key={key}
              className="industries-section__card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] } }}
            >
              <div className="industries-section__card-shine" aria-hidden />
              <div className="industries-section__card-icon-wrap">
                <Icon name={icon} className="industries-section__card-icon" strokeWidth={2} />
              </div>
              <h3 className="industries-section__card-title">{t(key)}</h3>
              <p className="industries-section__card-desc">{t(`${key}Desc`)}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
