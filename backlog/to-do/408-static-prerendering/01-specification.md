# Specification: Static Pre-rendering at Build Time

## Overview

Convert the TanStack Start web app from full SSR (with 60s SWR caching) to static pre-rendering at build time using Nitro's built-in prerender feature. All content pages are pre-rendered as static HTML during the build by fetching content from Sanity CMS. The booking flow (`/cita/*`) remains server-rendered.

## Functional Requirements

1. All content pages are pre-rendered as static HTML files in `.output/public/`
2. The build process queries Sanity CMS to enumerate all routes (blog posts, pages, products)
3. Pre-rendered pages are served from CDN with zero server-side processing
4. Booking flow (`/cita/*`) remains server-rendered via serverless functions
5. Sitemap and robots.txt are pre-rendered during the build
6. New pages created in Sanity after build return 404 until next build/revalidation (acceptable per product owner)

## Non-Functional Requirements

- Build-time Sanity queries use the CDN URL (no token needed for published content)
- Build fails with a clear error if Sanity is unreachable
- Dev server (`vite dev`) is not affected by prerender config
- Pre-rendered HTML includes all meta tags, structured data, and SEO

## Integration Points

- `apps/web/vite.config.ts` — Add async Sanity route fetching + Nitro prerender config
- `apps/web/server/routes/sitemap.xml.ts` — Pre-rendered during build
- `apps/web/server/routes/robots.txt.ts` — Pre-rendered during build
- Vercel deployment — Static files from CDN, serverless for /cita/* and /_serverFn/*

## Success Criteria

- `pnpm build` produces pre-rendered HTML in `.output/public/` for all content pages
- No 404 errors for pages that exist in Sanity
- `/cita/*` routes still work via SSR
- Build completes successfully on Vercel
- `pnpm check` passes
