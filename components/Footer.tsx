'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { isRTL } from '@/lib/translation'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('footer')
  const locale = useLocale()
  const rtl = isRTL(locale)

  const footerLinks = {
    services: [
      { href: `/${locale}/services/web-development`, label: 'Web Development' },
      { href: `/${locale}/services/mobile-apps`, label: 'Mobile Apps' },
      { href: `/${locale}/services/seo-digital-marketing`, label: 'SEO & Marketing' },
      { href: `/${locale}/services/ecommerce-solutions`, label: 'eCommerce' },
      { href: `/${locale}/services/ux-ui-design`, label: 'UX/UI Design' },
      { href: `/${locale}/services/desktop-custom-software`, label: 'Custom Software' },
    ],
    company: [
      { href: `/${locale}/about`, label: 'About Us' },
      { href: `/${locale}/portfolio`, label: 'Portfolio' },
      { href: `/${locale}/testimonials`, label: 'Testimonials' },
      { href: `/${locale}/team`, label: 'Team' },
      { href: `/${locale}/careers`, label: 'Careers' },
      { href: `/${locale}/contact`, label: 'Contact' },
    ],
    legal: [
      { href: `/${locale}/privacy-policy`, label: 'Privacy Policy' },
      { href: `/${locale}/terms-of-service`, label: 'Terms of Service' },
    ],
  }

  const socialLinks = [
    { href: '#', icon: 'LinkedIn', label: 'LinkedIn' },
    { href: '#', icon: 'Twitter', label: 'Twitter' },
    { href: '#', icon: 'Facebook', label: 'Facebook' },
    { href: '#', icon: 'Instagram', label: 'Instagram' },
  ]

  return (
    <footer className="relative border-t" style={{ 
      background: 'var(--bg-secondary)',
      borderColor: 'var(--border-default)',
    }}>
      <div className="absolute inset-0 opacity-30" style={{
        background: 'linear-gradient(to right, rgba(109, 40, 217, 0.05) 0%, transparent 50%, rgba(8, 145, 178, 0.05) 100%)',
      }} />

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">Xentio Digital</h3>
            <p className="text-muted-enhanced mb-6 leading-relaxed">
              Leading digital services provider helping businesses transform their digital presence.
            </p>
            <div className={`flex gap-4 flex-wrap ${rtl ? 'flex-row-reverse' : ''}`}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-enhanced hover:text-high-contrast hover:bg-primary-500/20 transition-all group flex-shrink-0"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5 group-hover:glow-purple" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-high-contrast font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-enhanced hover:text-high-contrast hover:gradient-text transition-all animated-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-high-contrast font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-enhanced hover:text-high-contrast hover:gradient-text transition-all animated-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-high-contrast font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-enhanced">
              <li>
                <a
                  href="mailto:info@xentiodigital.com"
                  className="hover:text-high-contrast transition-colors"
                >
                  info@xentiodigital.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-high-contrast transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/${locale}/contact`} className="btn-primary inline-block">
                    Get Quote
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t pt-8 mt-8"
          style={{
            borderColor: 'var(--border-default)',
          }}
        >
          <div className={`flex flex-col md:flex-row justify-between items-center ${rtl ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-muted-enhanced text-sm mb-4 md:mb-0 text-start md:text-center">
              &copy; {currentYear} Xentio Digital. {t('rights')}.
            </p>
            <div className={`flex gap-6 flex-wrap ${rtl ? 'flex-row-reverse' : ''}`}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-enhanced hover:text-high-contrast transition-colors animated-underline whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
