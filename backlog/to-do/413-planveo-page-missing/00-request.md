# Bug: Plan VEO page returns 404

## Description
The Plan VEO page at `/planveo` returns a 404 "Página no encontrada" error. The old site (opticasuarez-old.vercel.app) has a fully functional Plan VEO page with hero section, description, coverage cards, requirements, step-by-step process, FAQ accordion, and CTA. This page has not been migrated to the new Sanity-powered site.

## Reproduction Steps
1. Navigate to http://localhost:3000/planveo
2. Page shows "Página no encontrada" instead of Plan VEO content

## Expected Behavior
The Plan VEO page should render with all its content sections (as seen on the old site):
- Hero with title "Plan VEO en Jaén"
- Description of what Plan VEO is
- Coverage cards (Gafas Graduadas, Lentes de Contacto, Solución de Mantenimiento)
- Requirements section (age, visual problem, coverage, documentation)
- Step-by-step process (4 steps)
- FAQ accordion (8 questions)
- CTA with WhatsApp link

## Actual Behavior
Page returns 404 with "Página no encontrada" heading.

## Failing Tests
- **File**: `apps/web-e2e/tests/plan-veo.spec.ts`
- **Tests**: TC-PVEO-01, TC-PVEO-02, TC-PVEO-03
- **All 3 tests fail** across all browsers

## Error Output
```
Error: Timed out 5000ms waiting for expect(locator).not.toBeVisible()
Locator: getByText('Página no encontrada')
Expected: not visible
Received: visible
```

## Priority
Critical — This is a key business page for a government subsidy program
