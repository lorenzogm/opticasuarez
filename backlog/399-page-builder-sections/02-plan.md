# Plan — Issue #399: Page builder new section types + card variants

## Approach

Work in 4 tasks:
1. Add profile card variant to existing sectionCards (schema + component)
2. Add sectionSocialMedia + sectionLocations (schemas + components + registration)
3. Add sectionProcessSteps + sectionCTA (schemas + components + registration)
4. Wire everything up: register in page.ts, section-renderer.tsx, sectionProjection, schemas/index.ts, and run QC

## Task Breakdown

### Task 1: Profile Card Variant
- Edit `apps/sanity-studio/schemas/sections/section-cards.ts` — add `profile` to variant list
- Edit `apps/web/src/components/sections/section-cards.tsx` — add profile rendering branch with centered layout, portrait image, name heading, subtitle in blue, details list
- Edit `apps/web/src/lib/sanity.ts` — add `subtitle` and `details` to `cardItemProjection` ref fields (teamMember already has role/details)

### Task 2: sectionSocialMedia + sectionLocations
- Create `apps/sanity-studio/schemas/sections/section-social-media.ts`
- Create `apps/sanity-studio/schemas/sections/section-locations.ts`
- Create `apps/web/src/components/sections/section-social-media.tsx`
- Create `apps/web/src/components/sections/section-locations.tsx`

### Task 3: sectionProcessSteps + sectionCTA
- Create `apps/sanity-studio/schemas/sections/section-process-steps.ts`
- Create `apps/sanity-studio/schemas/sections/section-cta.ts`
- Create `apps/web/src/components/sections/section-process-steps.tsx`
- Create `apps/web/src/components/sections/section-cta.tsx`

### Task 4: Registration + QC
- Edit `apps/sanity-studio/schemas/index.ts` — import + register all 4 new section schemas
- Edit `apps/sanity-studio/schemas/documents/page.ts` — add 4 new types to sections array
- Edit `apps/web/src/components/sections/section-renderer.tsx` — import + register 4 new components
- Edit `apps/web/src/lib/sanity.ts` — add GROQ projections for new section fields
- Run `pnpm check` to verify

## TDD Note

Since this project doesn't have component-level test infrastructure for the web app (no vitest setup for components), TDD is skipped for this issue. Quality is validated via `pnpm check` (types + lint + build).
