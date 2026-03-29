## Description

The website (`apps/web/`) currently runs as full SSR with Nitro's 60-second stale-while-revalidate caching. This causes unnecessary server load on every request and leads to 404 errors on the dev deployment (opticasuarez-web-dev.vercel.app) when the server fails to render pages.

Convert the TanStack Start app to **static pre-rendering at build time**. All known pages should be fetched from Sanity CMS during the build and rendered as static HTML. This eliminates server-side rendering for content pages, reduces hosting costs, improves performance (instant TTFB from CDN), and eliminates the 404 errors caused by SSR failures.

The booking flow (`/cita/*`) can remain server-rendered since it involves dynamic form state. All other routes — homepage, blog posts, service pages, about, contact, and catch-all page-builder pages — should be pre-rendered.

## Acceptance Criteria

- [ ] All content pages are pre-rendered as static HTML at build time (homepage, blog listing, individual blog posts, catch-all page-builder pages)
- [ ] The build process fetches all page slugs, blog post slugs, and page-builder paths from Sanity CMS to generate the full list of routes to pre-render
- [ ] The booking flow (`/cita/*`) remains server-rendered (not pre-rendered)
- [ ] Sitemap and robots.txt continue to work (can remain as server routes or be pre-rendered)
- [ ] The build succeeds on Vercel with the new static output and pages are served from CDN
- [ ] No 404 errors for pages that exist in Sanity on the deployed site

## Technical Context

### Relevant Existing Code
- `apps/web/vite.config.ts` — Current Nitro config with `swr: 60` route rules; needs to be changed for static/ISR output
- `apps/web/src/lib/sanity.ts` — All GROQ queries for fetching content; functions like `getAllBlogSlugs()`, `getHomepage()`, `getPage()` already exist
- `apps/web/src/lib/server-fns.ts` — Server functions wrapping Sanity queries; need to work at build time
- `apps/web/src/routes/__root.tsx` — Root layout fetches `siteSettings` in its loader
- `apps/web/src/routes/$.tsx` — Catch-all route for page-builder pages; needs to pre-render all known paths
- `apps/web/src/routes/blog/$slug.tsx` — Blog post route; needs all slugs enumerated at build time
- `apps/web/server/routes/sitemap.xml.ts` — Dynamic sitemap; fetches all slugs from Sanity
- `infra/vercel/src/main.tf` — Vercel project config; `output_directory = ".output"`, `framework = null`

### Patterns to Follow
- TanStack Start + Nitro prerendering conventions
- Vercel's static output adapter for Nitro
- The existing `apps/opticasuarez-react-router/react-router.config.ts` has a working `prerender()` function that enumerates routes from Sanity — use similar approach

### Data & API
- Sanity project ID: `2a24wmex`, dataset: `production`
- Sanity CDN URL used for published content queries
- All page types: homepage (singleton), blogPost (by slug), page (by path), product/productCategory/brand (tienda), service, location
- Site settings fetched once by root layout loader

## Scope

### In Scope
- Configure Nitro/TanStack Start for static pre-rendering
- Enumerate all routes from Sanity at build time
- Pre-render all content pages as static HTML
- Ensure Vercel serves static output from CDN
- Keep `/cita/*` routes as server-rendered

### Out of Scope
- On-demand revalidation (Story #409)
- Sanity preview/draft mode (Story #410)
- Rebuild Site button (Story #411)
- Removing products from homepage (Story #412)

## Priority

High — This is the foundation for the static site initiative and blocks on-demand revalidation (#409). Also fixes the current 404 errors on the dev deployment.

## Type

feature

## Notes

- The current `routeRules` in `vite.config.ts` (`"/**": { swr: 60 }`) must be replaced with prerender configuration
- TanStack Start may require Vinxi/Nitro prerender configuration — check latest TanStack Start docs for static export support
- If TanStack Start doesn't natively support full static export, consider using Nitro's `prerender` feature directly along with `nitro.prerender.routes` or `nitro.prerender.crawlLinks`
- New pages created in Sanity after build will 404 until revalidation is set up in #409 — this is acceptable as the user confirmed fallback behavior (b): render on-demand first time, then cache statically

## Related Stories

- #409 On-demand revalidation via Sanity webhook — builds on static output to add per-page revalidation
- #410 Sanity Presentation tool (live preview) — independent, adds draft preview capability
- #411 Rebuild Site button in Sanity Studio — independent, triggers full rebuild
- #412 Remove products from homepage — independent, simplifies homepage data
