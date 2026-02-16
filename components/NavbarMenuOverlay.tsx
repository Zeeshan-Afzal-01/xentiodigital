'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesData } from '@/lib/services-data'
import styles from './NavbarMenuOverlay.module.scss'

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

interface NavbarMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function NavbarMenuOverlay({ isOpen, onClose }: NavbarMenuOverlayProps) {
  const t = useTranslations('nav')
  const tContact = useTranslations('contact')
  const locale = useLocale()

  // Lock body scroll while menu is open so no scrollbar
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

  // Left column nav only: Home, About, Services, Portfolio, Testimonials (Contact is in right column)
  const mainLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/testimonials`, label: t('testimonials') },
  ]

  // Services sub-items: split into two columns for desktop
  const serviceItems = servicesData.flatMap((cat) =>
    cat.subServices.slice(0, 2).map((s) => ({ name: s.name, slug: s.slug }))
  )
  const mid = Math.ceil(serviceItems.length / 2)
  const servicesCol1 = serviceItems.slice(0, mid)
  const servicesCol2 = serviceItems.slice(mid)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.45, 0, 0.55, 1] }}
          aria-modal
          role="dialog"
          aria-label={t('menu')}
        >
          {/* Top right: Let's Talk + Close */}
          <div className={styles.topRight}>
            <Link
              href={`/${locale}/contact`}
              className={styles.letsTalkBtn}
              onClick={onClose}
            >
              <span>{t('letsTalk')}</span>
              <span className={styles.letsTalkArrow} aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Main wrapper: full viewport, flex, both columns centered vertically */}
          <div className={styles.mainWrapper}>
            {/* Left: Logo + Main nav + Services sub */}
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
                    <div key={link.href}>
                      {i > 0 && (
                        <motion.span
                          className={styles.bar}
                          variants={barVariants}
                          custom={i}
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                      {link.label === t('services') ? (
                        <motion.div className={styles.servicesBlock} variants={menuLinkVariants} custom={i}>
                          <Link
                            href={`/${locale}/services`}
                            className={styles.mainLink}
                            onClick={onClose}
                          >
                            {link.label}
                          </Link>
                          <div className={styles.servicesSub}>
                            <ul className={styles.servicesCol}>
                              {servicesCol1.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/${locale}/services/${s.slug}`}
                                    className={styles.subLink}
                                    onClick={onClose}
                                  >
                                    <span className={styles.bullet} aria-hidden />
                                    {s.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <ul className={styles.servicesCol}>
                              {servicesCol2.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/${locale}/services/${s.slug}`}
                                    className={styles.subLink}
                                    onClick={onClose}
                                  >
                                    <span className={styles.bullet} aria-hidden />
                                    {s.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div variants={menuLinkVariants} custom={i}>
                          <Link
                            href={link.href}
                            className={styles.mainLink}
                            onClick={onClose}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </nav>
            </motion.div>

            {/* Right: Working Worldwide, address, Discuss a project, Phone, Contact (last) */}
            <motion.div
              className={styles.rightCol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
            >
              <p className={styles.sectionLabel}>{t('workingWorldwide')}</p>
              <div className={styles.addressBlock}>
                <Link
                  href={`/${locale}/contact`}
                  className={styles.addressLink}
                  onClick={onClose}
                >
                  {tContact('addressLine1')}<br />
                  {tContact('addressLine2')}<br />
                  {tContact('addressLine3')}
                </Link>
              </div>
              <Link
                href={`/${locale}/contact`}
                className={styles.discussLink}
                onClick={onClose}
              >
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
                <Link
                  href={`/${locale}/contact`}
                  className={styles.contactLink}
                  onClick={onClose}
                >
                  {t('contact')}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
