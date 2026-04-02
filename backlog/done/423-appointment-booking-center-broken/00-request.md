# Bug: Appointment booking flow breaks at center → schedule navigation

## Description

The appointment booking multi-step flow breaks when advancing from center selection (`/cita/centro`) to schedule (`/cita/horario`). The center selection page shows the heading "Selecciona el centro" but displays NO center options, making it impossible to proceed.

## Reproduction Steps

1. Navigate to https://opticasuarez-web-dev.vercel.app/cita
2. Select "Cita refracción" → click "Continuar"
3. ✅ Page navigates to `/cita/centro?type=refraction-exam`
4. ❌ Page shows "Selecciona el centro" heading but NO center cards
5. "Continuar" button is disabled (no center can be selected)
6. User is stuck — cannot proceed to schedule, contact details, or confirmation

## Expected Behavior

The center selection page should display available optical centers:
- **Óptica Suárez Centro** (supports: phone, refraction, visual-efficiency, contact-lens)
- **Óptica Suárez Bulevar** (supports: all types including sports-vision and child-exam)

Both centers should appear for "refraction-exam" type. Clicking a center should enable "Continuar" and navigate to `/cita/horario`.

## Actual Behavior

The center list is empty. The `LocationSelection` component receives the `type` search parameter but the filter produces no results, or the search param isn't reaching the component correctly.

## Failing Tests

- **File**: `apps/web-e2e/tests/appointment-booking.spec.ts`
  - **Test**: `select center and advance to schedule` — **TC-APPT-03** — URL doesn't change to `/cita/horario`
  - **Test**: `schedule page renders with date/time selection` — **TC-APPT-04** — 30s timeout (cascading)
  - **Test**: `select date/time and advance to contact details` — **TC-APPT-05** — 30s timeout (cascading)
  - **Test**: `contact details form renders with required fields` — **TC-APPT-06** — 30s timeout (cascading)
  - **Test**: `contact form validation shows errors for empty required fields` — **TC-APPT-07** — 30s timeout (cascading)
  - **Test**: `confirmation page renders with booking summary` — **TC-APPT-08** — 30s timeout (cascading)

## Error Output

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Expected pattern: /cita\/horario/
Received string:  "https://opticasuarez-web-dev.vercel.app/cita/centro"
```

## Investigation Notes

**Root cause identified in `apps/web/src/components/book/location-selection.tsx`:**

```typescript
// Line 57: Gets search param 'type'
const appointmentType = searchParams.type || "";

// Line 64-66: Filters locations based on service availability
const availableLocations = locations.filter((location) =>
  serviceAvailability[location.id].includes(appointmentType)
);
```

When `appointmentType` is empty or doesn't match the service keys, the filter returns zero results. Possible causes:
1. The `type` search parameter is not arriving at the component (missing `validateSearch` on the TanStack Router route definition)
2. The search parameter value doesn't match the hardcoded service availability keys

**Key files to check:**
- `apps/web/src/routes/cita/centro.tsx` — route definition (may need `validateSearch`)
- `apps/web/src/components/book/location-selection.tsx` — filtration logic (lines 57-66)
- `apps/web/src/components/book/book-appointment.tsx` — navigation source (line 75-81)

Compare with routes that DO work with search params (e.g., `/tienda` has `validateSearch`).

## Priority

Critical — blocks entire appointment booking flow (6 tests), core business feature
