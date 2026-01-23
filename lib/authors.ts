/**
 * Author profiles for blog posts
 * Enhances EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)
 */

import type { BlogAuthor } from './blog-types'

export const authors: Record<string, BlogAuthor> = {
  'xentio-digital-team': {
    name: 'Xentio Digital Team',
    avatar: '/images/authors/xentio-team.jpg',
    bio: 'Our expert team of digital strategists, developers, and marketers brings decades of combined experience helping businesses achieve their digital goals. We specialize in SEO, web development, e-commerce, and digital transformation.',
    role: 'Digital Services Experts',
    expertise: ['SEO', 'Web Development', 'E-commerce', 'Digital Marketing', 'Business Growth'],
    credentials: ['Google Certified', 'HubSpot Certified', 'Shopify Partners'],
    yearsExperience: 10,
    social: {
      linkedin: 'https://www.linkedin.com/company/xentio-digital',
      twitter: 'https://www.twitter.com/xentiodigital',
    },
  },
  'sarah-williams': {
    name: 'Sarah Williams',
    avatar: '/images/authors/sarah-williams.jpg',
    bio: 'Sarah is our Head of Development with over 12 years of experience in modern web technologies. She leads our development team in creating cutting-edge solutions using React, Next.js, and cloud platforms.',
    role: 'Head of Development',
    expertise: ['Web Development', 'React', 'Next.js', 'Cloud Architecture', 'Performance Optimization'],
    credentials: ['AWS Certified', 'React Certified', 'Next.js Expert'],
    yearsExperience: 12,
    social: {
      linkedin: 'https://www.linkedin.com/in/sarah-williams',
      twitter: 'https://www.twitter.com/sarahwilliams',
    },
  },
  'emily-davis': {
    name: 'Emily Davis',
    avatar: '/images/authors/emily-davis.jpg',
    bio: 'Emily is our Marketing Director specializing in SEO and digital marketing strategies. With 10+ years of experience, she has helped hundreds of businesses increase their online visibility and drive measurable results.',
    role: 'Marketing Director',
    expertise: ['SEO', 'Digital Marketing', 'Content Strategy', 'Analytics', 'Conversion Optimization'],
    credentials: ['Google Analytics Certified', 'HubSpot Inbound Certified', 'SEMrush Certified'],
    yearsExperience: 10,
    social: {
      linkedin: 'https://www.linkedin.com/in/emily-davis',
      twitter: 'https://www.twitter.com/emilydavis',
    },
  },
}

export function getAuthorById(id: string): BlogAuthor | undefined {
  return authors[id]
}
