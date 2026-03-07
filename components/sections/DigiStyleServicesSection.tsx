'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import { servicesData } from '@/lib/services-data'
import { Icon, IconName } from '@/components/icons'

/** Curated 8 services for the Digi-style cards (includes SEO & Digital Marketing) */
function getDigiServices() {
  const bySlug: Record<string, { id: string; name: string; slug: string; icon: string; description: string }> = {}
  for (const cat of servicesData) {
    if (cat.subServices?.length) {
      for (const sub of cat.subServices) {
        bySlug[sub.slug] = {
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          icon: sub.icon,
          description: sub.intro ?? sub.description,
        }
      }
    } else {
      bySlug[cat.slug] = {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.intro ?? cat.description,
      }
    }
  }
  const order = [
    'web-development',
    'ui-ux-design',
    'ecommerce-solutions',
    'custom-software',
    'app-development',
    'digital-marketing',
    'seo',
    'google-ads',
  ]
  return order.map((s) => bySlug[s]).filter(Boolean).slice(0, 8)
}

const DIGI_SERVICES = getDigiServices()

function DigiServiceCard({
  service,
  href,
  exploreText,
  isInView,
  index,
}: {
  service: (typeof DIGI_SERVICES)[0]
  href: string
  exploreText: string
  isInView: boolean
  index: number
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      const centerX = 50
      const centerY = 50
      const rotateY = ((x - centerX) / centerX) * 4
      const rotateX = ((y - centerY) / centerY) * -4
      setTransform({ rotateX, rotateY })
      setSpotlight({ x, y })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 })
    setSpotlight({ x: 50, y: 50 })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link
        ref={cardRef}
        href={href}
        className="digi-services__card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            '--rotate-x': `${transform.rotateX}deg`,
            '--rotate-y': `${transform.rotateY}deg`,
            '--spot-x': `${spotlight.x}%`,
            '--spot-y': `${spotlight.y}%`,
          } as React.CSSProperties
        }
      >
        <div className="digi-services__card-spotlight" aria-hidden />
        <div className="digi-services__card-border" aria-hidden />
        <div className="digi-services__card-glow" aria-hidden />
        <div className="digi-services__card-content">
        <div className="digi-services__card-icon">
          <Icon name={service.icon as IconName} className="digi-services__card-icon-inner" strokeWidth={2} />
        </div>
        <h3 className="digi-services__card-title">{service.name}</h3>
        <p className="digi-services__card-desc">
          {service.description.length > 200 ? `${service.description.slice(0, 200)}...` : service.description}
        </p>
        <span className="digi-services__card-link">
          {exploreText}
          <Icon name="ArrowRight" className="digi-services__card-arrow" strokeWidth={2.5} />
        </span>
        </div>
      </Link>
    </motion.div>
  )
}

const AUTO_SCROLL_SPEED = 4
/** Pause auto-scroll for this many ms after user manually scrolls (wheel/touch) */
const IDLE_BEFORE_AUTO_SCROLL_MS = 2200

export default function DigiStyleServicesSection() {
  const t = useTranslations('digiServices')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const lastUserScrollAt = useRef(0)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isHovering) return
    let rafId: number
    const scroll = () => {
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return
      const idle = Date.now() - lastUserScrollAt.current
      if (idle < IDLE_BEFORE_AUTO_SCROLL_MS) {
        rafId = requestAnimationFrame(scroll)
        return
      }
      el.scrollTop = Math.min(el.scrollTop + AUTO_SCROLL_SPEED, maxScroll)
      if (el.scrollTop >= maxScroll) el.scrollTop = 0
      rafId = requestAnimationFrame(scroll)
    }
    rafId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(rafId)
  }, [isHovering])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  const touchStartY = useRef(0)
  const touchStartScrollTop = useRef(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchStartScrollTop.current = scrollRef.current?.scrollTop ?? 0
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollHeight - el.clientHeight
    if (maxScroll <= 0) return
    lastUserScrollAt.current = Date.now()
    const touchY = e.touches[0].clientY
    const deltaY = touchStartY.current - touchY
    touchStartY.current = touchY
    const atTop = el.scrollTop <= 0
    const atBottom = el.scrollTop >= maxScroll - 1
    if (deltaY > 0 && !atBottom) {
      e.preventDefault()
      el.scrollTop = Math.min(el.scrollTop + deltaY, maxScroll)
    } else if (deltaY < 0 && !atTop) {
      e.preventDefault()
      el.scrollTop = Math.max(el.scrollTop + deltaY, 0)
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const el = scrollRef.current
    if (!el || document.activeElement !== el) return
    const maxScroll = el.scrollHeight - el.clientHeight
    if (maxScroll <= 0) return
    lastUserScrollAt.current = Date.now()
    const step = 40
    const pageStep = el.clientHeight
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault()
      el.scrollTop = Math.min(el.scrollTop + (e.key === 'PageDown' ? pageStep : step), maxScroll)
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      el.scrollTop = Math.max(el.scrollTop - (e.key === 'PageUp' ? pageStep : step), 0)
    }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const el = scrollRef.current
    if (!wrap || !el) return
    const opts: AddEventListenerOptions = { passive: false, capture: true }
    const onWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return
      lastUserScrollAt.current = Date.now()
      e.preventDefault()
      e.stopPropagation()
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop >= maxScroll - 1
      if (e.deltaY > 0) {
        if (atBottom) el.scrollTop = 0
        else el.scrollTop = Math.min(el.scrollTop + e.deltaY, maxScroll)
      } else if (e.deltaY < 0) {
        if (atTop) el.scrollTop = maxScroll
        else el.scrollTop = Math.max(el.scrollTop + e.deltaY, 0)
      }
    }
    wrap.addEventListener('wheel', onWheel, opts)
    return () => wrap.removeEventListener('wheel', onWheel, opts)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    wrap.addEventListener('touchstart', handleTouchStart, { passive: true })
    wrap.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      wrap.removeEventListener('touchstart', handleTouchStart)
      wrap.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleTouchStart, handleTouchMove])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <motion.section
      ref={sectionRef}
      className="digi-services themeable-section section-padding relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Same background as PartnersSection: glow orbs + grid */}
      <div className="digi-services__bg" aria-hidden />
      <div className="partners-bg-glow" aria-hidden />
      <div className="partners-bg-grid" aria-hidden />

      <div className="digi-services__container">
        <div className="digi-services__left">
          <motion.div
            className="digi-services__accent-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          />
          <motion.p
            className="digi-services__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {t('subHeading')}
          </motion.p>
          <motion.h2
            className="digi-services__heading"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            className="digi-services__para"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {t('para1')}
          </motion.p>
          <motion.p
            className="digi-services__para digi-services__para--last"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {t('para2')}
          </motion.p>
        </div>

        <motion.div
          ref={wrapRef}
          className="digi-services__right-wrap"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="digi-services__right"
            ref={scrollRef}
            tabIndex={0}
            role="region"
            aria-label={t('scrollLabel')}
          >
            {DIGI_SERVICES.map((service, index) => (
              <DigiServiceCard
                key={service.id}
                service={service}
                href={`/${locale}/services/${service.slug}`}
                exploreText={t('exploreLink', { service: service.name })}
                isInView={!!isInView}
                index={index}
              />
            ))}
          </div>
          <div className="digi-services__scroll-fade" aria-hidden />
        </motion.div>
      </div>
    </motion.section>
  )
}
