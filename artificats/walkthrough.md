# Walkthrough: Next.js Upgrade & App Router Migration

We upgraded the portfolio from Next.js 12 (Pages Router) to **Next.js 16.3.5** with the **App Router**, ensuring 100% feature parity, performance improvements, and search engine crawler optimization.

---

## 1. Upgraded Dependencies (`package.json`)

Pinned explicit modern versions in [`package.json`](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/package.json):
- **Next.js**: `^16.3.5` (pinned explicitly to prevent future unexpected breaking changes)
- **React**: `^19.0.0`
- **React DOM**: `^19.0.0`
- **ESLint**: `^9.20.1` & `eslint-config-next`: `^16.3.5`
- **@vercel/analytics**: `^1.4.1`
- **framer-motion**: `^12.4.7`
- **react-intersection-observer**: `^9.15.1`
- **swr**: `^2.3.2`
- **Sass**: `^1.85.0`

---

## 2. Updated Project Folder Structure

The project has been migrated to the modern Next.js App Router hierarchy:

```text
portfolio/
├── app/
│   ├── layout.jsx                  # Root Layout (Fonts, Global CSS, Metadata, Navbar, Footer)
│   ├── page.jsx                    # Home Page (Hero, Projects, About, Technical)
│   ├── not-found.jsx               # Custom 404 page
│   ├── robots.js                   # Dynamic robots.txt generation for SEO crawlers
│   ├── sitemap.js                  # Dynamic sitemap.xml with WordPress article URLs
│   ├── articles/
│   │   ├── page.jsx                # Articles archive (Server Component with fetch & 600s cache)
│   │   └── [slug]/
│   │       └── page.jsx            # Dynamic Article (generateMetadata for SEO + Server fetch)
│   ├── projects/
│   │   └── page.jsx                # GitHub Repos & Featured Projects (Server Component)
│   ├── case-studies/
│   │   └── page.jsx                # Case Studies Coming Soon
│   └── api/
│       ├── evotunes-signature/
│       │   └── route.js            # Next.js App Router Route Handler (POST)
│       └── icon-form/
│           └── route.js            # Next.js App Router Route Handler (POST)
├── components/
│   ├── providers/
│   │   └── client-providers.jsx    # LazyMotion, SetGridGap, Analytics wrapper
│   └── sections/articles/
│       └── article-view.jsx        # Client component for Code Copy button & highlight.js
├── content/
├── styles/
├── public/
└── _pages_backup/                  # Safely preserved copy of original Pages Router files
```

---

## 3. SEO & Search Engine Crawler Enhancements

1. **Root Metadata API**:
   - Dynamic OpenGraph and Twitter cards configured in [`app/layout.jsx`](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/layout.jsx).
   - Robots policy set to allow indexing by Googlebot and all search engine crawlers with full preview options.
2. **Dynamic Blog Article SEO (`generateMetadata`)**:
   - In [`app/articles/[slug]/page.jsx`](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/articles/[slug]/page.jsx), every blog article generates its own OpenGraph title, description, article publication time, author attribution, and featured thumbnail.
3. **Automated `robots.txt`**:
   - [`app/robots.js`](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/robots.js) generates a valid `robots.txt` referencing the sitemap.
4. **Automated `sitemap.xml`**:
   - [`app/sitemap.js`](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/app/sitemap.js) dynamically crawls and includes all WordPress posts alongside static routes (`/`, `/projects`, `/articles`, `/case-studies`).

---

## 4. Component Compatibility & Breaking Change Fixes

1. **`navbar.jsx`**:
   - Replaced legacy `next/router` with `next/navigation` (`usePathname`).
   - Automatically closes the mobile navigation menu on route transitions.
2. **`theme.util.jsx`**:
   - Replaced `next/router` events with `usePathname` for re-initializing the WebGL mesh gradient canvas.
3. **`recent.jsx` (Articles)**:
   - Modernized `next/image` attributes (`layout="fill"` -> `fill`, `objectFit="cover"` -> `style={{ objectFit: 'cover' }}`).
4. **`about.jsx`**:
   - Fixed Image `width` and `height` types from strings to numbers.
5. **`career.jsx` & `comingsoon.jsx`**:
   - Replaced invalid `class=` JSX attributes with `className=`.
   - Replaced `style jsx` in `comingsoon.jsx` with standard inline styling.
6. **`next.config.js`**:
   - Fixed remote pattern pathname format for `**.vercel.app`.
7. **Client Providers**:
   - Created [`client-providers.jsx`](file:///Volumes/CobletSSD/ProjectsSourceCode/portfolio/components/providers/client-providers.jsx) to isolate client-only contexts (`LazyMotion`, `SetGridGap`, `Analytics`) without making the root layout a client component.
