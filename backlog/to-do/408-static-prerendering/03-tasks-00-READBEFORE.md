# Context: Static Pre-rendering (#408)

## Summary
Convert TanStack Start app from full SSR with 60s SWR to static pre-rendering at build time using Nitro's built-in prerender feature.

## Key Decisions
- Use Nitro `prerender.routes` + `prerender.crawlLinks` for route enumeration
- Query Sanity CDN at Vite config time (async config) to get all routes
- Remove SWR route rule since pre-rendered pages are static
- Keep `/cita/**` as server-rendered
- Pre-render `/sitemap.xml` and `/robots.txt` during build

## Files Involved
- `apps/web/vite.config.ts` — Main change: add prerender config

## Preflight
```bash
pnpm check
```
