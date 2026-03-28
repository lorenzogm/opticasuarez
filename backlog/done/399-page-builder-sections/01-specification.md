# Specification — Issue #399: Page builder new section types + card variants

## Overview

Add 4 new section types and 1 card variant to the page builder to enable migration of dedicated pages. This is a structural migration — designs must match current production implementations.

## Functional Requirements

### 1. Profile Card Variant (sectionCards)
- Add `profile` to the existing `variant` field in `sectionCards`schema
- Renders cards in **centered layout**: portrait image (`h-80`), name as heading (uppercase), subtitle/role in blue accent, list of detail strings
- Uses `resolveCard()` — needs `subtitle` and `details` fields resolved from `ref` (teamMember documents already have `role` and `details` fields)
- Design reference: `pages/quienes-somos/sections/team-members.tsx`

### 2. sectionSocialMedia
- Sanity schema: array of `socialMediaLink` objects (already exists)
- React component: 2-column grid, each item shows SVG icon + title link + handle text
- Icons rendered by platform name (instagram, facebook, youtube, twitter, linkedin)
- Design reference: `pages/quienes-somos/sections/social-media-links.tsx`

### 3. sectionLocations
- Sanity schema: array of `cardItem` objects with `reference` to `location` documents  
  OR use the existing cards section with a dedicated variant — after analysis, a dedicated section type is cleaner since locations have unique UI (image link + map button)
- React component: 2-column grid, image (h-64, linked), location name (linked), "Ver en el mapa" button
- Design reference: `sections/locations-info.tsx`

### 4. sectionProcessSteps
- Sanity schema: uses existing `processStep` object type (already has stepNumber, title, description, image)
- React component: 4-column grid, numbered circles (blue), white card with shadow, arrow connectors between steps
- Design reference: `pages/plan-veo/sections/process-section.tsx`

### 5. sectionCTA
- Sanity schema: title, description, buttonText, buttonUrl (simple fields, no itemsarray)
- React component: gradient blue background, centered text, prominent button with hover scale effect
- Design reference: `sections/book-appointment.tsx`

## Integration Points

### Sanity Studio (`apps/sanity-studio/`)
| File | Change |
|------|--------|
| `schemas/sections/section-cards.ts` | Add `profile` to variant list |
| `schemas/sections/section-social-media.ts` | **NEW** — section with items array of `socialMediaLink` |
| `schemas/sections/section-locations.ts` | **NEW** — section with items array of `cardItem` |
| `schemas/sections/section-process-steps.ts` | **NEW** — section with items array of `processStep` |
| `schemas/sections/section-cta.ts` | **NEW** — section with title, description, buttonText, buttonUrl |
| `schemas/index.ts` | Import + register 4 new section schemas |
| `schemas/documents/page.ts` | Add 4 new types to sections array |

### Web App (`apps/web/src/`)
| File | Change |
|------|--------|
| `components/sections/section-cards.tsx` | Add `profile` rendering branch |
| `components/sections/section-social-media.tsx` | **NEW** — social media component |
| `components/sections/section-locations.tsx` | **NEW** — locations component |
| `components/sections/section-process-steps.tsx` | **NEW** — process steps component |
| `components/sections/section-cta.tsx` | **NEW** — CTA component |
| `components/sections/section-renderer.tsx` | Import + register 4 new components |
| `lib/sanity.ts` | Add GROQ projections for new sections in `sectionProjection` and `cardItemProjection` |

## Success Criteria

- All 5 new page builder elements are functional in Sanity Studio
- Section renderer correctly dispatches to new components
- GROQ queries fetch all necessary data
- `pnpm check` passes (types, lint, build)
