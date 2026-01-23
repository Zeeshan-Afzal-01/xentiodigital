'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) observer.unobserve(element)
      })
    }
  }, [headings])

  if (headings.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 glass-premium rounded-2xl p-6 border max-h-[calc(100vh-8rem)] overflow-y-auto"
      style={{
        borderColor: 'var(--border-default)',
      }}
    >
      <h3 className="text-lg font-bold text-high-contrast mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById(heading.id)
              if (element) {
                const offset = 100 // Account for navbar
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - offset
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                })
              }
            }}
            className={`block text-sm transition-colors ${
              activeId === heading.id
                ? 'text-primary-500 font-semibold'
                : 'text-muted-enhanced hover:text-high-contrast'
            }`}
            style={{
              paddingLeft: `${(heading.level - 1) * 1}rem`,
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </motion.div>
  )
}
