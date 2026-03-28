# Task 03: sectionProcessSteps + sectionCTA

Create two new section schemas and components.

## Files to Create

1. `apps/sanity-studio/schemas/sections/section-process-steps.ts`
2. `apps/sanity-studio/schemas/sections/section-cta.ts`
3. `apps/web/src/components/sections/section-process-steps.tsx`
4. `apps/web/src/components/sections/section-cta.tsx`

## sectionProcessSteps

### Schema
- title (string), subtitle (string), items array of `processStep` objects

### Component
- 4-column grid (responsive)
- Numbered circles (blue bg, white text), white cards with shadow, arrow connectors
- Match design from `pages/plan-veo/sections/process-section.tsx`

## sectionCTA

### Schema
- title (string), description (text), buttonText (string), buttonUrl (string)

### Component
- Gradient blue background (`bg-gradient-to-r from-blue-50 to-blue-100`)
- Centered heading, description, prominent button with hover scale
- Match design from `sections/book-appointment.tsx`

## Acceptance Criteria
- [ ] Both schemas are valid Sanity object types
- [ ] Both components render matching the existing designs
- [ ] `pnpm check` passes
