import type { Metadata } from 'next'
import TestimonialsContent from './TestimonialsContent'

export const metadata: Metadata = {
  title: 'Client Testimonials - What Our Clients Say',
  description: 'Read testimonials from our satisfied clients who have experienced success with our digital services and solutions.',
}

export default function TestimonialsPage() {
  return <TestimonialsContent />
}
