# Implementation Plan: Upgrade to Next.js Latest with App Router

This plan outlines the end-to-end upgrade of the portfolio project from **Next.js 12** to **`next@latest`** with the **App Router** (`app/` directory). It preserves all existing portfolio features, upgrades legacy components to current standards, updates the folder structure, and resolves API/routing changes.

---

## User Review Required

> [!IMPORTANT]
> **Dependency Resolution**:
> Upgrading to `next@latest` (Next 15/16) and React 19 requires matching peer dependencies for packages like `@vercel/analytics`, `framer-motion`, and `react-intersection-observer`.
> The recommended install command uses `--legacy-peer-deps` or updates companion packages to modern versions so everything installs cleanly without conflicts.

> [!NOTE]
> The migration can maintain `components/`, `styles/`, and `content/` while replacing `pages/` with the modern `app/` directory.

---

## Proposed Folder Structure Changes

Current structure:
```text
portfolio/
├── pages/
│   ├── _app.jsx
│   ├── _document.jsx
│   ├── index.jsx
│   ├── articles/
│   │   ├── index.jsx
│   │   └── [slug].jsx
│   ├── projects/
│   │   └── index.jsx
│   ├── case-studies/
│   │   └── index.jsx
│   └── api/
│       ├── evotunes-signature.js
│       └── icon-form.js
├── components/
├── content/
├── styles/
├── public/
└── next.config.js
```

Target modern Next.js App Router structure:
```text
portfolio/
├── app/
│   ├── layout.jsx            # Replaces _app.jsx and _document.jsx (Root HTML, fonts, CSS, Layout)
│   ├── page.jsx              # Home page (from pages/index.jsx)
│   ├── not-found.jsx         # Custom 404 page
│   ├── articles/
│   │   ├── page.jsx          # Articles archive with fetch() & revalidate (replaces getServerSideProps)
│   │   └── [slug]/
│   │       └── page.jsx      # Article detail + generateMetadata (replaces next/head & getServerSideProps)
│   ├── projects/
│   │   └── page.jsx          # GitHub & featured projects with fetch()
│   ├── case-studies/
│   │   └── page.jsx          # Case studies placeholder
│   └── api/
│       ├── evotunes-signature/
│       │   └── route.js      # App Router Route Handler (POST)
│       └── icon-form/
│           └── route.js      # App Router Route Handler (POST)
├── components/
│   ├── providers/
│   │   └── client-providers.jsx # LazyMotion, SetGridGap, Analytics wrapper
│   └── ... (existing layout, sections, blocks, utils)
├── content/
├── styles/
├── public/
└── next.config.mjs (or next.config.js)
```

---

## Proposed Changes

### 1. Dependencies Upgrade

Run the install command to upgrade `next`, `react`, `react-dom`, and related packages to compatible versions:
- `next@latest`
- `react@latest` & `react-dom@latest`
- `eslint-config-next@latest`
- Upgraded `framer-motion`, `@vercel/analytics`, `react-intersection-observer`, `swr`

---

### 2. App Router Migration

#### [NEW] [app/layout.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/layout.jsx)
- Consolidate `_document.jsx` (meta tags, favicons, `<head>`, `lang="en"`) and `_app.jsx` (global styles, fonts, Devicon, CSS reset).
- Include `ClientProviders` containing `LazyMotion`, `SetGridGap`, and `Analytics`.
- Wrap children with `<Navbar />` and `<Footer />`.

#### [NEW] [app/page.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/page.jsx)
- Migrate home page from `pages/index.jsx`.
- Render `Hero`, `FeaturedProjects`, `About`, `Technical`, and `Color`.

#### [NEW] [app/articles/page.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/articles/page.jsx)
- Migrate from `pages/articles/index.jsx`.
- Replace `getServerSideProps` with direct server-side `fetch` with `next: { revalidate: 600 }`.

#### [NEW] [app/articles/[slug]/page.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/articles/[slug]/page.jsx)
- Migrate from `pages/articles/[slug].jsx`.
- Replace `next/head` with modern `export async function generateMetadata({ params })`.
- Fetch post data directly on server, pass to client component or render directly.
- Move client-only DOM manipulation (syntax highlighting, copy code buttons) into a designated client component (`components/sections/articles/article-content.jsx` or marked with `'use client'`).

#### [NEW] [app/projects/page.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/projects/page.jsx)
- Migrate from `pages/projects/index.jsx`.
- Replace `getServerSideProps` with server-side `fetch` for GitHub user and repos with `next: { revalidate: 600 }`.

#### [NEW] [app/case-studies/page.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/case-studies/page.jsx)
- Migrate from `pages/case-studies/index.jsx`.

#### [NEW] [app/api/evotunes-signature/route.js](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/api/evotunes-signature/route.js)
- Migrate from `pages/api/evotunes-signature.js`.
- Convert from Express-style `(req, res)` to `export async function POST(request)` using `NextResponse.json()`.

#### [NEW] [app/api/icon-form/route.js](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/api/icon-form/route.js)
- Migrate from `pages/api/icon-form.js`.
- Convert to `export async function POST(request)` using `NextResponse.json()`.

#### [DELETE] [pages/](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/pages)
- Remove `pages/` directory once migration to `app/` is verified.

---

### 3. Component Updates for Next.js App Router Compatibility

#### [MODIFY] [navbar.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/components/layout/navbar.jsx)
- Add `'use client'` directive.
- Replace `import { useRouter } from 'next/router'` with `import { usePathname } from 'next/navigation'`.
- Replace `router.events.on('routeChangeComplete')` with a `useEffect` triggered on `pathname` change.

#### [MODIFY] [theme.util.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/components/utils/theme.util.jsx)
- Add `'use client'` directive.
- Replace `next/router` with `next/navigation` (`usePathname`) for canvas mesh re-initialization on route changes.

#### [MODIFY] [recent.jsx](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/components/sections/articles/recent.jsx)
- Update legacy `next/image` usage (`layout="fill" objectFit="cover"` -> `fill style={{ objectFit: 'cover' }}`).

#### [MODIFY] Client Component Directives
- Ensure interactive components that use React hooks (`useState`, `useEffect`, `useRef`), browser APIs, or `framer-motion` have `'use client'` at the top:
  - `components/utils/set.grid.util.jsx`
  - `components/layout/footer.jsx`
  - `components/blocks/projects/featured.jsx`
  - `components/utils/badge.list.util.jsx`
  - `components/utils/icon.util.jsx`
  - `components/utils/page.colors.util.jsx`

#### [MODIFY] [next.config.js](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/next.config.js)
- Ensure configuration is compatible with App Router (remotePatterns are preserved, remove deprecated options if any).

---

## Verification Plan

### Automated Build & Test
- Run `npm run build` to verify App Router compilation, static page generation, and type/lint checks.
- Run `npm test` or jest tests to ensure test suite passes.

### Manual Verification
- Test all pages:
  - `/` (Home page: hero, technical stack, featured projects, about)
  - `/projects` (GitHub integration and repo lists)
  - `/articles` (WordPress API feed)
  - `/articles/[slug]` (Article detail, code highlighting, copy button, dynamic metadata)
  - `/case-studies` (Coming soon section)
- Test navigation: Navbar links, mobile toggle, auto-close on route change.
- Test Theme Switcher: Light / Dark / Unicorn themes and background canvas gradient.
- Test API routes: Verify `POST /api/evotunes-signature` and `POST /api/icon-form`.
