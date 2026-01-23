import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/request'

// Non-locale route: always redirect into locale space
export default function ContactPage() {
  redirect(`/${defaultLocale}/contact`)
}
