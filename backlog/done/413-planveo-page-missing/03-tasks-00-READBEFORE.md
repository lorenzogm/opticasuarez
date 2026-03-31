# DEV Context: #413 Plan VEO page 404

## Item Summary
Plan VEO page at `/planveo` returns 404. The catch-all route queries Sanity but
the document either doesn't exist or has a path mismatch.

## Key Decisions
- Add local JSON fallback in `fetchPage` (same pattern as `/quienes-somos`)
- Fix Sanity migration script path

## File Paths
- `apps/web/src/lib/server-fns.ts` — Main change (add fallback)
- `apps/web/src/content/plan-veo.json` — Content source
- `apps/sanity-studio/scripts/fix-plan-veo.mjs` — Fix path
- `apps/web/src/components/sections/section-renderer.tsx` — Reference only

## Test Patterns
- E2E tests: `apps/web-e2e/tests/plan-veo.spec.ts` (3 tests, all currently failing)

## Preflight
```bash
pnpm check
```
