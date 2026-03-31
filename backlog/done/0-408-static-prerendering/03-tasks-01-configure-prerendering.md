# Task 01: Configure Nitro prerendering in vite.config.ts

## Description
Add static pre-rendering configuration to the Nitro plugin in `apps/web/vite.config.ts`. This is the core change that enables build-time static generation.

## Steps

1. Make `vite.config.ts` export an async config function
2. Add a `getSanityRoutes()` function that queries the Sanity CDN to enumerate all routes:
   - All blog post slugs → `/blog/{slug}`
   - All page paths → `/{path}` (catch-all page builder)
   - All product slugs → `/tienda/{slug}`
   - Static routes: `/`, `/blog`, `/tienda`
   - Utility routes: `/sitemap.xml`, `/robots.txt`
3. Pass the routes to Nitro's `prerender.routes` config
4. Enable `prerender.crawlLinks: true` as a safety net
5. Add `prerender.ignore` for `/cita` and `/_serverFn`
6. Remove the `"/**": { swr: 60 }` route rule (no longer needed)
7. Keep `"/_serverFn/**": { swr: false }`

## File
- `apps/web/vite.config.ts`

## Acceptance Criteria
- [ ] vite.config.ts exports an async config
- [ ] Sanity CDN is queried at config time for all route URLs
- [ ] Nitro prerender config includes all routes + crawlLinks
- [ ] /cita/** is ignored from prerendering
- [ ] SWR route rule is removed
- [ ] `pnpm check` passes
- [ ] `pnpm --filter opticasuarez-web build` produces prerendered HTML in output
