# Task 02: sectionSocialMedia + sectionLocations

Create two new section schemas and components.

## Files to Create

1. `apps/sanity-studio/schemas/sections/section-social-media.ts`
2. `apps/sanity-studio/schemas/sections/section-locations.ts`
3. `apps/web/src/components/sections/section-social-media.tsx`
4. `apps/web/src/components/sections/section-locations.tsx`

## sectionSocialMedia

### Schema
- title (string), items array of `socialMediaLink` objects

### Component
- 2-column grid (`grid-cols-1 md:grid-cols-2`)
- Each item: SVG icon by platform name + title as link + handle text
- Match design from `pages/quienes-somos/sections/social-media-links.tsx`

## sectionLocations

### Schema
- title (string, optional), items array of `cardItem` objects

### Component
- 2-column grid (`grid-cols-1 md:grid-cols-2`)
- Each item: Image (h-64, rounded-lg, linked), location name (linked), "Ver en el mapa" button
- Match design from `sections/locations-info.tsx`

## Acceptance Criteria
- [ ] Both schemas are valid Sanity object types
- [ ] Both components render matching the existing designs
- [ ] `pnpm check` passes
