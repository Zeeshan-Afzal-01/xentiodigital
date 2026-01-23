# XentioDigital — Project Documentation

## Overview

This repository is a **Next.js 14** (App Router) production website for **Xentio Digital** with:
- A modern public website (services, portfolio, testimonials, etc.)
- A blog system (list + detail pages, SEO metadata + JSON-LD)
- A secure, isolated admin panel (`/admin`) to manage content
- Internationalization (i18n), RTL support, and dark/light mode theming

---

## Tech Stack (High Level)

### Framework & Runtime
- **Next.js 14**: App Router, route handlers, static generation, SEO metadata
- **React 18**: UI components and client-side interactivity
- **TypeScript**: Type-safe components, utilities, and data models

### Styling & UI
- **Tailwind CSS**: Utility-first styling across the app
- **CSS Variables Theme System**: Design tokens for colors, borders, shadows, etc. (see `app/globals.css`)
- **Dark / Light Mode**: Via `next-themes`
- **RTL Support**: Direction-aware styles + RTL helpers

### Animation & UX
- **Framer Motion**: Motion/interaction animations
- **GSAP**: Advanced animations in certain sections
- **Lenis**: Smooth scrolling provider
- **react-hot-toast**: Toast notifications (admin + UX feedback)

### i18n (Internationalization)
- **next-intl**: Locale routing, message loading, and locale-aware rendering
- **Language detection**: Cookie + browser header + geolocation-based suggestion flow

### Blog / Content
- **MDX toolchain included**: `@next/mdx`, `@mdx-js/*`, remark/rehype plugins
- **Content storage**: Blog post metadata in TypeScript (`lib/blog-data.ts`), content in `content/blog/*.mdx`
- **Reading time**: `reading-time`
- **TOC**: DOM/MDX heading extraction + scroll spy

### Admin Panel
- **NextAuth v4**: Credentials authentication + JWT session
- **Admin-only middleware protection**: Uses `next-auth/jwt` token checks in `middleware.ts`
- **Editor**: `@uiw/react-md-editor` (MD/MDX authoring UI)

### Maps & 3D
- **mapbox-gl** + **react-map-gl**: Map experiences (Office/Location)
- **@react-three/fiber** + **@react-three/drei**: 3D / WebGL content support

---

## Dependency Summary (from `package.json`)

### Core
- **next**: App Router, routing, server rendering, metadata, route handlers
- **react / react-dom**: UI runtime
- **typescript**: Type safety

### Auth / Admin
- **next-auth (v4)**: Session-based admin auth (JWT strategy)
- **@auth/core**: Auth.js core library dependency (used indirectly)
- **bcryptjs**: Installed (currently not used after hardcoded credentials)
- **zod**: Installed for validation (available for forms/API validation)
- **react-hot-toast**: Toast UX in admin and actions
- **@uiw/react-md-editor**: Markdown/MDX editor UI (admin create/edit blog)

### i18n & Theming
- **next-intl**: Locale routing and translations
- **next-themes**: Dark/light theme toggling
- **js-cookie**: Client cookie helpers (used by translation/suggestion system)
- **tailwindcss-rtl**: RTL utility support

### Blog Rendering Helpers
- **reading-time**: Reading time calculation
- **remark-gfm**: GitHub-flavored markdown support (tables, task lists, etc.)
- **rehype-slug**: Add heading ids
- **rehype-autolink-headings**: Auto-link headings
- **rehype-highlight**: Syntax highlighting
- **@next/mdx / @mdx-js/* / @mdx-js/loader**: MDX pipeline support (present; full MDX rendering can be expanded)

### Animation & Motion
- **framer-motion**: Motion components and transitions
- **gsap**: Timeline animation library
- **lenis**: Smooth scrolling

### Maps & 3D
- **mapbox-gl**: Map rendering engine
- **react-map-gl**: React bindings for Mapbox
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helpers for Three.js scenes

---

## Project Structure (Important Folders)

### `app/` (Next.js App Router)
- **Public pages** live under `app/[locale]/...` for locale-prefixed routes
- **Admin panel** lives under `app/admin/...` and is *not* locale-prefixed
- **API routes** live under `app/api/...`
- **Global styles**: `app/globals.css`
- **Root layout**: `app/layout.tsx` (provides `<html>` + `<body>`)

### `components/`
Reusable UI building blocks:
- Navbar, Footer, CTA sections, cards, dropdowns
- Blog components: `TableOfContents`, `ReadingProgress`, `BlogCTA`, etc.
- Admin components: `components/admin/AdminSidebar.tsx`, `AdminHeader.tsx`

### `lib/`
Business logic + utilities:
- **Blog**: `blog-data.ts`, `blog-utils.ts`
- **SEO**: `seo.ts`
- **Services data**: `services-data.ts`
- **RTL/i18n helpers**: `translation.ts`, `rtl-utils.ts`, `animation-rtl.ts`
- **Auth config**: `auth.ts`

### `content/`
File-based content:
- `content/blog/*.mdx` (blog body content)

### `messages/`
Translation message JSON:
- `en.json`, `fr.json`, `de.json`

---

## Routing & Pages

### Public (Locale-Prefixed)
- Pattern: `/{locale}/...` (handled via `next-intl` + middleware)
- Examples (from `app/[locale]/`):
  - `/{locale}` (Home)
  - `/{locale}/about`
  - `/{locale}/services` and `/{locale}/services/[service]`
  - `/{locale}/portfolio`
  - `/{locale}/testimonials`
  - `/{locale}/team`
  - `/{locale}/careers`
  - `/{locale}/contact`
  - `/{locale}/blog`
  - `/{locale}/blog/[slug]`

### Admin (Non-Locale)
- `/admin` → redirects to `/admin/dashboard`
- `/admin/login`
- `/admin/dashboard`
- `/admin/blogs`
- `/admin/blogs/new`
- `/admin/blogs/edit/[slug]`
- `/admin/settings`

**Important:** Admin routes are intentionally *not* locale-prefixed to keep them isolated and avoid interfering with public i18n routing.

---

## Middleware Behavior (`middleware.ts`)

This project uses a single middleware to support both:
1. **Public i18n routing + language detection** (`next-intl`)
2. **Admin route protection** (NextAuth JWT token checks)

### Admin protection
- Any path starting with `/admin` is treated as **admin**.
- `/admin/login` is allowed without authentication.
- All other `/admin/*` routes require a valid NextAuth token with `role === 'admin'`.
- Unauthenticated users are redirected to `/admin/login?callbackUrl=...`.

### Public i18n / detection
For non-admin routes:
- Locale preference from cookie `xentio-locale` takes priority.
- Otherwise locale is suggested using:
  - `Accept-Language` header
  - IP-based country detection (`lib/geolocation.ts`)
- Suggestion metadata is written to cookies:
  - `x-suggested-language`
  - `x-detection-method`

---

## Theme System (Dark/Light + Tokens)

Defined in `app/globals.css` using CSS variables:
- Light tokens under `:root, .light`
- Dark tokens under `.dark`

### Key token groups
- **Backgrounds:** `--bg-primary`, `--bg-secondary`, `--bg-surface`, `--bg-elevated`
- **Text:** `--text-primary`, `--text-secondary`, `--text-muted`, `--text-subtle`
- **Brand:** `--brand-primary`, `--brand-secondary`, `--brand-accent`
- **Borders:** `--border-default`, `--border-subtle`, `--border-strong`
- **Shadows/Glows:** `--shadow-*`, `--glow-*`

### Core UI patterns/classes (examples)
Your codebase commonly uses shared classes such as:
- **`glass-premium`**: Glassmorphism-style surfaces (theme-aware)
- **`btn-primary` / `btn-secondary`**: Buttons consistent across themes
- **`container-custom`**: Layout container utility
- **`gradient-text`**: Brand gradient headings

---

## RTL + i18n Support

### RTL
The system supports RTL via:
- `[dir="rtl"]` CSS rules in `app/globals.css`
- Helper functions like `isRTL(locale)` in `lib/translation.ts`
- RTL-safe animations via `lib/animation-rtl.ts`

### i18n
Translations live in:
- `messages/en.json`
- `messages/fr.json`
- `messages/de.json`

Locale resolution is provided via:
- `i18n/request.ts`
- `next-intl` plugin config in `next.config.js`

---

## Blog System

### Data + Content
- **Metadata model:** `lib/blog-data.ts`
  - Defines `BlogPost` interface and `blogPosts` array
  - Includes SEO fields, tags, categories, images, author details
- **MDX content:** `content/blog/*.mdx`

### Blog list
- Route: `/{locale}/blog`
- Component: `app/[locale]/blog/BlogListContent.tsx`

### Blog detail
- Route: `/{locale}/blog/[slug]`
- Components:
  - `app/[locale]/blog/[slug]/page.tsx`: Metadata + JSON-LD structured data
  - `app/[locale]/blog/[slug]/BlogPostContent.tsx`: UI layout + TOC + share + CTA + EEAT blocks

### SEO for blog
- Uses `generateSEOMetadata()` and `generateStructuredData()` from `lib/seo.ts`
- Adds JSON-LD `<script type="application/ld+json">` for Article schema

### TOC (Table of Contents)
- Component: `components/TableOfContents.tsx`
- Heading extraction strategy:
  - Initial headings can be precomputed server-side and passed to the client
  - Client also attempts DOM-based extraction and uses scroll spy (IntersectionObserver)

---

## Admin Dashboard

### Authentication
- Provider: NextAuth Credentials (hardcoded credentials currently)
- Config: `lib/auth.ts`
- Session: JWT strategy, role stored on token + session

**Current hardcoded admin credentials**
- Email: `admin@xentiodigital.com`
- Password: `admin123`

### Admin UI Layout
- `app/admin/layout.tsx`: Admin shell with sidebar + header + toaster
- Sidebar: `components/admin/AdminSidebar.tsx`
- Header: `components/admin/AdminHeader.tsx`

### Admin Blog Management
- Blog list page: `app/admin/blogs/page.tsx`
  - Loads data from `/api/admin/blogs`
  - Actions: Edit/Delete
- Create blog page: `app/admin/blogs/new/page.tsx`
  - Uses `@uiw/react-md-editor`
  - Generates slug from title
  - Submits to `/api/admin/blogs`
- Edit blog page: `app/admin/blogs/edit/[slug]/page.tsx`
  - Loads post via `/api/admin/blogs/[slug]`
  - Updates via `PUT /api/admin/blogs/[slug]`
- Settings page: `app/admin/settings/page.tsx`
  - Placeholder settings UI (future expansion)

### Admin APIs
- `GET /api/admin/blogs`: list posts (reads from `lib/blog-data.ts`)
- `POST /api/admin/blogs`: creates MDX file under `content/blog/`
- `GET /api/admin/blogs/[slug]`: fetch metadata + reads MDX file content
- `PUT /api/admin/blogs/[slug]`: updates MDX file
- `DELETE /api/admin/blogs/[slug]`: deletes MDX file

---

## Performance Notes

### Optimizations present
- `next.config.js` uses:
  - `experimental.optimizePackageImports` for `framer-motion` and `gsap`
- Dynamic import for editor:
  - `@uiw/react-md-editor` is loaded via `next/dynamic({ ssr: false })`

### Important consideration
Because admin is under `/admin`, it is naturally isolated from locale routes; keep admin-only dependencies and components in `app/admin` and `components/admin` to reduce accidental usage on public pages.

---

## Environment Variables (Typical)

This codebase uses environment variables for:
- Translation providers (see `app/api/translate/route.ts` + translation libs)
- NextAuth secret (optional fallback exists in code but recommended to set)

**Recommended minimum in real production**
- `NEXTAUTH_SECRET`
- Translation API keys (if used)

---

## Known Gaps / Future Improvements

### Security hardening (recommended)
- Replace hardcoded admin credentials with environment variables or database-backed users
- Add rate limiting for `/api/auth/*` and `/admin/login`
- Add CSRF + stronger auditing/logging for admin actions
- Add multi-admin support + role-based permissions

### Blog management improvements
- Store blog metadata in a DB (Postgres + Prisma) or a CMS
- Add image upload + media library
- Add publish workflow (draft → publish) and ISR revalidation on publish
- Add slug collision prevention and validation with Zod

---

## How to Run

```bash
npm install
npm run dev
```

Admin:
- Visit `/admin/login`
- Use the hardcoded credentials listed above

