'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: string
  suffix?: string
  prefix?: string
  duration?: number
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseInt(value.replace(/\D/g, ''))
    if (isNaN(numericValue)) {
      setCount(0)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (numericValue - startValue) * easeOut)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericValue)
      }
    }

    animate()
  }, [isInView, value, duration])

  const displayValue = value.includes('+') 
    ? `${count}${suffix}+`
    : value.includes('%')
    ? `${count}${suffix}%`
    : `${prefix}${count}${suffix}`

  return (
    <motion.span 
      ref={ref} 
      className="inline-block"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {displayValue}
    </motion.span>
  )
}
