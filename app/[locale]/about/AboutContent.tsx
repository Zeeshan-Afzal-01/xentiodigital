'use client'

import { useTranslations, useLocale } from 'next-intl'
import Hero from '@/components/Hero'

export default function AboutContent() {
  const t = useTranslations('about')
  const locale = useLocale()

  const values = [
    {
      title: t('innovation.title'),
      description: t('innovation.description'),
    },
    {
      title: t('excellence.title'),
      description: t('excellence.description'),
    },
    {
      title: t('integrity.title'),
      description: t('integrity.description'),
    },
    {
      title: t('partnership.title'),
      description: t('partnership.description'),
    },
  ]

  return (
    <>
      <Hero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="min-w-0">
              <h2 className="text-3xl font-bold text-high-contrast mb-4 text-start">{t('missionTitle')}</h2>
              <p className="text-lg text-muted-enhanced mb-6 text-start">
                {t('mission1')}
              </p>
              <p className="text-lg text-muted-enhanced text-start">
                {t('mission2')}
              </p>
            </div>
            <div className="min-w-0">
              <h2 className="text-3xl font-bold text-high-contrast mb-4 text-start">{t('visionTitle')}</h2>
              <p className="text-lg text-muted-enhanced mb-6 text-start">
                {t('vision1')}
              </p>
              <p className="text-lg text-muted-enhanced text-start">
                {t('vision2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-high-contrast mb-6 text-center">{t('storyTitle')}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-enhanced mb-4 text-start">
                {t('story1')}
              </p>
              <p className="text-lg text-muted-enhanced mb-4 text-start">
                {t('story2')}
              </p>
              <p className="text-lg text-muted-enhanced text-start">
                {t('story3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
              {t('valuesTitle')}
            </h2>
            <p className="text-xl text-muted-enhanced max-w-2xl mx-auto">
              {t('valuesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 glass rounded-xl flex flex-col h-full">
                <h3 className="text-xl font-semibold text-high-contrast mb-3 line-clamp-1">{value.title}</h3>
                <p className="text-muted-enhanced flex-1 line-clamp-3">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('whyChooseTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl mb-2">{t('projectsCompleted')}</div>
              <p className="text-primary-100">{t('projectsCompletedDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-xl mb-2">{t('clientSatisfaction')}</div>
              <p className="text-primary-100">{t('clientSatisfactionDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl mb-2">{t('expertTeamMembers')}</div>
              <p className="text-primary-100">{t('expertTeamMembersDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
