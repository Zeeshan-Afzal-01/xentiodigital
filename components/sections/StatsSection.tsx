'use client'

import { useTranslations } from 'next-intl'
import AnimatedCounter from '@/components/AnimatedCounter'
import { Icon, IconName } from '@/components/icons'

/**
 * By The Numbers — no Framer whileInView/whileHover, no glass blur, no hover blur.
 * Reduces scroll lag when this section enters the viewport.
 */
export default function StatsSection() {
  const t = useTranslations('stats')

  const stats = [
    { value: '500+', label: t('projects'), icon: 'DigitalTransformation' as IconName, color: 'from-purple-500 to-pink-500' },
    { value: '98%', label: t('satisfaction'), icon: 'Star' as IconName, color: 'from-cyan-500 to-blue-500' },
    { value: '50+', label: t('team'), icon: 'Users' as IconName, color: 'from-green-500 to-emerald-500' },
    { value: '10+', label: t('experience'), icon: 'Award' as IconName, color: 'from-yellow-500 to-orange-500' },
  ]

  return (
    <section className="section-padding-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-secondary-900/30" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-muted-enhanced max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
          {stats.map((stat, index) => (
            <div key={index} className="relative h-full">
              <div className="service-card-surface rounded-3xl p-8 text-center relative overflow-hidden h-full flex flex-col">
                <div className="relative z-10 flex-1 flex flex-col min-w-0">
                  <div className="mb-6 inline-block flex-shrink-0 text-primary-500">
                    <Icon name={stat.icon} className="w-12 h-12" strokeWidth={2} />
                  </div>
                  <div
                    className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent flex-shrink-0`}
                  >
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm font-medium text-muted-enhanced line-clamp-2">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
