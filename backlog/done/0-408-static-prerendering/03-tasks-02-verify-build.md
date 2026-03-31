# Task 02: Verify build output and fix issues

## Description
Run the build and verify that pre-rendered HTML files are generated correctly. Fix any build errors.

## Steps

1. Run `pnpm --filter opticasuarez-web build`
2. Check `.output/public/` for pre-rendered HTML files
3. Verify the following pages are pre-rendered:
   - `/index.html` (homepage)
   - `/blog/index.html` (blog listing)
   - `/blog/{slug}/index.html` (individual blog posts)
   - Page builder pages
   - `/sitemap.xml`
   - `/robots.txt`
4. Verify `/cita/` is NOT in `.output/public/`
5. Fix any build errors or missing pages
6. Run `pnpm check` to ensure full quality gate passes

## Files
- Build output in `apps/web/.output/`
- May need to fix `apps/web/vite.config.ts` if issues arise

## Acceptance Criteria
- [ ] Build completes without errors
- [ ] Pre-rendered HTML exists for all content pages
- [ ] /cita/* is not pre-rendered
- [ ] `pnpm check` passes
