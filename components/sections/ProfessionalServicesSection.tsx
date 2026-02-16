import { getTranslations } from 'next-intl/server'
import ProfessionalServicesSectionClient from './ProfessionalServicesSectionClient'

export default async function ProfessionalServicesSection() {
  const t = await getTranslations('professionalServices')

  const title = t('title')
  const titleHighlight = t('titleHighlight')
  const titleSuffix = t('titleSuffix')
  const imageAlt = t('imageAlt')

  const rawItems = t.raw('items') as Array<{ title: string; description: string }> | undefined
  const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : []

  return (
    <ProfessionalServicesSectionClient
      title={title}
      titleHighlight={titleHighlight}
      titleSuffix={titleSuffix}
      imageAlt={imageAlt}
      items={items}
    />
  )
}
