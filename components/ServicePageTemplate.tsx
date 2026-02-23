'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import { SubService } from '@/lib/services-data'
import { Icon, IconName } from '@/components/icons'

/** Convert slug like 'app-development' to camelCase 'appDevelopment' */
function slugToCamel(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

interface ServicePageTemplateProps {
  service: SubService & { categoryId: string; categoryName: string }
}

interface TranslatedPageContent {
  title?: string
  subtitle?: string
  intro?: string
  features?: string[]
  benefits?: Array<{ title: string; description: string }>
  process?: Array<{ step: number; title: string; description: string }>
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const locale = useLocale()
  const t = useTranslations('services')
  const tPages = useTranslations('servicePages')
  const slugCamel = useMemo(() => slugToCamel(service.slug), [service.slug])
  const pageContent = useMemo(() => {
    try {
      const raw = tPages.raw(slugCamel) as TranslatedPageContent | undefined
      return raw && typeof raw === 'object' ? raw : null
    } catch {
      return null
    }
  }, [tPages, slugCamel])

  const title = pageContent?.title ?? service.name
  const subtitle = pageContent?.subtitle ?? service.description
  const intro = pageContent?.intro ?? service.intro
  const features = pageContent?.features ?? service.features ?? []
  const benefitsList = pageContent?.benefits ?? service.benefits ?? []
  const processSteps = pageContent?.process ?? service.process ?? []
  const benefitsWithIcons = benefitsList.map((b, i) => ({
    ...b,
    icon: Array.isArray(service.benefits) && service.benefits[i]?.icon ? service.benefits[i].icon : 'Star',
  }))

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={title}
        subtitle={subtitle}
        ctaText={t('getQuote') || 'Get a Quote'}
        ctaLink={`/${locale}/contact`}
        secondaryCtaText={t('learnMore') || 'Learn More'}
        secondaryCtaLink={`/${locale}/services`}
      />

      {/* Intro Section */}
      {intro && (
        <section className="section-padding relative">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xl md:text-2xl text-muted-enhanced leading-relaxed">
                {intro}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features.length > 0 && (
        <section className="section-padding bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
                <span className="gradient-text">{t('whatWeOffer')}</span>
              </h2>
              <p className="text-xl text-muted-enhanced max-w-3xl mx-auto">
                {t('whatWeOfferSub')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-premium rounded-2xl p-6 border transition-all duration-300 hover:border-primary-500/50"
                  style={{
                    borderColor: 'var(--border-default)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Icon name="Check" className="w-6 h-6 flex-shrink-0 text-primary-500" strokeWidth={2} />
                    <p className="text-high-contrast leading-relaxed">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefitsWithIcons.length > 0 && (
        <section className="section-padding relative">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
                <span className="gradient-text">{t('whyChooseTitle')}</span>
              </h2>
              <p className="text-xl text-muted-enhanced max-w-3xl mx-auto">
                {t('discoverBenefits')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefitsWithIcons.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="text-center"
                >
                  <div className="glass-premium rounded-3xl p-8 border transition-all duration-300 h-full flex flex-col items-center"
                    style={{
                      borderColor: 'var(--border-default)',
                    }}
                  >
                    <div className="flex justify-center mb-4 text-primary-500">
                      <Icon name={benefit.icon as IconName} className="w-12 h-12" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-high-contrast mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-enhanced leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="section-padding bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-900/5 to-transparent" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
                <span className="gradient-text">{t('ourProcess')}</span>
              </h2>
              <p className="text-xl text-muted-enhanced max-w-3xl mx-auto">
                {t('ourProcessSub')}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-2xl font-bold text-white">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 glass-premium rounded-2xl p-6 border"
                      style={{
                        borderColor: 'var(--border-default)',
                      }}
                    >
                      <h3 className="text-xl font-bold text-high-contrast mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-enhanced leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-accent-600/20" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <motion.h2
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #7C3AED 0%, #A855F7 25%, #06B6D4 50%, #22D3EE 75%, #22C55E 100%)',
                backgroundSize: '200% 200%',
              }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent"
            >
              {t('ctaReadyTitle')}
            </motion.h2>
            <p className="text-xl md:text-2xl mb-12 text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
              {t('ctaReadySub')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href={`/${locale}/contact`} className="btn-primary text-lg px-12 py-6 glow-purple">
                {t('getQuote') || 'Get a Quote'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
