'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function PortfolioContent() {
  const t = useTranslations('portfolio')
  const locale = useLocale()

  const projects = [
    {
      title: t('projects.retailpro.title'),
      description: t('projects.retailpro.description'),
      results: t('projects.retailpro.results'),
      category: t('projects.retailpro.category'),
    },
    {
      title: t('projects.fitness.title'),
      description: t('projects.fitness.description'),
      results: t('projects.fitness.results'),
      category: t('projects.fitness.category'),
    },
    {
      title: t('projects.corporate.title'),
      description: t('projects.corporate.description'),
      results: t('projects.corporate.results'),
      category: t('projects.corporate.category'),
    },
    {
      title: t('projects.crm.title'),
      description: t('projects.crm.description'),
      results: t('projects.crm.results'),
      category: t('projects.crm.category'),
    },
    {
      title: t('projects.restaurant.title'),
      description: t('projects.restaurant.description'),
      results: t('projects.restaurant.results'),
      category: t('projects.restaurant.category'),
    },
    {
      title: t('projects.healthcare.title'),
      description: t('projects.healthcare.description'),
      results: t('projects.healthcare.results'),
      category: t('projects.healthcare.category'),
    },
  ]

  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {projects.map((project, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-4xl font-bold">{project.title.charAt(0)}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col min-w-0">
                  <span className="text-sm text-primary-400 font-semibold flex-shrink-0">{project.category}</span>
                  <h3 className="text-xl font-semibold text-high-contrast mt-2 mb-3 line-clamp-2 text-start">{project.title}</h3>
                  <p className="text-muted-enhanced mb-4 flex-1 line-clamp-3 text-start">{project.description}</p>
                  <div className="border-t border-white/10 dark:border-white/10 pt-4 flex-shrink-0">
                    <p className="text-sm font-semibold text-high-contrast mb-1 text-start">{t('results')}</p>
                    <p className="text-sm text-muted-enhanced line-clamp-2 text-start">{project.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-high-contrast mb-4">
            {t('readyTitle')}
          </h2>
          <p className="text-xl text-muted-enhanced mb-8 max-w-2xl mx-auto">
            {t('readySubtitle')}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary">
            {t('getStarted')}
          </Link>
        </div>
      </section>
    </>
  )
}
