'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  message?: string
  fullScreen?: boolean
}

export default function Loader({ message, fullScreen = true }: LoaderProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const content = (
    <div className="flex flex-col items-center justify-center gap-6 px-4">
      {/* Logo/Name with gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Xentio Digital
        </h1>
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Animated spinner */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16">
        <motion.div
          className="absolute inset-0 border-4 border-primary-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-transparent border-r-purple-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Loading message */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium text-center max-w-md"
        >
          {message}
          <span className="inline-block w-4 text-left">{dots}</span>
        </motion.p>
      )}
    </div>
  )

  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center py-12 min-h-[400px]">
        {content}
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  )
}
