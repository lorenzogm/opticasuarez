# Specification: Fix Appointment Booking Center → Schedule Navigation

## Overview

The appointment booking multi-step flow breaks at step 2 (center selection) because TanStack Router search params are not validated. Without `validateSearch` on the route definitions, search parameters passed via `navigate()` are silently dropped, causing the `LocationSelection` component to receive an empty `type` parameter and filter out all locations.

## Root Cause

1. **None of the `/cita/*` routes define `validateSearch`** — TanStack Router requires explicit search param validation to preserve params across navigations
2. **Components use `useSearch({ strict: false })` workaround** — bypasses type safety
3. **Empty `type` param breaks the filter** — `serviceAvailability[id].includes("")` returns `false` for all locations

## Fix

Add `validateSearch` to all 4 child routes under `/cita/`:
- `/cita/centro` — validates `type`
- `/cita/horario` — validates `type`, `location`
- `/cita/contacto` — validates `type`, `location`, `date`, `time`
- `/cita/confirmacion` — validates `type`, `location`, `date`, `time` + contact fields

Follow the existing pattern from `/tienda/index.tsx`.

## Functional Requirements

1. Center selection page displays available centers when accessed via the booking flow
2. Search params (`type`, `location`, `date`, `time`) are preserved across all booking steps
3. Each route validates its expected search params using `validateSearch`
4. The filter in `LocationSelection` correctly matches appointment types to service availability

## Success Criteria

- E2E tests TC-APPT-03 through TC-APPT-08 pass
- All `pnpm check` validations pass
- Booking flow works end-to-end from type selection → confirmation
