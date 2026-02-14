'use client'

import { useEffect, useRef } from 'react'

interface StructuredDataProps {
  data: object
  id: string
}

export default function StructuredData({ data, id }: StructuredDataProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined' || !document.head) return

    const existingScript = document.getElementById(id)
    if (existingScript && existingScript.parentNode) {
      try {
        existingScript.parentNode.removeChild(existingScript)
      } catch {
        existingScript.remove()
      }
    }

    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    scriptRef.current = script
    document.head.appendChild(script)

    return () => {
      const toRemove = scriptRef.current || document.getElementById(id)
      if (toRemove && toRemove.parentNode) {
        try {
          toRemove.parentNode.removeChild(toRemove)
        } catch {
          try {
            toRemove.remove()
          } catch {
            // ignore
          }
        }
        scriptRef.current = null
      }
    }
  }, [data, id])

  return null
}
