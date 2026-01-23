'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ServiceCategory } from '@/lib/services-data'
import { isRTL } from '@/lib/translation'
import { Icon } from '@/components/icons'

interface ServiceCategoryCardProps {
  category: ServiceCategory
  index: number
}

export default function ServiceCategoryCard({ category, index }: ServiceCategoryCardProps) {
  const locale = useLocale()
  const rtl = isRTL(locale)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="group h-full perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -15,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="glass-premium rounded-3xl p-8 md:p-10 h-full relative overflow-hidden border transition-all duration-500 flex flex-col"
        style={{
          borderColor: 'var(--border-default)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? -2 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--brand-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)'
        }}
      >
        {/* Multi-layer Animated Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-3xl`}
          animate={{
            opacity: isHovered ? [0.15, 0.25, 0.15] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{ 
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Pulsing Glow Effect - Dark Mode */}
        <motion.div 
          className="absolute -inset-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl blur-3xl dark:block hidden"
          animate={{
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ 
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Glow Layer */}
        <motion.div 
          className="absolute -inset-4 bg-gradient-to-br from-primary-400/30 via-secondary-400/30 to-accent-400/30 rounded-3xl blur-[60px] dark:block hidden"
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
          }}
          transition={{ 
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary), var(--brand-accent))`,
            opacity: 0,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col min-w-0">
          {/* Icon with Enhanced Depth */}
          <motion.div
            whileHover={{ 
              scale: 1.3, 
              rotate: 360,
              y: -5,
            }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
            className="w-24 h-24 mb-8 flex-shrink-0 relative"
          >
            {/* Icon Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{
                background: `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))`,
              }}
              animate={{
                opacity: isHovered ? [0.4, 0.7, 0.4] : 0.2,
                scale: isHovered ? [1, 1.3, 1] : 1,
              }}
              transition={{ 
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            {/* Icon Container */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-500/40 to-secondary-500/40 flex items-center justify-center text-5xl border-2 shadow-2xl backdrop-blur-sm"
              style={{
                borderColor: 'var(--brand-primary)',
                boxShadow: '0 10px 40px rgba(124, 58, 237, 0.3), 0 0 20px rgba(6, 182, 212, 0.2)',
              }}
            >
              {/* PERF: no emoji + no infinite icon loop */}
              <Icon name={category.icon} className="w-10 h-10 text-high-contrast" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Title with Enhanced Hierarchy */}
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-start line-clamp-2"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="gradient-text block"
              animate={{
                backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
              }}
              transition={{
                duration: 3,
                repeat: isHovered ? Infinity : 0,
                ease: "linear"
              }}
            >
              {category.name}
            </motion.span>
          </motion.h3>

          {/* Description with Motion */}
          <motion.p 
            className="text-muted-enhanced mb-8 leading-relaxed text-lg text-start flex-1 line-clamp-3"
            animate={{
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            {category.description}
          </motion.p>

          {/* Sub-services - Desktop: Hover Reveal */}
          <div className="hidden lg:block">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t"
                    style={{
                      borderColor: 'var(--border-default)',
                    }}
                  >
                    <p className="text-sm font-semibold text-high-contrast mb-3 text-start">
                      Services Included
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {category.subServices.map((subService, subIndex) => (
                        <Link
                          key={subService.id}
                          href={`/${locale}/services/${subService.slug}`}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: rtl ? 30 : -30, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ 
                              delay: subIndex * 0.08,
                              type: "spring",
                              stiffness: 150
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              x: rtl ? -5 : 5,
                            }}
                            className="flex items-center gap-3 text-sm text-muted-enhanced hover:text-high-contrast transition-all rounded-lg p-2 hover:bg-surface cursor-pointer"
                            style={{
                              backgroundColor: isHovered ? 'transparent' : 'transparent',
                            }}
                          >
                            <motion.span 
                              className="text-xl flex-shrink-0"
                              whileHover={{ rotate: 10, scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon name={subService.icon} className="w-5 h-5" strokeWidth={2} />
                            </motion.span>
                            <span className="line-clamp-1 text-start font-medium">{subService.name}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sub-services - Mobile: Accordion */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between pt-4 border-t text-start"
              style={{
                borderColor: 'var(--border-default)',
              }}
              aria-expanded={isExpanded}
            >
              <span className="text-sm font-semibold text-high-contrast">
                {isExpanded ? 'Hide' : `View ${category.subServices.length} Services`}
              </span>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <Icon name="ChevronDown" className="w-5 h-5 text-high-contrast" strokeWidth={2} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-2">
                    {category.subServices.map((subService) => (
                      <Link
                        key={subService.id}
                        href={`/${locale}/services/${subService.slug}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: category.subServices.indexOf(subService) * 0.05 }}
                          className="flex items-center gap-3 text-sm text-muted-enhanced hover:text-high-contrast transition-all rounded-lg p-2 hover:bg-surface cursor-pointer"
                        >
                          <Icon name={subService.icon} className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                          <span className="text-start">{subService.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Link with Enhanced Motion */}
          <motion.div 
            className="mt-auto pt-6 border-t"
            style={{
              borderColor: 'var(--border-default)',
            }}
            animate={{
              borderColor: isHovered ? 'var(--brand-primary)' : 'var(--border-default)',
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={`/${locale}/services/${category.slug}`}
              className={`flex items-center font-bold text-lg transition-all group/link ${rtl ? 'flex-row-reverse' : ''}`}
              style={{
                color: 'var(--brand-primary)',
              }}
            >
              <motion.span
                animate={{
                  x: isHovered ? (rtl ? -5 : 5) : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                Learn More
              </motion.span>
              {/* PERF: no infinite bounce; only reacts to hover state */}
              <motion.div
                animate={{
                  x: isHovered ? (rtl ? -6 : 6) : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`${rtl ? 'mr-3' : 'ml-3'}`}
              >
                <Icon name="ArrowRight" rtlFlip rtl={rtl} className="w-6 h-6" strokeWidth={2} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
