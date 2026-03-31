# Task 02: Fix Sanity migration script path

## Description
Fix the Plan VEO migration script to use `/planveo` (with leading slash) as the
Sanity page path, matching the query convention.

## Files to Modify
- `apps/sanity-studio/scripts/fix-plan-veo.mjs`

## Implementation Details
Change `path: { _type: "slug", current: "planveo" }` to
`path: { _type: "slug", current: "/planveo" }`

## Acceptance Criteria
- [ ] Migration script uses correct path with leading slash
- [ ] `pnpm check` passes
