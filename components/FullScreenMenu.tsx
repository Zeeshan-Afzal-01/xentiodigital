'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FullScreenMenu.module.scss'

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

const MENU_SERVICES = [
  { label: 'Search Engine Optimization', href: '/services/seo' },
  { label: 'Google Ads Management', href: '/services/google-ads' },
  { label: 'Meta Ads (Facebook & Instagram)', href: '/services/meta-ads' },
  { label: 'TikTok Ads', href: '/services/tiktok-ads' },
  { label: 'Web Development', href: '/services/web-development' },
]

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const t = useTranslations('nav')
  const tContact = useTranslations('contact')
  const locale = useLocale()

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

  const mainLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services'), isServices: true },
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/testimonials`, label: t('testimonials') },
  ]

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icon.svg"
                  alt="Xentio Digital"
                  className={styles.logoImg}
                  decoding="async"
                />
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
                        <div className={styles.servicesCategoriesRow}>
                          <ul className={styles.serviceCategories}>
                            {MENU_SERVICES.map((service) => (
                              <li key={service.href} className={styles.serviceCategoryItem}>
                                <Link
                                  href={`/${locale}${service.href}`}
                                  className={styles.serviceCategoryBtn}
                                  onClick={onClose}
                                >
                                  <span className={styles.bullet} aria-hidden />
                                  {service.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
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
