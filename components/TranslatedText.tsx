'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useDynamicTranslation } from '@/hooks/useTranslation'

interface TranslatedTextProps {
  children: string
  fallback?: string
}

/**
 * Component for dynamically translating text
 * Uses translation API to translate content
 */
export default function TranslatedText({ children, fallback }: TranslatedTextProps) {
  const locale = useLocale()
  const { translate } = useDynamicTranslation()
  const [translated, setTranslated] = useState<string>(children)

  useEffect(() => {
    if (locale === 'en') {
      setTranslated(children)
      return
    }

    translate(children, locale)
      .then(setTranslated)
      .catch(() => setTranslated(fallback || children))
  }, [children, locale, translate, fallback])

  return <>{translated}</>
}
