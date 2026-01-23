import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Get in touch with Xentio Digital for a free consultation. Let\'s discuss how we can help transform your digital presence.',
}

export default function ContactPage() {
  return <ContactContent />
}
