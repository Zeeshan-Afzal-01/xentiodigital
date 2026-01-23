'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Icon, IconName } from '@/components/icons'

export default function FeaturesSection() {
  const t = useTranslations('features')
  
  const features = [
    {
      title: t('expertTeam.title'),
      description: t('expertTeam.description'),
      icon: 'Users' as IconName,
      stat: t('expertTeam.stat'),
      statLabel: t('expertTeam.statLabel'),
    },
    {
      title: t('provenResults.title'),
      description: t('provenResults.description'),
      icon: 'Analytics' as IconName,
      stat: t('provenResults.stat'),
      statLabel: t('provenResults.statLabel'),
    },
    {
      title: t('modernTech.title'),
      description: t('modernTech.description'),
      icon: 'Performance' as IconName,
      stat: t('modernTech.stat'),
      statLabel: t('modernTech.statLabel'),
    },
    {
      title: t('dedicatedSupport.title'),
      description: t('dedicatedSupport.description'),
      icon: 'Target' as IconName,
      stat: t('dedicatedSupport.stat'),
      statLabel: t('dedicatedSupport.statLabel'),
    },
  ]
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group relative perspective-1000 h-full"
            >
              <div className="glass-premium rounded-3xl p-10 text-center border transition-all duration-500 relative overflow-hidden h-full flex flex-col"
                style={{
                  borderColor: 'var(--border-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent-500/10 transition-all duration-500 rounded-3xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
                <div className="relative z-10 flex-1 flex flex-col min-w-0">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: -4 }}
                    transition={{ duration: 0.2 }}
                    className="mb-8 inline-block flex-shrink-0 text-primary-500"
                  >
                    <Icon name={feature.icon} className="w-14 h-14" strokeWidth={2} />
                  </motion.div>
                  <div className="mb-4 flex-shrink-0">
                    <div className="text-4xl font-bold gradient-text mb-2">{feature.stat}</div>
                    <div className="text-sm font-semibold text-muted-enhanced uppercase tracking-wider">
                      {feature.statLabel}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-high-contrast mb-4 line-clamp-2">{feature.title}</h3>
                  <p className="text-muted-enhanced leading-relaxed flex-1 line-clamp-3">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
