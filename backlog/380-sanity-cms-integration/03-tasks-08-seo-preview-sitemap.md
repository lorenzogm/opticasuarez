# Task 08 — SEO fields, preview mode, sitemap update

## Goal
Wire up Sanity SEO fields to route `head()` exports, implement preview/draft mode, and update sitemap generation.

## Steps

1. **SEO fields**: For each route, populate `head()` meta tags from the document's `seo` object:
   - `title`, `description`, `keywords`
   - `og:title`, `og:description`, `og:image` (from Sanity image)
   - `canonical` link
   - `robots` directive

2. **Preview mode**:
   - Add preview route/middleware that sets a preview cookie/param
   - When preview is active, use `previewClient` (useCdn: false, perspective: "previewDrafts", token)
   - Add "Exit preview" mechanism

3. **Sitemap update** (`scripts/generate-sitemap.ts`):
   - Replace filesystem blog slug reading with Sanity query
   - Query all published service pages, blog posts for dynamic URLs
   - Keep static routes list for non-CMS pages (/cita)

## Acceptance Criteria
- [ ] Each page has correct meta tags sourced from Sanity
- [ ] Preview mode shows unpublished changes
- [ ] Sitemap includes all Sanity-sourced URLs
- [ ] `pnpm check` passes
