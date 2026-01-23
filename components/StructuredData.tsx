'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: object
  id: string
}

export default function StructuredData({ data, id }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing script if it exists
    const existingScript = document.getElementById(id)
    if (existingScript) {
      existingScript.remove()
    }

    // Create and append new script
    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(id)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data, id])

  return null
}
