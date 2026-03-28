# Task 02 — Copy content, assets, and utilities

## Objective
Copy all content files, static assets, and utility functions from the source app to the new app.

## Directories to Copy

1. `apps/opticasuarez-react-router/app/content/` → `apps/web/src/content/`
   - All JSON content files (homepage.json, servicios.json, etc.)
   - All blog markdown files (app/content/blog/*.md)

2. `apps/opticasuarez-react-router/public/` → `apps/web/public/`
   - All images (WebP, responsive sizes)
   - CNAME, pinterest verification, favicons

3. `apps/opticasuarez-react-router/app/ui/lib/` → `apps/web/src/lib/`
   - blog.ts — getBlogPosts(), getBlogPost(slug)
   - services.ts — servicePages array
   - seo-keywords.ts — keyword arrays
   - utils.ts — cn() utility

4. `apps/opticasuarez-react-router/app/actions/` → `apps/web/src/actions/`
   - send-booking-emails.ts (will be adapted to createServerFn in task 06)

## Changes Required
- Update import paths in lib files: `~/` references need to resolve to `src/`
- Verify gray-matter imports work

## Acceptance Criteria
- [ ] All 12+ JSON content files copied
- [ ] All 12 blog markdown files copied  
- [ ] All ~293 images in public/ copied
- [ ] All 4 lib utility files copied
- [ ] send-booking-emails.ts copied
- [ ] No broken import paths
