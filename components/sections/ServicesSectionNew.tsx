import { getTranslations } from 'next-intl/server'
import ServiceCategoryCardStatic from '@/components/ServiceCategoryCardStatic'
import { servicesData } from '@/lib/services-data'
import Link from 'next/link'

export default async function ServicesSectionNew({ locale }: { locale: string }) {
  const t = await getTranslations('services')

  return (
    <section className="section-padding relative overflow-hidden py-24 md:py-32">
      {/* PERF: CSS-only animated background (no JS / Framer loops) */}
      <div className="absolute inset-0 services-section-animated-bg" aria-hidden="true" />
      <div className="absolute inset-0 services-section-radial" aria-hidden="true" />

      {/* Floating shapes are always in DOM; CSS animates them (non-blocking) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="floating-shape absolute"
            style={{ 
              backgroundColor: i % 2 === 0 
                ? 'rgba(109, 40, 217, 0.12)' 
                : 'rgba(8, 145, 178, 0.12)',
              left: `${10 + i * 25}%`,
              top: `${20 + i * 15}%`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              animationDuration: `${18 + i * 5}s`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay - Dark Mode Only */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] hidden dark:block">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* CRITICAL: Cards are ALWAYS rendered (no IntersectionObserver gating). */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 auto-rows-fr mb-16">
          {servicesData.map((category) => (
            <ServiceCategoryCardStatic
              key={category.id}
              category={category}
              locale={locale}
            />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <Link 
            href={`/${locale}/services`} 
            className="btn-secondary text-lg px-12 py-6 relative overflow-hidden group inline-block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10">{t('viewServices')}</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
