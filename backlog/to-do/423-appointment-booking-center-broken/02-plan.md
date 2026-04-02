# Plan: Fix Appointment Booking Center → Schedule Navigation

## Technical Approach

Add `validateSearch` to all `/cita/*` child routes following the existing pattern from `/tienda/index.tsx`. Each route validates the search params it needs from previous steps.

## Files to Modify

1. **`apps/web/src/routes/cita/centro.tsx`** — Add `validateSearch` for `type` param
2. **`apps/web/src/routes/cita/horario.tsx`** — Add `validateSearch` for `type` + `location` params
3. **`apps/web/src/routes/cita/contacto.tsx`** — Add `validateSearch` for `type`, `location`, `date`, `time` params
4. **`apps/web/src/routes/cita/confirmacion.tsx`** — Add `validateSearch` for all booking params

## No Files to Create

All necessary files already exist. This is a bug fix modifying existing route definitions.

## TDD Plan

No unit tests needed — this is a route configuration fix. Validation is through `pnpm check` (type safety) and E2E tests (TC-APPT-03 through TC-APPT-08).
