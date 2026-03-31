# Plan: Fix Plan VEO page 404

**Item**: #413

## Files to Modify

1. `apps/web/src/lib/server-fns.ts` — Add Plan VEO fallback in `fetchPage`
2. `apps/sanity-studio/scripts/fix-plan-veo.mjs` — Fix Sanity path from `"planveo"` to `"/planveo"`

## Technical Approach

### Task 1: Add Plan VEO fallback in server-fns.ts

Follow the same pattern used for `/quienes-somos` fallback:
- Import `plan-veo.json`
- In `fetchPage`, after Sanity returns null for `/planveo`, construct the page
  from local JSON content using the existing section types
- Map JSON data to section objects matching what `SectionRenderer` expects

### Task 2: Fix migration script path

Change `path: { _type: "slug", current: "planveo" }` to
`path: { _type: "slug", current: "/planveo" }` in fix-plan-veo.mjs

## TDD Plan

E2E tests already exist in `apps/web-e2e/tests/plan-veo.spec.ts`:
- TC-PVEO-01: Page loads with correct heading
- TC-PVEO-02: FAQ and CTA sections visible
- TC-PVEO-03: Accessible via homepage link

No new tests needed — existing tests cover all acceptance criteria.
