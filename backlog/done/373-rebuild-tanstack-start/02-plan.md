# Plan: Rebuild app with TanStack Start

## Technical Approach

This is a full migration from React Router v7 to TanStack Start. We create a new `apps/web/` directory alongside the existing `apps/opticasuarez-react-router/`. The existing app remains untouched.

### Strategy: Copy + Adapt

1. **Scaffold** a new TanStack Start project from scratch (not via CLI scaffolder, to maintain control)
2. **Copy** all UI components, sections, pages, content, and assets as-is
3. **Adapt** only the routing layer (route files) and root layout to TanStack Start conventions
4. **Migrate** server routes and actions to TanStack Start patterns

### Key Architectural Decisions

1. **File-based routing**: Use TanStack Router's file-based routing in `src/routes/`
2. **Source in `src/`**: TanStack Start convention uses `src/` as root (vs `app/` in React Router)
3. **Path alias**: `~/*` → `./src/*` (matching TanStack Start convention)
4. **SSR by default**: TanStack Start enables SSR by default
5. **Static prerendering**: Configure in vite.config.ts for content pages
6. **Server routes**: Use `server.handlers` pattern for robots.txt, sitemap.xml, og-image.jpg
7. **Server functions**: Use `createServerFn` for booking email action
8. **Booking sub-routes**: Use TanStack flat file naming (`cita_.centro.tsx`) for booking flow

### Migration Mapping per File Type

**Route files** — Rewrite completely (different API surface)
**UI components** — Copy as-is, only update imports (`react-router` → `@tanstack/react-router`)
**Page components** — Copy as-is, minimal import changes
**Content files** — Copy exactly as-is (JSON + Markdown)
**Assets** — Copy exactly as-is
**Utilities** — Copy as-is

## File Change Inventory

### New files to create (~50+)

#### Config files (6)
- `apps/web/package.json`
- `apps/web/vite.config.ts`
- `apps/web/tsconfig.json`
- `apps/web/tailwind.config.js`
- `apps/web/eslint.config.js`
- `apps/web/.env.example`

#### Core framework files (2)
- `apps/web/src/router.tsx`
- `apps/web/src/routes/__root.tsx`

#### Route files (22)
All route files in `apps/web/src/routes/` — rewritten for TanStack Start API

#### Copied/adapted files (~30+)
- All component files → `apps/web/src/components/`
- All section files → `apps/web/src/sections/`
- All page component files → `apps/web/src/pages/`
- All content files → `apps/web/src/content/`
- All lib files → `apps/web/src/lib/`
- Action file → `apps/web/src/actions/`
- Global CSS → `apps/web/src/global.css`

#### Static assets
- Copy entire `public/` directory

### Existing files to modify (3)
- `.github/copilot-instructions.md` — Add `apps/web/` to structure
- `.gitignore` — Add any TanStack Start-specific ignores
- `README.md` — Update with new app info

## Task Breakdown

| # | Title | Files | Description |
|---|-------|-------|-------------|
| 01 | Scaffold TanStack Start project | 7 | package.json, vite.config.ts, tsconfig.json, tailwind.config.js, eslint.config.js, router.tsx, __root.tsx, global.css |
| 02 | Copy content, assets, and utilities | ~25 | Copy content/, public/, lib/, actions/ directories |
| 03 | Migrate shared components and sections | ~20 | Copy + adapt all UI components and sections |
| 04 | Migrate static page routes | ~20 | Homepage, services, about, contact, service detail pages |
| 05 | Migrate dynamic routes (blog + booking) | ~12 | Blog listing, blog/$slug, 5-step booking flow |
| 06 | Migrate server routes and SEO | ~5 | robots.txt, sitemap.xml, og-image.jpg, structured data |
| 07 | Quality gates and verification | ~3 | ESLint config, scripts, npm run build verification |

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| TanStack Start is RC, not v1 | Pin exact versions; the API is declared stable |
| Embla Carousel SSR compatibility | Already works with React Router SSR; should work fine |
| Resend email integration | Use `createServerFn` — direct equivalent of current server action |
| Blog markdown parsing | gray-matter works the same in any Node.js environment |
| OG image generation | Implement as server route with same logic |
