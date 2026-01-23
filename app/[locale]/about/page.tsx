import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us - Your Trusted Digital Partner',
  description: 'Learn about Xentio Digital - our mission, vision, and commitment to delivering exceptional digital solutions that drive business growth.',
}

export default function AboutPage() {
  return <AboutContent />
}
