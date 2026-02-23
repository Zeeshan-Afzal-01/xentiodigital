#!/usr/bin/env node
/**
 * Optional: Generate translated message files from messages/en.json using
 * Google Cloud Translation API. The site loads content only from JSON files
 * (no API at runtime). en.json and de.json are maintained by hand. For other
 * locales you can translate manually (like fr/es) or run this script once
 * with an API key to fill fr, es, it, pt, ja, ko, zh, ar, ru, hi.
 *
 * Prerequisites: TRANSLATION_API_KEY in .env.local (Google Cloud Translation)
 * Run: npm run translate  OR  node scripts/translate-messages.mjs
 * Output: overwrites messages/fr.json, es.json, it.json, pt.json, ja.json, ko.json, zh.json, ar.json, ru.json, hi.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, '..')

// Load .env.local if present
function loadEnvLocal() {
  const path = join(ROOT_DIR, '.env.local')
  if (!existsSync(path)) return
  const content = readFileSync(path, 'utf8')
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
}
loadEnvLocal()
const MESSAGES_DIR = join(ROOT_DIR, 'messages')

const TARGET_LOCALES = ['fr', 'es', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'ru', 'hi']
const BATCH_SIZE = 50
const DELAY_MS = 200

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function collectStrings(obj, out = []) {
  if (typeof obj === 'string') {
    out.push(obj)
    return
  }
  if (Array.isArray(obj)) {
    obj.forEach((item) => collectStrings(item, out))
    return
  }
  if (obj && typeof obj === 'object') {
    Object.values(obj).forEach((v) => collectStrings(v, out))
  }
}

function replaceStrings(obj, translated, index = { i: 0 }) {
  if (typeof obj === 'string') {
    return translated[index.i++] ?? obj
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceStrings(item, translated, index))
  }
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      out[k] = replaceStrings(v, translated, index)
    }
    return out
  }
  return obj
}

async function translateBatch(texts, targetLang, apiKey) {
  if (texts.length === 0) return []
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`
  const body = {
    q: texts,
    source: 'en',
    target: targetLang === 'zh' ? 'zh-CN' : targetLang === 'pt' ? 'pt-BR' : targetLang,
    format: 'text',
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Google Translate API error: ${res.status} ${err}`)
  }
  const data = await res.json()
  return (data.data?.translations || []).map((t) => t.translatedText || '')
}

async function translateAllStrings(strings, targetLang, apiKey) {
  const results = []
  for (let i = 0; i < strings.length; i += BATCH_SIZE) {
    const batch = strings.slice(i, i + BATCH_SIZE)
    const translated = await translateBatch(batch, targetLang, apiKey)
    results.push(...translated)
    if (i + BATCH_SIZE < strings.length) {
      await new Promise((r) => setTimeout(r, DELAY_MS))
    }
  }
  return results
}

async function main() {
  const apiKey = process.env.TRANSLATION_API_KEY
  if (!apiKey || apiKey === 'your_google_cloud_translation_api_key_here') {
    console.error('Missing TRANSLATION_API_KEY. Set it in .env.local and run again.')
    console.error('Get a key: https://console.cloud.google.com/apis/credentials')
    process.exit(1)
  }

  const enPath = join(MESSAGES_DIR, 'en.json')
  const source = loadJson(enPath)
  const strings = []
  collectStrings(source, strings)
  console.log(`Loaded en.json: ${strings.length} strings to translate.`)

  for (const locale of TARGET_LOCALES) {
    console.log(`Translating to ${locale}...`)
    try {
      const translated = await translateAllStrings(strings, locale, apiKey)
      const copy = JSON.parse(JSON.stringify(source))
      const out = replaceStrings(copy, translated)
      const outPath = join(MESSAGES_DIR, `${locale}.json`)
      writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8')
      console.log(`  Wrote ${outPath}`)
    } catch (e) {
      console.error(`  Failed for ${locale}:`, e.message)
    }
  }
  console.log('Done.')
}

main()
