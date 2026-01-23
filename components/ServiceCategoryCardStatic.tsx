import Link from 'next/link'
import type { ServiceCategory } from '@/lib/services-data'
import { isRTL } from '@/lib/translation'
import { Icon } from '@/components/icons'

/**
 * PERF: Server-rendered Services card (no Framer, no observers, no state).
 * - Always renders in the DOM immediately
 * - Visible by default (no opacity: 0 on SSR)
 * - Hover/micro-interactions are CSS-only (non-blocking)
 */
export default function ServiceCategoryCardStatic({
  category,
  locale,
}: {
  category: ServiceCategory
  locale: string
}) {
  const rtl = isRTL(locale)

  return (
    <div className="group h-full">
      <Link href={`/${locale}/services/${category.slug}`} className="block h-full">
        <div
          className="glass-premium rounded-3xl p-8 md:p-10 h-full relative overflow-hidden border transition-transform duration-300 will-change-transform flex flex-col hover:-translate-y-2 hover:scale-[1.01]"
          style={{ borderColor: 'var(--border-default)' }}
        >
          {/* Soft gradient wash (CSS-only) */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${category.gradient}`}
            aria-hidden="true"
          />

          {/* Outer glow (subtle, CSS-only) */}
          <div
            className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-3xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(124, 58, 237, 0.16), rgba(6, 182, 212, 0.14), rgba(34, 197, 94, 0.12))',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex-1 flex flex-col min-w-0">
            {/* Icon */}
            <div className="w-20 h-20 mb-8 flex-shrink-0 relative">
              <div
                className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center text-4xl border shadow-lg transition-transform duration-300 group-hover:scale-105"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <Icon name={category.icon} className="w-9 h-9 text-high-contrast" strokeWidth={2} />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/15 to-secondary-500/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-5 text-start line-clamp-2">
              <span className="gradient-text block">{category.name}</span>
            </h3>

            {/* Description */}
            <p className="text-muted-enhanced mb-6 leading-relaxed text-lg text-start flex-1 line-clamp-3">
              {category.description}
            </p>

            {/* Desktop: reveal sub-services on hover (DOM is always present) */}
            <div className="hidden lg:block">
              <div
                className="pt-4 border-t overflow-hidden max-h-0 opacity-0 translate-y-2 group-hover:max-h-64 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <p className="text-sm font-semibold text-high-contrast mb-3 text-start">
                  Services Included
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {category.subServices.slice(0, 6).map((subService) => (
                    <span
                      key={subService.id}
                      className="flex items-center gap-2 text-sm text-muted-enhanced"
                    >
                      <Icon name={subService.icon} className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                      <span className="line-clamp-1 text-start font-medium">{subService.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: expandable list without JS */}
            <details className="lg:hidden mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-high-contrast">
                Services Included
              </summary>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {category.subServices.slice(0, 6).map((subService) => (
                  <span key={subService.id} className="flex items-center gap-2 text-sm text-muted-enhanced">
                    <Icon name={subService.icon} className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span className="line-clamp-1 text-start font-medium">{subService.name}</span>
                  </span>
                ))}
              </div>
            </details>

            {/* CTA row */}
            <div
              className={`flex items-center mt-6 text-sm font-semibold ${
                rtl ? 'flex-row-reverse' : ''
              }`}
              style={{ color: 'var(--brand-primary)' }}
            >
              <span>{rtl ? 'المزيد' : 'Learn more'}</span>
              <Icon
                name="ArrowRight"
                rtlFlip
                rtl={rtl}
                className={`${rtl ? 'mr-2' : 'ml-2'} w-4 h-4 transition-transform duration-300 group-hover:translate-x-1`}
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

