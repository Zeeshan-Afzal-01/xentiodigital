import type { Metadata } from 'next'
import TeamContent from './TeamContent'

export const metadata: Metadata = {
  title: 'Our Team - Meet the Experts',
  description: 'Meet the talented team of developers, designers, and digital experts behind Xentio Digital.',
}

export default function TeamPage() {
  return <TeamContent />
}
