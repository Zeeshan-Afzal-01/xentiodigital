'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { isRTL } from '@/lib/translation'

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  content: string
  rating?: number
  avatar?: string
  index?: number
}

export default function TestimonialCard({
  name,
  role,
  company,
  content,
  rating = 5,
  avatar,
  index = 0,
}: TestimonialCardProps) {
  const locale = useLocale()
  const rtl = isRTL(locale)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.03, rotateY: rtl ? -2 : 2 }}
      className="glass-premium rounded-3xl p-10 h-full relative overflow-hidden border transition-all duration-500 group flex flex-col"
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
      {/* Enhanced Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent-500/10 transition-all duration-500 rounded-3xl" />
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />

      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        {/* Rating Stars */}
        <div className={`flex items-center mb-6 flex-shrink-0 ${rtl ? 'flex-row-reverse' : ''}`}>
          {[...Array(rating)].map((_, i) => (
            <motion.svg
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + i * 0.05, type: 'spring' }}
              className="w-5 h-5 text-yellow-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Content - Flexible */}
        <p className="text-muted-enhanced mb-8 italic text-responsive-lg leading-relaxed font-light flex-1 line-clamp-4 text-start">&ldquo;{content}&rdquo;</p>

        {/* Author - RTL Safe */}
        <div className={`flex items-center mt-auto flex-shrink-0 ${rtl ? 'flex-row-reverse' : ''}`}>
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className={`w-14 h-14 rounded-full border-2 border-primary-500/50 flex-shrink-0 ${rtl ? 'ml-4' : 'mr-4'}`}
            />
          ) : (
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center border-2 border-primary-500/50 flex-shrink-0 ${rtl ? 'ml-4' : 'mr-4'}`}>
              <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-high-contrast text-lg truncate">{name}</p>
            <p className="text-sm text-muted-enhanced font-medium truncate">
              {role} at {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
