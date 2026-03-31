# Task 01: Add Plan VEO fallback in fetchPage

## Description
Add a local JSON fallback in `fetchPage` (server-fns.ts) so that when Sanity
returns null for `/planveo`, the page is constructed from `plan-veo.json`.

## Files to Modify
- `apps/web/src/lib/server-fns.ts`

## Implementation Details
1. Import `plan-veo.json` at the top of server-fns.ts
2. After Sanity returns null/empty for `/planveo`, build the page object:
   - sectionHero with title, subtitle, description, image path
   - sectionText with introduction content
   - sectionCards with benefits items
   - sectionFeatures with requirements items
   - sectionProcessSteps with how-it-works steps
   - sectionAccordion with FAQ items (title: "Preguntas Frecuentes sobre el Plan VEO")
   - sectionCTA with WhatsApp link
3. Return the constructed page

## Acceptance Criteria
- [ ] `/planveo` renders with H1 heading
- [ ] FAQ section with "Preguntas Frecuentes" heading visible
- [ ] CTA with WhatsApp link visible
- [ ] `pnpm check` passes
