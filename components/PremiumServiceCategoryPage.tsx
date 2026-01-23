'use client'

import { useLocale } from 'next-intl'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceCategory } from '@/lib/services-data'
import { isRTL } from '@/lib/translation'
import AnimatedCounter from './AnimatedCounter'
import { Icon, IconName } from '@/components/icons'

interface PremiumServiceCategoryPageProps {
  category: ServiceCategory
}

export default function PremiumServiceCategoryPage({ category }: PremiumServiceCategoryPageProps) {
  const locale = useLocale()
  const rtl = isRTL(locale)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Industry data (can be customized per category)
  const industries = [
    { name: 'E-Commerce', icon: 'Ecommerce' as IconName, description: 'Online retail and marketplace solutions' },
    { name: 'Healthcare', icon: 'Healthcare' as IconName, description: 'Medical and health service platforms' },
    { name: 'Finance', icon: 'Finance' as IconName, description: 'Banking and financial services' },
    { name: 'Education', icon: 'Education' as IconName, description: 'Learning management systems' },
    { name: 'Real Estate', icon: 'Home' as IconName, description: 'Property management platforms' },
    { name: 'Manufacturing', icon: 'Manufacturing' as IconName, description: 'Industrial digital solutions' },
  ]

  // Technology logos/icons (can be customized)
  const technologies = [
    { name: 'React', icon: 'Code' as IconName },
    { name: 'Next.js', icon: 'Code' as IconName },
    { name: 'Node.js', icon: 'Server' as IconName },
    { name: 'TypeScript', icon: 'Braces' as IconName },
    { name: 'AWS', icon: 'Cloud' as IconName },
    { name: 'Docker', icon: 'Container' as IconName },
  ]

  // Results/metrics (customizable per category)
  const results = [
    { value: '300%', label: 'Average ROI Increase', icon: 'Growth' as IconName },
    { value: '50%', label: 'Cost Reduction', icon: 'Money' as IconName },
    { value: '90%', label: 'Client Satisfaction', icon: 'Star' as IconName },
    { value: '24/7', label: 'Support Availability', icon: 'Clock' as IconName },
  ]

  return (
    <>
      {/* Immersive Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Mesh Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${category.gradient})`,
            opacity: 0.3,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: 300 + Math.random() * 200,
                height: 300 + Math.random() * 200,
                background: `linear-gradient(135deg, ${category.gradient})`,
                opacity: 0.1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, 100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Hero Content with Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-custom relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">{category.name}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-enhanced mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {category.intro || category.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic"
              >
                <Link href={`/${locale}/contact`} className="btn-primary text-lg px-10 py-5">
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic"
              >
                <Link href={`/${locale}/portfolio`} className="btn-secondary text-lg px-10 py-5">
                  View Case Studies
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 rounded-full border-primary-500 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem → Solution Story */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problem Side */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                <span className="text-red-400 font-semibold text-sm">The Challenge</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-high-contrast mb-6">
                Are You Struggling With...
              </h2>
              <ul className="space-y-4">
                {[
                  'Outdated systems holding back growth',
                  'Inefficient processes wasting time and money',
                  'Lack of data insights for decision-making',
                  'Competitors gaining digital advantage',
                ].map((problem, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 text-lg text-muted-enhanced"
                  >
                    <Icon name="Close" className="w-6 h-6 text-red-400 flex-shrink-0" strokeWidth={2} />
                    <span>{problem}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Solution Side */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-premium rounded-3xl p-8 border"
                style={{
                  borderColor: 'var(--border-default)',
                }}
              >
                <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <span className="text-green-400 font-semibold text-sm">Our Solution</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-high-contrast mb-6">
                  Transform Your Business
                </h3>
                <p className="text-lg text-muted-enhanced leading-relaxed mb-6">
                  We deliver cutting-edge {category.name.toLowerCase()} solutions that address your specific challenges, 
                  streamline operations, and drive measurable results.
                </p>
                <div className="space-y-3">
                  {[
                    'Modern, scalable technology stack',
                    'Streamlined workflows and automation',
                    'Real-time analytics and insights',
                    'Competitive digital advantage',
                  ].map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <Icon name="Check" className="w-6 h-6 text-green-400 flex-shrink-0" strokeWidth={2} />
                      <span className="text-high-contrast">{solution}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do - Interactive Cards */}
      <section className="section-padding bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">What We Do</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto">
              Comprehensive {category.name.toLowerCase()} services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subServices.map((subService, index) => (
              <motion.div
                key={subService.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
                onMouseEnter={() => setExpandedCard(subService.id)}
                onMouseLeave={() => setExpandedCard(null)}
              >
                <Link href={`/${locale}/services/${subService.slug}`}>
                  <motion.div
                    animate={{
                      scale: expandedCard === subService.id ? 1.02 : 1,
                      y: expandedCard === subService.id ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="glass-premium rounded-2xl p-8 border h-full flex flex-col cursor-pointer transition-all duration-300"
                    style={{
                      borderColor: expandedCard === subService.id ? 'var(--brand-primary)' : 'var(--border-default)',
                    }}
                  >
                    {/* Icon with Animation */}
                    <motion.div
                      animate={{
                        scale: expandedCard === subService.id ? 1.3 : 1,
                        rotate: expandedCard === subService.id ? 360 : 0,
                      }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl mb-6 flex-shrink-0"
                    >
                      {subService.icon}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-high-contrast mb-3 line-clamp-2">
                      {subService.name}
                    </h3>
                    <p className="text-muted-enhanced leading-relaxed mb-4 line-clamp-3 flex-1">
                      {subService.description}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {expandedCard === subService.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t"
                            style={{
                              borderColor: 'var(--border-default)',
                            }}
                          >
                            <span className="text-primary-500 font-semibold text-sm">
                              Learn More →
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Framework Timeline */}
      {category.process && category.process.length > 0 && (
        <section className="section-padding relative">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Our Process</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto">
                A proven framework for delivering exceptional results
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 ${rtl ? 'right-8' : 'left-8'} hidden md:block`} />

                <div className="space-y-12">
                  {category.process.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: rtl ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className={`flex gap-8 items-start ${rtl ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Step Number */}
                      <div className={`flex-shrink-0 relative z-10 ${rtl ? 'ml-8' : 'mr-8'}`}>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                        >
                          {step.step}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <motion.div
                        className="flex-1 glass-premium rounded-2xl p-8 border"
                        style={{
                          borderColor: 'var(--border-default)',
                        }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-high-contrast mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-enhanced leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results & Impact */}
      <section className="section-padding bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-900/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Proven Results</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto">
              Real outcomes from real partnerships
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-premium rounded-2xl p-8 text-center border"
                style={{
                  borderColor: 'var(--border-default)',
                }}
              >
                <div className="flex justify-center mb-4 text-white/90">
                  <Icon name={result.icon} className="w-10 h-10" strokeWidth={2} />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter value={result.value} />
                </div>
                <div className="text-sm font-semibold text-muted-enhanced uppercase tracking-wider">
                  {result.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Industries We Serve</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto">
              Tailored solutions across diverse sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.1 }}
                className="glass-premium rounded-2xl p-6 text-center border group cursor-pointer"
                style={{
                  borderColor: 'var(--border-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-primary)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl mb-4"
                >
                  <Icon name={industry.icon} className="w-8 h-8" strokeWidth={2} />
                </motion.div>
                <h3 className="font-bold text-high-contrast mb-2 text-sm">
                  {industry.name}
                </h3>
                <p className="text-xs text-muted-enhanced line-clamp-2">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {category.benefits && category.benefits.length > 0 && (
        <section className="section-padding bg-surface relative overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Why Choose Us</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto">
                What sets us apart in {category.name.toLowerCase()}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  className="glass-premium rounded-3xl p-8 border text-center h-full flex flex-col"
                  style={{
                    borderColor: 'var(--border-default)',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl mb-6"
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-high-contrast mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-enhanced leading-relaxed flex-1">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technology / Tools */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
              Technologies We Use
            </h2>
            <p className="text-lg text-muted-enhanced max-w-2xl mx-auto">
              Cutting-edge tools and platforms for exceptional results
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.2, y: -10 }}
                className="glass-premium rounded-xl p-6 border text-center min-w-[100px] cursor-pointer group"
                style={{
                  borderColor: 'var(--border-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-primary)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex justify-center mb-2 text-primary-500">
                  <Icon name={tech.icon} className="w-9 h-9" strokeWidth={2} />
                </div>
                <div className="text-sm font-semibold text-high-contrast">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High Conversion CTA */}
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
                'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 via-secondary-600/30 to-accent-600/30" />
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent"
            >
              Ready to Transform Your Business?
            </motion.h2>
            <p className="text-xl md:text-2xl mb-12 text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
              Let&apos;s discuss how our {category.name} services can drive measurable results for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(124, 58, 237, 0.5)',
                    '0 0 40px rgba(124, 58, 237, 0.8)',
                    '0 0 20px rgba(124, 58, 237, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Link href={`/${locale}/contact`} className="btn-primary text-lg px-12 py-6 glow-purple">
                  Get Started Today
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/${locale}/portfolio`} className="btn-secondary text-lg px-12 py-6">
                  View Our Work
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
              Explore Our Services
            </h2>
            <p className="text-lg text-muted-enhanced max-w-2xl mx-auto">
              Discover all {category.name.toLowerCase()} solutions we offer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {category.subServices.map((subService, index) => (
              <motion.div
                key={subService.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link
                  href={`/${locale}/services/${subService.slug}`}
                  className="glass-premium rounded-xl p-6 border flex items-center gap-4 group block"
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
                  <span className="text-3xl flex-shrink-0">{subService.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-high-contrast mb-1 line-clamp-1">
                      {subService.name}
                    </h3>
                    <p className="text-sm text-muted-enhanced line-clamp-2">
                      {subService.description}
                    </p>
                  </div>
                  <motion.svg
                    className={`w-5 h-5 flex-shrink-0 text-primary-500 ${rtl ? 'scale-x-[-1]' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, rtl ? -5 : 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={`/${locale}/services`}
              className="text-primary-500 hover:text-primary-400 font-semibold transition-colors"
            >
              View All Services →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
