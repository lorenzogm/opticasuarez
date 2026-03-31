# Task 01: Fix migration script

## Description
Fix `apps/sanity-studio/scripts/migrate-content.mjs` so that re-running the migration
produces correct plan-veo page content.

## Changes
1. **Accordion items** (~line 798): Change field names from `question`/`answer` to `title`/`content`
2. **Card items** (~line 759): Add image upload for each benefit card
3. **Hero section** (~line 722): Add hero image upload

## Acceptance Criteria
- [ ] Accordion items use `title` and `content` fields
- [ ] Card items include `image` with uploaded Sanity reference
- [ ] Hero section includes uploaded `image`
- [ ] `pnpm check` passes
