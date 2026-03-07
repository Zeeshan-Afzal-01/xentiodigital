'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { Icon, IconName } from '@/components/icons'

type IndustryChapter = {
  key: string
  icon: IconName
  hook: string
  trust: string
  proof: string
  impact: string
  image: string
}

const INDUSTRY_CHAPTERS: IndustryChapter[] = [
  {
    key: 'industryFinance',
    icon: 'Finance',
    hook: 'Trust-led digital acceleration for regulated growth.',
    trust: 'Gaining trust with secure-by-default fintech journeys.',
    proof: 'Audit-ready workflows, encrypted data, transparent reporting.',
    impact: 'Higher conversion with lower risk exposure.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    key: 'industryHealthcare',
    icon: 'Healthcare',
    hook: 'Patient-first platforms with reliable performance.',
    trust: 'Gaining trust through privacy-first patient experiences.',
    proof: 'Role-based access, HIPAA-aligned architecture, uptime focus.',
    impact: 'Better engagement and safer care operations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  },
  {
    key: 'industryEcommerce',
    icon: 'Ecommerce',
    hook: 'Frictionless journeys that convert intent into revenue.',
    trust: 'Gaining trust with seamless checkout and social proof loops.',
    proof: 'Fast storefronts, intent-led funnels, loyalty mechanics.',
    impact: 'Higher AOV and repeat purchase momentum.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
  {
    key: 'industryEducation',
    icon: 'Education',
    hook: 'Learning ecosystems built for engagement at scale.',
    trust: 'Gaining trust via consistent, outcome-driven learning UX.',
    proof: 'LMS optimization, cohort insights, accessibility-led design.',
    impact: 'Improved completion and retention rates.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
  },
  {
    key: 'industryRealEstate',
    icon: 'Home',
    hook: 'From discovery to deal, every touchpoint optimized.',
    trust: 'Gaining trust with transparent property journeys.',
    proof: 'Lead routing, visual listings, high-intent nurturing flows.',
    impact: 'Faster closures and stronger lead quality.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  },
  {
    key: 'industryManufacturing',
    icon: 'Manufacturing',
    hook: 'Operational intelligence across production pipelines.',
    trust: 'Gaining trust through real-time operational visibility.',
    proof: 'Plant dashboards, supply-chain telemetry, alert automation.',
    impact: 'Reduced downtime and smarter planning decisions.',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop',
  },
]

export default function CinematicIndustriesSection() {
  const tIndustries = useTranslations('serviceCategoryPage')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lightY = useTransform(scrollYProgress, [0, 1], [100, -120])
  const shapeY = useTransform(scrollYProgress, [0, 1], [-40, 80])
  const cursorScale = useSpring(1, { stiffness: 260, damping: 25 })
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false })

  const chapters = useMemo(
    () =>
      INDUSTRY_CHAPTERS.map((it) => ({
        ...it,
        title: tIndustries(it.key),
        description: tIndustries(`${it.key}Desc`),
      })),
    [tIndustries]
  )
  const sliderItems = [...chapters, ...chapters]

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    })
  }

  return (
    <motion.section
      ref={sectionRef}
      className="cinematic-experience themeable-section section-padding"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        cursorScale.set(1)
        setCursor((prev) => ({ ...prev, active: true }))
      }}
      onMouseLeave={() => {
        cursorScale.set(0.65)
        setCursor((prev) => ({ ...prev, active: false }))
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.65 }}
      aria-labelledby="cinematic-industries-heading"
    >
      <div className="cinematic-experience__backdrop" aria-hidden />
      <div className="cinematic-experience__grid" aria-hidden />

      <motion.div className="cinematic-experience__light cinematic-experience__light--one" style={{ y: lightY }} aria-hidden />
      <motion.div className="cinematic-experience__light cinematic-experience__light--two" style={{ y: shapeY }} aria-hidden />

      <div className="cinematic-experience__particles" aria-hidden>
        {Array.from({ length: 42 }).map((_, i) => (
          <span
            key={i}
            className="cinematic-experience__particle"
            style={
              {
                '--i': i,
                '--x': `${(i % 10) * 10 + 2}%`,
                '--y': `${Math.floor(i / 10) * 23 + 4}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <motion.div
        className="cinematic-experience__cursor"
        style={{
          translateX: cursor.x - 48,
          translateY: cursor.y - 48,
          scale: cursor.active ? cursorScale : 0,
        }}
        aria-hidden
      />

      <div className="cinematic-experience__container">
        <motion.header
          className="cinematic-experience__hero"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="cinematic-experience__kicker">{tIndustries('industriesSectionSub')}</p>
          <h2 id="cinematic-industries-heading" className="cinematic-experience__heading">
            Industries We Transform
          </h2>
          <p className="cinematic-experience__sub">
            We design digital systems that feel human, scale globally, and turn complexity into clarity.
          </p>
          <p className="cinematic-experience__sub cinematic-experience__sub--slider-note">
            Auto-scrolling industry reel. Hover a slide to reveal deeper value.
          </p>
        </motion.header>

        <div className="cinematic-experience__industries-slider-wrap">
          <motion.div
            className="cinematic-experience__industries-slider"
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {sliderItems.map((chapter, index) => {
              return (
            <motion.article
              key={`${chapter.key}-${index}`}
              className="cinematic-experience__industry-slide magnetic"
              whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: -2 }}
              transition={{ duration: 0.25 }}
            >
              <div className="cinematic-experience__industry-slide-inner">
                <div className="cinematic-experience__industry-slide-face cinematic-experience__industry-slide-face--front">
                  <div className="cinematic-experience__industry-slide-overlay" aria-hidden />
                  <div className="cinematic-experience__industry-slide-index">{String((index % chapters.length) + 1).padStart(2, '0')}</div>
                  <div className="cinematic-experience__industry-slide-content">
                    <div className="cinematic-experience__industry-slide-icon">
                      <Icon name={chapter.icon} className="cinematic-experience__industry-slide-icon-inner" strokeWidth={2} />
                    </div>
                    <h3>{chapter.title}</h3>
                    <p className="cinematic-experience__industry-slide-default">{chapter.description}</p>
                    <div className="cinematic-experience__industry-slide-front-details">
                      <p>{chapter.trust}</p>
                      <p>{chapter.proof}</p>
                    </div>
                  </div>
                </div>
                <div className="cinematic-experience__industry-slide-face cinematic-experience__industry-slide-face--back">
                  <div
                    className="cinematic-experience__industry-slide-back-bg"
                    style={{ backgroundImage: `url(${chapter.image})` }}
                    aria-hidden
                  />
                  <div className="cinematic-experience__industry-slide-back-overlay" aria-hidden />
                  <div className="cinematic-experience__industry-slide-content">
                    <h3>{chapter.title}</h3>
                    <p className="cinematic-experience__industry-slide-hover">{chapter.hook}</p>
                    <p className="cinematic-experience__industry-slide-trust">{chapter.trust}</p>
                    <p className="cinematic-experience__industry-slide-proof">{chapter.proof}</p>
                    <p className="cinematic-experience__industry-slide-impact">{chapter.impact}</p>
                  </div>
                </div>
              </div>
            </motion.article>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
