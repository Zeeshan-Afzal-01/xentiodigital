'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function TeamContent() {
  const t = useTranslations('team')
  const locale = useLocale()

  const teamMembers = [
    {
      name: t('members.john.name'),
      role: t('members.john.role'),
      bio: t('members.john.bio'),
    },
    {
      name: t('members.sarah.name'),
      role: t('members.sarah.role'),
      bio: t('members.sarah.bio'),
    },
    {
      name: t('members.michael.name'),
      role: t('members.michael.role'),
      bio: t('members.michael.bio'),
    },
    {
      name: t('members.emily.name'),
      role: t('members.emily.role'),
      bio: t('members.emily.bio'),
    },
    {
      name: t('members.david.name'),
      role: t('members.david.role'),
      bio: t('members.david.bio'),
    },
    {
      name: t('members.jessica.name'),
      role: t('members.jessica.role'),
      bio: t('members.jessica.bio'),
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
            {teamMembers.map((member, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden text-center flex flex-col h-full">
                <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-600">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col min-w-0">
                  <h3 className="text-xl font-semibold text-high-contrast mb-1 line-clamp-1">{member.name}</h3>
                  <p className="text-primary-400 font-medium mb-3 flex-shrink-0">{member.role}</p>
                  <p className="text-muted-enhanced flex-1 line-clamp-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-high-contrast mb-4">
            {t('joinTitle')}
          </h2>
          <p className="text-xl text-muted-enhanced mb-8 max-w-2xl mx-auto">
            {t('joinSubtitle')}
          </p>
          <Link href={`/${locale}/careers`} className="btn-primary">
            {t('viewPositions')}
          </Link>
        </div>
      </section>
    </>
  )
}
