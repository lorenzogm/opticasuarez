# Specification: Fix Plan VEO page 404

**Item**: #413
**Date**: 2026-03-31

## Overview

The Plan VEO page at `/planveo` returns a 404 error. The catch-all route `$.tsx`
calls `fetchPage("/planveo")` which queries Sanity for `path.current == "/planveo"`.
The Sanity document was created with `path.current: "planveo"` (no leading slash),
causing a mismatch. Additionally, the page may not exist in Sanity at all if the
migration script wasn't run.

## Root Cause

1. Path mismatch: migration script uses `"planveo"` but query expects `"/planveo"`
2. No local fallback: unlike `/quienes-somos`, there's no JSON fallback for Plan VEO

## Solution

1. Add a fallback in `fetchPage` (server-fns.ts) that constructs the full Plan VEO
   page from `plan-veo.json` when Sanity returns null — matching the existing pattern
   for `/quienes-somos`
2. Fix the migration script to use `/planveo` (with leading slash) for the path

## Functional Requirements

- `/planveo` renders the Plan VEO page with all sections
- Page has H1 heading visible
- FAQ section with "Preguntas Frecuentes" heading is visible
- CTA link with WhatsApp/Solicitar text is visible
- Page is accessible via Plan VEO link from homepage

## Integration Points

- `apps/web/src/lib/server-fns.ts` — Add fallback logic
- `apps/web/src/content/plan-veo.json` — Content source (already exists)
- `apps/sanity-studio/scripts/fix-plan-veo.mjs` — Fix path
- `apps/web-e2e/tests/plan-veo.spec.ts` — E2E tests (already exist)

## Success Criteria

- All 3 Plan VEO E2E tests pass (TC-PVEO-01, TC-PVEO-02, TC-PVEO-03)
- `pnpm check` passes
