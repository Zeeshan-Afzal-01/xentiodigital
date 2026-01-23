'use client'

import { useTranslations } from 'next-intl'
import { Icon, IconName } from '@/components/icons'

/**
 * Why Choose Xentio Digital — no Framer whileInView/whileHover, no glass blur, no hover blur.
 * Reduces scroll lag when this section enters the viewport.
 */
export default function FeaturesSection() {
  const t = useTranslations('features')

  const features = [
    { title: t('expertTeam.title'), description: t('expertTeam.description'), icon: 'Users' as IconName, stat: t('expertTeam.stat'), statLabel: t('expertTeam.statLabel') },
    { title: t('provenResults.title'), description: t('provenResults.description'), icon: 'Analytics' as IconName, stat: t('provenResults.stat'), statLabel: t('provenResults.statLabel') },
    { title: t('modernTech.title'), description: t('modernTech.description'), icon: 'Performance' as IconName, stat: t('modernTech.stat'), statLabel: t('modernTech.statLabel') },
    { title: t('dedicatedSupport.title'), description: t('dedicatedSupport.description'), icon: 'Target' as IconName, stat: t('dedicatedSupport.stat'), statLabel: t('dedicatedSupport.statLabel') },
  ]

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
          {features.map((feature, index) => (
            <div key={index} className="relative h-full">
              <div className="service-card-surface rounded-3xl p-10 text-center relative overflow-hidden h-full flex flex-col">
                <div className="relative z-10 flex-1 flex flex-col min-w-0">
                  <div className="mb-8 inline-block flex-shrink-0 text-primary-500">
                    <Icon name={feature.icon} className="w-14 h-14" strokeWidth={2} />
                  </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
