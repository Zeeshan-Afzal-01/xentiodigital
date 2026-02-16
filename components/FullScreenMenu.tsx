'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesData } from '@/lib/services-data'
import type { ServiceCategory } from '@/lib/services-data'
import styles from './FullScreenMenu.module.scss'

const SITE_LOGO_TEXT = 'XENTIO DIGITAL'

const menuLinkVariants = {
  closed: { opacity: 0, y: 24 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.06, duration: 0.45, ease: [0.45, 0, 0.55, 1] },
  }),
}

const barVariants = {
  closed: { scaleX: 0, opacity: 0 },
  open: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.45, 0, 0.55, 1] },
  }),
}

const submenuVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.45, 0, 0.55, 1] },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: { duration: 0.25, ease: [0.45, 0, 0.55, 1] },
  },
}

function useSubmenuClose(
  isOpen: boolean,
  closeSubmenus: () => void,
  servicesRowRef: React.RefObject<HTMLDivElement | null>
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') closeSubmenus()
    },
    [isOpen, closeSubmenus]
  )

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!isOpen || !servicesRowRef.current) return
      const target = e.target as Node
      if (!servicesRowRef.current.contains(target)) closeSubmenus()
    },
    [isOpen, closeSubmenus, servicesRowRef]
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleKeyDown, handleClickOutside])
}

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const t = useTranslations('nav')
  const tContact = useTranslations('contact')
  const locale = useLocale()
  const [openCategorySlug, setOpenCategorySlug] = useState<string | null>(null)
  const [hoverCategorySlug, setHoverCategorySlug] = useState<string | null>(null)
  const servicesRowRef = useRef<HTMLDivElement>(null)
  const closeSubmenus = useCallback(() => {
    setOpenCategorySlug(null)
    setHoverCategorySlug(null)
  }, [])
  useSubmenuClose(isOpen, closeSubmenus, servicesRowRef)

  useEffect(() => {
    if (isOpen) {
      const prevHtml = document.documentElement.style.overflow
      const prevBody = document.body.style.overflow
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = prevHtml
        document.body.style.overflow = prevBody
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setOpenCategorySlug(null)
      setHoverCategorySlug(null)
    }
  }, [isOpen])

  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const fn = () => setIsDesktop(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  const activeSlug = isDesktop ? hoverCategorySlug : openCategorySlug

  // Swap Digital Marketing ↔ Customer Care; E-Commerce Solutions ↔ Business Consulting
  const menuServiceCategories = useMemo(() => {
    const arr = [...servicesData]
    ;[arr[2], arr[3]] = [arr[3], arr[2]]
    ;[arr[1], arr[4]] = [arr[4], arr[1]]
    return arr
  }, [])

  const mainLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services'), isServices: true },
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/testimonials`, label: t('testimonials') },
  ]

  const handleCategoryClick = (slug: string) => {
    setOpenCategorySlug((prev) => (prev === slug ? null : slug))
  }

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.45, 0, 0.55, 1] }}
        key="fullscreen-menu"
        aria-modal
        role="dialog"
        aria-label={t('menu')}
      >
        <div className={styles.topRight}>
          <Link href={`/${locale}/contact`} className={styles.letsTalkBtn} onClick={onClose}>
            <span>{t('letsTalk')}</span>
            <span className={styles.letsTalkArrow} aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className={styles.mainWrapper}>
          <motion.div
            className={styles.leftCol}
            initial="closed"
            animate="open"
            variants={{ open: { transition: { staggerChildren: 0.06 } } }}
          >
            <Link href={`/${locale}`} className={styles.logo} onClick={onClose}>
              {SITE_LOGO_TEXT}
            </Link>

            <nav className={styles.navMain} aria-label="Main navigation">
              {mainLinks.map((link, i) => (
                <div key={link.href + (link.isServices ? 'services' : '')}>
                  {i > 0 && (
                    <motion.span
                      className={styles.bar}
                      variants={barVariants}
                      custom={i}
                      style={{ transformOrigin: 'left' }}
                    />
                  )}
                  {link.isServices ? (
                    <motion.div className={styles.servicesBlock} variants={menuLinkVariants} custom={i}>
                      <Link href={`/${locale}/services`} className={styles.mainLink} onClick={onClose}>
                        {link.label}
                      </Link>
                      <div
                        ref={servicesRowRef}
                        className={styles.servicesCategoriesRow}
                        onMouseLeave={() => isDesktop && setHoverCategorySlug(null)}
                      >
                        <div className={styles.serviceCategoriesGrid} role="menubar" aria-label={t('services')}>
                          <ul className={styles.serviceCategories}>
                            {menuServiceCategories.slice(0, 3).map((cat: ServiceCategory) => (
                              <li key={cat.slug} role="none" className={styles.serviceCategoryItem}>
                                <button
                                  type="button"
                                  className={styles.serviceCategoryBtn}
                                  onClick={() => (!isDesktop ? handleCategoryClick(cat.slug) : undefined)}
                                  onMouseEnter={() => isDesktop && setHoverCategorySlug(cat.slug)}
                                  aria-expanded={activeSlug === cat.slug}
                                  aria-haspopup="true"
                                  aria-controls={`submenu-${cat.slug}`}
                                  id={`category-${cat.slug}`}
                                >
                                  <span className={styles.bullet} aria-hidden />
                                  {cat.name}
                                </button>
                                <AnimatePresence>
                                  {activeSlug === cat.slug && (
                                    <motion.div
                                      id={`submenu-${cat.slug}`}
                                      className={styles.submenuPanel}
                                      role="menu"
                                      aria-labelledby={`category-${cat.slug}`}
                                      variants={submenuVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                      key={cat.slug}
                                    >
                                      {cat.subServices.map((sub) => (
                                        <Link
                                          key={sub.slug}
                                          href={`/${locale}/services/${sub.slug}`}
                                          className={styles.subLink}
                                          onClick={onClose}
                                          role="menuitem"
                                        >
                                          {sub.name}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </li>
                            ))}
                          </ul>
                          <ul className={styles.serviceCategories}>
                            {menuServiceCategories.slice(3, 5).map((cat: ServiceCategory) => (
                              <li key={cat.slug} role="none" className={styles.serviceCategoryItem}>
                                <button
                                  type="button"
                                  className={styles.serviceCategoryBtn}
                                  onClick={() => (!isDesktop ? handleCategoryClick(cat.slug) : undefined)}
                                  onMouseEnter={() => isDesktop && setHoverCategorySlug(cat.slug)}
                                  aria-expanded={activeSlug === cat.slug}
                                  aria-haspopup="true"
                                  aria-controls={`submenu-${cat.slug}`}
                                  id={`category-${cat.slug}`}
                                >
                                  <span className={styles.bullet} aria-hidden />
                                  {cat.name}
                                </button>
                                <AnimatePresence>
                                  {activeSlug === cat.slug && (
                                    <motion.div
                                      id={`submenu-${cat.slug}`}
                                      className={styles.submenuPanel}
                                      role="menu"
                                      aria-labelledby={`category-${cat.slug}`}
                                      variants={submenuVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                      key={cat.slug}
                                    >
                                      {cat.subServices.map((sub) => (
                                        <Link
                                          key={sub.slug}
                                          href={`/${locale}/services/${sub.slug}`}
                                          className={styles.subLink}
                                          onClick={onClose}
                                          role="menuitem"
                                        >
                                          {sub.name}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div variants={menuLinkVariants} custom={i}>
                      <Link href={link.href} className={styles.mainLink} onClick={onClose}>
                        {link.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
          >
            <p className={styles.sectionLabel}>{t('workingWorldwide')}</p>
            <div className={styles.addressBlock}>
              <Link href={`/${locale}/contact`} className={styles.addressLink} onClick={onClose}>
                {tContact('addressLine1')}<br />
                {tContact('addressLine2')}<br />
                {tContact('addressLine3')}
              </Link>
            </div>
            <Link href={`/${locale}/contact`} className={styles.discussLink} onClick={onClose}>
              {t('discussProject')}
            </Link>
            <p className={styles.sectionLabel}>{t('phone')}</p>
            <a
              href={`tel:${(tContact('phoneNumber') || '').replace(/\D/g, '')}`}
              className={styles.phoneLink}
              onClick={onClose}
            >
              {tContact('phoneNumber')}
            </a>
            <div className={styles.contactBlock}>
              <span className={styles.bar} aria-hidden />
              <Link href={`/${locale}/contact`} className={styles.contactLink} onClick={onClose}>
                {t('contact')}
              </Link>
            </div>
            <div className={styles.blogBlock}>
              <span className={styles.bar} aria-hidden />
              <Link href={`/${locale}/blog`} className={styles.contactLink} onClick={onClose}>
                {t('blog')}
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}
