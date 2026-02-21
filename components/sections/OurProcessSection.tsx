'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useHorizontalProgress } from '@/hooks/useHorizontalProgress'
import styles from './OurProcessSection.module.scss'

const DS = 'https://www.digitalsilk.com/wp-content/uploads/2024/06'

const PROCESS_IMAGES = [
  { src: `${DS}/iStock-932335774-2.png`, alt: 'Web strategy and research' },
  { src: `${DS}/iStock-932335774-3.png`, alt: 'Planning and information architecture' },
  { src: `${DS}/iStock-932335774-4.png`, alt: 'Creative design' },
  { src: `${DS}/responsive.png`, alt: 'Responsive development' },
  { src: `${DS}/quality.png`, alt: 'Quality assurance' },
  { src: `${DS}/launch.png`, alt: 'Launch and optimization' },
]

const FALLBACK_STEPS: Array<{
  title: string
  intro: string
  introBold?: string
  listTitle: string
  items: string[]
}> = [
  {
    title: 'Web Strategy',
    intro: 'We use in-depth research and analysis as key pillars to build a step-by-step plan that expands your digital presence and drives online growth.',
    listTitle: 'In this phase, we:',
    items: ['Identify your target audiences', 'Analyze user pain-points & define your UVPs', 'Define key performance indicators (KPIs)', 'Create a roadmap to growing your brand online'],
  },
  {
    title: 'Planning & Information Architecture',
    intro: "We utilize proven techniques to map your content, meet user intentions and create an engaging user experience. By outlining your site's structure, we ensure seamless user journeys to key conversion points.",
    introBold: 'we ensure seamless user journeys to key conversion points',
    listTitle: "Here's how our team does it:",
    items: ['We develop a base-level user flow & sitemap', 'We utilize wireframing to create a seamless conversion funnel', 'We add on-brand, consistent messaging to your structure'],
  },
  {
    title: 'Creative Design',
    intro: 'This stage is where you will see your site come to life. Our award-winning designers implement your unique branding elements to add your identity to your custom web design.',
    introBold: 'award-winning designers',
    listTitle: 'With just 50 milliseconds to make a good first impression, your website needs to stand out. To achieve this, we:',
    items: ['Thoughtfully place design features to guide the user journey', 'Utilize interactive videos & animations', 'Create custom, branded illustrations', 'Ensure accessibility & search engine optimization'],
  },
  {
    title: 'Responsive Development',
    intro: 'A responsive website is fast, accessible and easy to navigate. It automatically scales to various screen sizes and devices, driving user experience and climbing search engine rankings.',
    listTitle: 'To ensure your website reaches and satisfies every user, we:',
    introBold: 'reaches and satisfies every user',
    items: ['Gather touchpoint & user-channel insights', 'Transform your wireframes into a flexible UI', 'Test across devices before approval & launch'],
  },
  {
    title: 'Quality Assurance (QA)',
    intro: 'We pride ourselves on delivering measurable results and professional outcomes. By following a strict quality assurance (QA) protocol, we guarantee a high-quality digital experience for your brand.',
    introBold: 'we pride ourselves on delivering measurable results and professional outcomes',
    listTitle: 'To achieve this, we:',
    items: ['Actively involve our clients throughout every project', 'Meticulously test all designs to catch errors', 'Use tried-and-tested tools to secure before launch'],
  },
  {
    title: 'Launch & Optimization',
    intro: 'Our end-to-end website design services cover both launch and post-launch support. We meticulously monitor, test and optimize your website elements to ensure every part of your site is functioning optimally.',
    listTitle: 'Our design specialists make this happen by:',
    items: ['Following a strict protocol for every website launch', 'Offering post-launch maintenance & optimization', 'Creating & implementing a digital marketing plan to drive awareness across touchpoints'],
  },
]

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function OurProcessSection() {
  const t = useTranslations('process')
  const locale = useLocale()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const rawSteps = t.raw('steps') as Array<{
    title: string
    intro: string
    introBold?: string
    listTitle: string
    items: string[]
  }> | undefined
  const steps = Array.isArray(rawSteps) && rawSteps.length >= 6 ? rawSteps : FALLBACK_STEPS

  const { progress, activeIndex } = useHorizontalProgress(scrollerRef, steps.length)

  const title = typeof t('title') === 'string' ? t('title') : 'Website Design Process'
  const sub = typeof t('sub') === 'string' ? t('sub') : 'Take a peek behind the curtain and explore the custom web design process our team follows. We build custom sites for brands of all sizes that deliver measurable results.'
  const subLink = typeof t('subLink') === 'string' ? t('subLink') : 'measurable results'

  return (
    <motion.section
      ref={sectionRef}
      className={`${styles.section} themeable-section themeable-process`}
      aria-labelledby="process-title"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className={`${styles.bgLeft} process-bg`} aria-hidden />
      <div className={`${styles.bgRight} process-bg`} aria-hidden />

      <div className={styles.headingWrap}>
        <motion.h2
          id="process-title"
          className={styles.title}
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {title}
        </motion.h2>
        <motion.p
          className={styles.subcopy}
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {sub.replace(subLink, '').replace(/\.\s*$/, '').trim()}
          {' '}
          <Link href={`/${locale}/portfolio`} className={styles.subcopyLink}>
            {subLink}
          </Link>
          .
        </motion.p>
      </div>

      <div className={styles.scrollerWrap}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scroll progress"
        />
        <div
          ref={scrollerRef}
          className={styles.scroller}
          role="region"
          aria-label="Website design process steps"
          tabIndex={0}
        >
          <div className={styles.inner} role="list">
            {steps.map((step, index) => (
              <motion.article
                key={index}
                className={`${styles.slide} ${activeIndex === index ? styles.slideActive : ''}`}
                role="listitem"
                tabIndex={0}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <div className={styles.media}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={PROCESS_IMAGES[index]?.src ?? PROCESS_IMAGES[0].src}
                      alt={PROCESS_IMAGES[index]?.alt ?? step.title}
                      width={210}
                      height={149}
                      priority={index < 2}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 80vw, (max-width: 1280px) 60vw, 40vw"
                      className={styles.img}
                    />
                  </div>
                </div>
                <div className={styles.content}>
                  <motion.h3
                    className={styles.slideTitle}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView && activeIndex === index ? 'visible' : 'hidden'}
                    custom={0}
                  >
                    {step.title}
                  </motion.h3>
                  <div className={styles.bodyText}>
                    <motion.p
                      variants={itemVariants}
                      initial="hidden"
                      animate={isInView && activeIndex === index ? 'visible' : 'hidden'}
                      custom={1}
                    >
                      {step.introBold ? (
                        <>
                          {step.intro.replace(step.introBold, '').replace(/\.\s*$/, '').trim()}
                          {' '}
                          <strong>{step.introBold}</strong>.
                        </>
                      ) : (
                        step.intro
                      )}
                    </motion.p>
                    <p className={styles.listTitle}>{step.listTitle}</p>
                    <ul className={styles.list}>
                      {step.items.map((item, i) => (
                        <motion.li
                          key={i}
                          className={styles.listItem}
                          variants={itemVariants}
                          initial="hidden"
                          animate={isInView && activeIndex === index ? 'visible' : 'hidden'}
                          custom={2 + i}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <span className={styles.counter} aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.article>
            ))}
            <div className={styles.slideDummy} aria-hidden />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
