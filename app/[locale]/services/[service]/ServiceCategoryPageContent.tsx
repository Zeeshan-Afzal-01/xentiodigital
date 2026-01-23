'use client'

import { ServiceCategory } from '@/lib/services-data'
import PremiumServiceCategoryPage from '@/components/PremiumServiceCategoryPage'

interface ServiceCategoryPageContentProps {
  category: ServiceCategory
}

export default function ServiceCategoryPageContent({ category }: ServiceCategoryPageContentProps) {
  return <PremiumServiceCategoryPage category={category} />
}
