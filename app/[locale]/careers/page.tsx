import type { Metadata } from 'next'
import CareersContent from './CareersContent'

export const metadata: Metadata = {
  title: 'Careers - Join Our Team',
  description: 'Explore career opportunities at Xentio Digital. Join our team of talented developers, designers, and digital experts.',
}

export default function CareersPage() {
  return <CareersContent />
}
