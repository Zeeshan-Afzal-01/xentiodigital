'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ThemeSectionsWrapper({ children }: Props) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = mounted ? (resolvedTheme === 'dark' ? 'dark' : 'light') : 'light'

  return (
    <motion.div
      className="theme-sections-root"
      data-theme={theme}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
