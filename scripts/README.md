# Scripts

## Translation – no API at runtime

The site **only loads translations from JSON files** (`messages/en.json`, `messages/de.json`, `messages/fr.json`, etc.). No Google or other API is used when a user changes language; the app just loads the file for the selected locale.

- **en.json** – English (source).
- **de.json** – Deutsch (complete, maintained by hand).
- **fr.json** – Français (main sections translated from de/en; some service pages may still be in German – can be completed by hand or with one-time script).
- **es.json** – Español (nav, hero, footer, services, cta, common, testimonialsPage translated; rest from de – complete by hand or one-time script).
- **it, pt, ja, ko, zh, ar, ru, hi** – Same structure as de.json (copied from de). To have full Italian/Portuguese/Japanese/Korean/Chinese/Arabic/Russian/Hindi, either translate the content by hand in each file or run the optional translate script once (see below).

When the user selects a language in the navbar, the app uses `messages/{locale}.json` for that locale. So every page and section that uses these keys is translated from the file.

## copy-locale-from-de.mjs

Copies `messages/de.json` to all other locale files (fr, es, it, pt, ja, ko, zh, ar, ru, hi). Use when you have added new keys to en/de and want the same structure everywhere. You still need to translate the content in each file.

```bash
node scripts/copy-locale-from-de.mjs
```

## translate-messages.mjs (optional, one-time)

Uses the **Google Cloud Translation API** to generate translated JSON files from `en.json`. Use only if you want to fill or refresh fr, es, it, pt, ja, ko, zh, ar, ru, hi in one go (e.g. once per project or when you add many new keys).

1. Get a [Google Cloud Translation API](https://console.cloud.google.com/apis/library/translate.googleapis.com) key.
2. Add to `.env.local`: `TRANSLATION_API_KEY=your_key`
3. Run: `npm run translate`

This overwrites the existing locale JSON files with API-translated content. No API is used when users browse the site.
