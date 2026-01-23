'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function CareersContent() {
  const t = useTranslations('careers')
  const locale = useLocale()

  const openPositions = [
    {
      title: t('positions.developer.title'),
      department: t('positions.developer.department'),
      location: t('positions.developer.location'),
      type: t('positions.developer.type'),
      description: t('positions.developer.description'),
      requirements: [
        t('positions.developer.requirements.0'),
        t('positions.developer.requirements.1'),
        t('positions.developer.requirements.2'),
        t('positions.developer.requirements.3'),
        t('positions.developer.requirements.4'),
      ],
    },
    {
      title: t('positions.designer.title'),
      department: t('positions.designer.department'),
      location: t('positions.designer.location'),
      type: t('positions.designer.type'),
      description: t('positions.designer.description'),
      requirements: [
        t('positions.designer.requirements.0'),
        t('positions.designer.requirements.1'),
        t('positions.designer.requirements.2'),
        t('positions.designer.requirements.3'),
        t('positions.designer.requirements.4'),
      ],
    },
    {
      title: t('positions.marketing.title'),
      department: t('positions.marketing.department'),
      location: t('positions.marketing.location'),
      type: t('positions.marketing.type'),
      description: t('positions.marketing.description'),
      requirements: [
        t('positions.marketing.requirements.0'),
        t('positions.marketing.requirements.1'),
        t('positions.marketing.requirements.2'),
        t('positions.marketing.requirements.3'),
        t('positions.marketing.requirements.4'),
      ],
    },
    {
      title: t('positions.mobile.title'),
      department: t('positions.mobile.department'),
      location: t('positions.mobile.location'),
      type: t('positions.mobile.type'),
      description: t('positions.mobile.description'),
      requirements: [
        t('positions.mobile.requirements.0'),
        t('positions.mobile.requirements.1'),
        t('positions.mobile.requirements.2'),
        t('positions.mobile.requirements.3'),
        t('positions.mobile.requirements.4'),
      ],
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-high-contrast mb-4">{t('whyTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2">{t('growth.title')}</h3>
                  <p className="text-muted-enhanced">{t('growth.description')}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2">{t('flexible.title')}</h3>
                  <p className="text-muted-enhanced">{t('flexible.description')}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-high-contrast mb-2">{t('culture.title')}</h3>
                  <p className="text-muted-enhanced">{t('culture.description')}</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-high-contrast mb-8">{t('openPositions')}</h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="glass rounded-xl p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-high-contrast mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-enhanced">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-enhanced mb-4">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-high-contrast mb-2">{t('requirements')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-enhanced">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/${locale}/contact`}
                    className="btn-primary inline-block"
                  >
                    {t('applyNow')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-high-contrast mb-4">
            {t('noPositionTitle')}
          </h2>
          <p className="text-xl text-muted-enhanced mb-8 max-w-2xl mx-auto">
            {t('noPositionSubtitle')}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary">
            {t('sendResume')}
          </Link>
        </div>
      </section>
    </>
  )
}
