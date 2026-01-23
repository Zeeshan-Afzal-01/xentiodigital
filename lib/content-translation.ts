/**
 * Content Translation Utilities
 * For translating hardcoded content throughout the site
 */

import { translate } from './server-translation'

/**
 * Translate all content in a component
 * Use this in Server Components
 */
export async function translateContent<T extends Record<string, any>>(
  content: T,
  locale: string
): Promise<T> {
  if (locale === 'en') {
    return content
  }

  const translated: any = {}
  
  for (const [key, value] of Object.entries(content)) {
    if (typeof value === 'string') {
      translated[key] = await translate(value, locale)
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = await translateContent(value, locale)
    } else {
      translated[key] = value
    }
  }
  
  return translated as T
}

/**
 * Base content (English) - This is what gets translated
 */
export const baseContent = {
  cta: {
    title: 'Ready to Transform Your Business?',
    description: 'Let\'s discuss how we can help you achieve your digital goals. Get in touch today for a free consultation.',
    button: 'Schedule a Consultation',
  },
  stats: {
    title: 'By The Numbers',
    subtitle: 'Real results from real partnerships',
    projects: 'Projects Completed',
    satisfaction: 'Client Satisfaction',
    team: 'Expert Team Members',
    experience: 'Years Experience',
  },
  features: {
    title: 'Why Choose Xentio Digital?',
    subtitle: 'We combine technical expertise with creative innovation to deliver solutions that exceed expectations',
    expertTeam: {
      title: 'Expert Team',
      description: 'Our team of experienced developers, designers, and marketers bring years of industry expertise to every project.',
      stat: '50+',
      statLabel: 'Experts',
    },
    provenResults: {
      title: 'Proven Results',
      description: 'We\'ve helped hundreds of businesses achieve their digital goals with measurable results and ROI.',
      stat: '500+',
      statLabel: 'Projects',
    },
    modernTech: {
      title: 'Modern Technology',
      description: 'We use the latest technologies and best practices to ensure your digital solutions are future-proof and scalable.',
      stat: '100%',
      statLabel: 'Cutting-Edge',
    },
    dedicatedSupport: {
      title: 'Dedicated Support',
      description: 'From initial consultation to ongoing maintenance, we provide comprehensive support throughout your journey.',
      stat: '24/7',
      statLabel: 'Support',
    },
  },
  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Don\'t just take our word for it - hear from businesses we\'ve helped succeed',
  },
}
