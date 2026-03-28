# Task Context — READ BEFORE all tasks

## Ticket
**#380** — Integrate Sanity CMS: migrate content from repo and connect to TanStack Start app

## Key Decisions
- Sanity org: "opticasuarez", dataset: "production"
- Schema field names in English, display titles in Spanish
- Studio at `apps/sanity-studio/`, deployable via `sanity deploy`
- Content backup in `/content/` at repo root
- All queries server-side at build time via GROQ
- Preview mode via Sanity perspective + token
- Booking flow (`/cita/*`) stays hardcoded — out of scope

## Codebase Context
- Framework: TanStack Start (React Router v1.121, Nitro, Vite 7)
- Path alias: `~` → `./src`
- Prerendering: enabled with crawlLinks
- Route pattern: `createFileRoute()` with `head()` for meta, `component` for render
- Pages import JSON via `import content from "../../content/foo.json" with { type: "json" }`
- Blog: `gray-matter` + `fs.readFileSync` in `lib/blog.ts`
- 14 JSON content files, 12 Markdown blog posts, ~100+ images

## File Paths
- Routes: `apps/web/src/routes/`
- Pages: `apps/web/src/pages/`
- Content: `apps/web/src/content/`
- Sections: `apps/web/src/sections/`
- Components: `apps/web/src/components/`
- Lib: `apps/web/src/lib/`
- Sitemap: `apps/web/scripts/generate-sitemap.ts`

## Preflight
```bash
pnpm check
```
