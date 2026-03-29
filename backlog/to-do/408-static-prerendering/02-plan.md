# Plan: Static Pre-rendering at Build Time

## Technical Approach

### Nitro Prerender Configuration

Nitro has built-in support for pre-rendering routes at build time. During `vite build`, Nitro:
1. Spins up a local server
2. Makes HTTP requests to each route in the prerender list
3. Saves the HTML response as static files in `.output/public/`
4. The server function still handles non-prerendered routes

### Route Enumeration Strategy

Two-pronged approach:
1. **Explicit routes**: Query Sanity CDN at Vite config time to get all blog slugs, page paths, and product slugs
2. **Crawl links**: Enable `crawlLinks: true` as a safety net to discover any routes missed by explicit enumeration

### Files to Modify

1. **`apps/web/vite.config.ts`** — Add async Sanity route fetching + Nitro prerender config, remove SWR rule
2. No other files need modification — the existing loaders, server functions, and components work unchanged

### Prerender Ignore List

- `/cita/**` — Booking flow (SSR only)
- `/_serverFn/**` — TanStack Start server functions (API, not pages)

### TDD Plan

This is a configuration/infrastructure change. Testing:
- Run `pnpm build` and verify `.output/public/` contains prerendered HTML
- Run `pnpm check` to ensure no type/lint errors
- Manual verification that routes work correctly
