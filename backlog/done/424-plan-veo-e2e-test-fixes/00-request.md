# Bug: Plan VEO E2E test selectors need fixing

## Description

Two Plan VEO E2E tests fail due to test selector issues, not application bugs. The selectors are too broad or make incorrect assumptions about the page structure.

## Failing Tests

### TC-PVEO-02: Plan VEO page shows FAQ and CTA sections

- **File**: `apps/web-e2e/tests/plan-veo.spec.ts:15`
- **Error**: Strict mode violation — `getByRole('link', { name: /Solicitar|Plan VEO|WhatsApp|Reservar/i })` resolves to 2 elements:
  1. WhatsApp nav link (`<a title="Contactar por WhatsApp">`)
  2. Plan VEO CTA button (`<a>Solicitar Plan VEO</a>`)
- **Fix needed**: Make selector more specific, e.g. `getByRole('link', { name: 'Solicitar Plan VEO' })` or scope to `main` content area

### TC-PVEO-03: Plan VEO page accessible via link from homepage

- **File**: `apps/web-e2e/tests/plan-veo.spec.ts:27`
- **Error**: `getByRole('link', { name: /Plan VEO/i })` not found on homepage
- **Reason**: Plan VEO is accessible through the "Servicios" dropdown menu, not as a direct link on the homepage
- **Fix needed**: Either open the Servicios dropdown first and then find the Plan VEO link, or navigate directly to `/planveo` and test from there

## Error Output

TC-PVEO-02:
```
Error: strict mode violation: getByRole('link', { name: /Solicitar|Plan VEO|WhatsApp|Reservar/i }) resolved to 2 elements
```

TC-PVEO-03:
```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
Locator: getByRole('link', { name: /Plan VEO/i }).first()
Expected: visible
Received: <element(s) not found>
```

## Priority

Medium — test code improvements, not application bugs
