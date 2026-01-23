import { generateSEOMetadata } from '@/lib/seo'
import OfficeMapContent from './OfficeMapContent'

export const metadata = generateSEOMetadata({
  title: 'Office Location - Visit Us',
  description: 'Find our office location. We\'re located at 123 Digital Street, Tech City. Visit us or get directions.',
  path: '/office',
})

export default function OfficePage() {
  return <OfficeMapContent />
}
