import { NextRequest, NextResponse } from 'next/server'
import { translateText, TranslationConfig } from '@/lib/translation'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage, sourceLanguage = 'en' } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const config: TranslationConfig = {
      provider: (process.env.TRANSLATION_PROVIDER as any) || 'google',
      apiKey: process.env.TRANSLATION_API_KEY,
      projectId: process.env.GOOGLE_PROJECT_ID,
      cacheEnabled: true,
      cacheTTL: 86400,
    }

    const translated = await translateText(text, targetLanguage, sourceLanguage, config)

    return NextResponse.json({ translated })
  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}
