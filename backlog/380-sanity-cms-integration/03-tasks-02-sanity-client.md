# Task 02 — Sanity client + query helpers in web app

## Goal
Add `@sanity/client` to the web app, create a shared Sanity client module, and write GROQ query functions for each page.

## Steps

1. Add `@sanity/client` dependency to `apps/web/package.json`
2. Create `.env` in `apps/web/` with placeholders:
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET=production`
   - `SANITY_API_VERSION=2026-03-23`
   - `SANITY_API_TOKEN` (for preview mode)
3. Create `apps/web/src/lib/sanity.ts`:
   - Export `sanityClient` (public, CDN-backed)
   - Export `previewClient` (draft-aware, token-based)
   - Export GROQ query functions: `getHomepage()`, `getServicePage(slug)`, `getAboutPage()`, `getContactPage()`, `getServiciosOverview()`, `getPlanVeoPage()`, `getSiteSettings()`, `getBlogPosts()`, `getBlogPost(slug)`, `getAllSlugs()`
4. Add `.env` to `.gitignore`
5. Create `.env.example` with placeholder values

## Acceptance Criteria
- [ ] `sanity.ts` exports typed client and all query functions
- [ ] `.env.example` documents all required env vars
- [ ] `pnpm check` passes
