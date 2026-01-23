'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/AnimatedCounter'
import { Icon, IconName } from '@/components/icons'

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
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-secondary-900/30"
      />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-muted-enhanced max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="group relative h-full"
            >
              <div className="glass-premium rounded-3xl p-8 text-center border transition-all duration-500 relative overflow-hidden h-full flex flex-col"
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                />
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                />
                <div className="relative z-10 flex-1 flex flex-col min-w-0">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="mb-6 inline-block flex-shrink-0 text-primary-500"
                  >
                    <Icon name={stat.icon} className="w-12 h-12" strokeWidth={2} />
                  </motion.div>
                  <div
                    className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent flex-shrink-0`}
                  >
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm font-medium text-muted-enhanced line-clamp-2">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
