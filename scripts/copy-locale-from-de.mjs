#!/usr/bin/env node
/**
 * Copy messages/de.json to other locale files (fr, es, it, pt, ja, ko, zh, ar, ru, hi).
 * Use this when you have added new keys to en.json/de.json and want the same structure
 * in all locale files. Content in each file should then be translated (manually or otherwise).
 *
 * Run: node scripts/copy-locale-from-de.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MESSAGES_DIR = join(__dirname, '..', 'messages')
const LOCALES = ['fr', 'es', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'ru', 'hi']

const dePath = join(MESSAGES_DIR, 'de.json')
if (!existsSync(dePath)) {
  console.error('messages/de.json not found')
  process.exit(1)
}

const de = readFileSync(dePath, 'utf8')
for (const locale of LOCALES) {
  const outPath = join(MESSAGES_DIR, `${locale}.json`)
  writeFileSync(outPath, de, 'utf8')
  console.log('Written:', outPath)
}
console.log('Done. Translate content in each file as needed.')
