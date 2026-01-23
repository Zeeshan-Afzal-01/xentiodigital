'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { isRTL } from '@/lib/translation'
import { Icon, IconName } from '@/components/icons'

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon?: IconName
  index?: number
  locale?: string
  gradient?: string
}

export default function ServiceCard({ title, description, href, icon, index = 0, locale, gradient }: ServiceCardProps) {
  const currentLocale = useLocale()
  const activeLocale = locale || currentLocale
  const rtl = isRTL(activeLocale)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group h-full"
    >
      <Link href={`/${activeLocale}${href}`} className="block h-full">
        <div className="glass-strong rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300 border flex flex-col"
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
          {/* Gradient Border on Hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-xl ${rtl ? 'scale-x-[-1]' : ''}`} />
          </div>

          {/* Icon */}
          {icon && (
            <motion.div
              whileHover={{ scale: 1.06, rotate: -4 }}
              transition={{ duration: 0.2 }}
              className="w-20 h-20 mb-8 relative z-10 flex-shrink-0"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center text-4xl border shadow-lg"
                style={{
                  borderColor: 'var(--border-default)',
                }}
              >
                <Icon name={icon} className="w-9 h-9 text-high-contrast" strokeWidth={2} />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          )}

          {/* Content - Flexible */}
          <div className="relative z-10 flex-1 flex flex-col min-w-0">
            <h3 className="text-2xl md:text-3xl font-bold text-high-contrast mb-4 group-hover:gradient-text transition-all duration-300 text-start line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-enhanced mb-6 leading-relaxed text-base text-start flex-1 line-clamp-3">{description}</p>
            
            {/* Arrow Icon - RTL Aware */}
            <div className={`flex items-center transition-colors mt-auto ${rtl ? 'flex-row-reverse' : ''}`}
              style={{
                color: 'var(--brand-primary)',
              }}
            >
              <span className="font-semibold">{rtl ? 'المزيد' : 'Learn more'}</span>
              <Icon
                name="ArrowRight"
                rtlFlip
                rtl={rtl}
                className={`w-5 h-5 transition-transform duration-200 ${
                  rtl ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'
                }`}
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${rtl ? 'scale-x-[-1]' : ''}`} />
        </div>
      </Link>
    </motion.div>
  )
}
