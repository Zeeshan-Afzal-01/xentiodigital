'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogAuthor } from '@/lib/blog-types'
import { Icon } from '@/components/icons'

interface AuthorBioProps {
  author: BlogAuthor
  locale?: string
}

export default function AuthorBio({ author, locale = 'en' }: AuthorBioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-premium rounded-2xl p-6 md:p-8 border"
      style={{
        borderColor: 'var(--border-default)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        {author.avatar && (
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2"
              style={{
                borderColor: 'var(--brand-primary)',
              }}
            >
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-high-contrast mb-1">
              {author.name}
            </h3>
            <p className="text-sm text-muted-enhanced mb-2">
              {author.role}
              {author.yearsExperience && (
                <span className="ml-2">• {author.yearsExperience}+ years experience</span>
              )}
            </p>
          </div>

          {/* Bio */}
          <p className="text-muted-enhanced mb-4 leading-relaxed">
            {author.bio}
          </p>

          {/* Expertise Tags */}
          {author.expertise && author.expertise.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-enhanced mb-2 uppercase tracking-wider">
                Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-500 border"
                    style={{
                      borderColor: 'var(--brand-primary)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Credentials */}
          {author.credentials && author.credentials.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-enhanced mb-2 uppercase tracking-wider">
                Credentials
              </p>
              <div className="flex flex-wrap gap-2">
                {author.credentials.map((credential) => (
                  <span
                    key={credential}
                    className="px-3 py-1 rounded-full text-xs font-medium glass-premium border text-muted-enhanced"
                    style={{
                      borderColor: 'var(--border-default)',
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon name="Check" className="w-3.5 h-3.5" strokeWidth={2} />
                      <span>{credential}</span>
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {author.social && (
            <div className="flex gap-4">
              {author.social.linkedin && (
                <Link
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-enhanced hover:text-primary-500 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.02H3.555V9h3.564v11.453zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              )}
              {author.social.twitter && (
                <Link
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-enhanced hover:text-primary-500 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
              )}
              {author.social.website && (
                <Link
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-enhanced hover:text-primary-500 transition-colors"
                  aria-label="Website"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
