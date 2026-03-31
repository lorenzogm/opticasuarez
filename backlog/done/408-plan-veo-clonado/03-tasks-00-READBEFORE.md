# Task 00: Read Before

## Item Summary
Fix Plan VEO page content in Sanity: card images, FAQ accordion fields, hero image.

## Key Decisions
- Fix the source migration script for future correctness
- Write a targeted fix script for the current Sanity data
- Background colors deferred (requires schema + component changes)

## Files Involved
- `apps/sanity-studio/scripts/migrate-content.mjs` — Fix existing migration
- `apps/sanity-studio/scripts/fix-plan-veo.mjs` — New targeted fix script
- `content/json/plan-veo.json` — Source data (read-only)

## Preflight
```bash
pnpm check
```
