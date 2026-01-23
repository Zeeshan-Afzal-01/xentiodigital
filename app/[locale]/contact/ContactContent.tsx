'use client'

import { useTranslations, useLocale } from 'next-intl'
import ContactForm from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Icon } from '@/components/icons'
import { isRTL } from '@/lib/translation'

export default function ContactContent() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const rtl = isRTL(locale)

  return (
    <>
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-background to-secondary-900/30" />
        
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape bg-primary-500/20" />
          <div className="floating-shape bg-secondary-500/20" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">{t('title')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <section className="section-padding relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-high-contrast mb-8">{t('contactInfo')}</h2>
              <div className="space-y-8">
                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2 flex items-center">
                    <Icon name="Mail" className={`${rtl ? 'ml-3' : 'mr-3'} w-5 h-5`} strokeWidth={2} /> {t('email')}
                  </h3>
                  <a
                    href="mailto:info@xentiodigital.com"
                    className="text-primary-400 hover:text-primary-300 transition-colors animated-underline inline-block"
                  >
                    info@xentiodigital.com
                  </a>
                </div>
                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2 flex items-center">
                    <Icon name="Phone" className={`${rtl ? 'ml-3' : 'mr-3'} w-5 h-5`} strokeWidth={2} /> {t('phone')}
                  </h3>
                  <a
                    href="tel:+1234567890"
                    className="text-primary-400 hover:text-primary-300 transition-colors animated-underline inline-block"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2 flex items-center">
                    <Icon name="Clock" className={`${rtl ? 'ml-3' : 'mr-3'} w-5 h-5`} strokeWidth={2} /> {t('officeHours')}
                  </h3>
                  <p className="text-muted-enhanced">
                    {t('officeHoursMonFri')}<br />
                    {t('officeHoursSat')}<br />
                    {t('officeHoursSun')}
                  </p>
                </div>
                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2 flex items-center">
                    <Icon name="Pin" className={`${rtl ? 'ml-3' : 'mr-3'} w-5 h-5`} strokeWidth={2} /> {t('address')}
                  </h3>
                  <p className="text-muted-enhanced">
                    {t('addressLine1')}<br />
                    {t('addressLine2')}<br />
                    {t('addressLine3')}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-high-contrast mb-8">{t('sendMessage')}</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
