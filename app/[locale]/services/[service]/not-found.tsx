import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('common')
  const locale = await getLocale()
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-high-contrast mb-4">{t('serviceNotFound')}</h1>
        <p className="text-muted-enhanced mb-8">{t('serviceNotFoundDescription')}</p>
        <Link href={`/${locale}/services`} className="btn-primary">
          {t('backToServices')}
        </Link>
      </div>
    </div>
  )
}
