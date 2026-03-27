# Task 04: Registration and QC

Register all new sections in the page builder infrastructure and run QC.

## Files to Edit

1. `apps/sanity-studio/schemas/index.ts` — import + add 4 new section schemas to `schemaTypes`
2. `apps/sanity-studio/schemas/documents/page.ts` — add 4 new section types to `sections.of` array
3. `apps/web/src/components/sections/section-renderer.tsx` — import + add 4 new components to componentmap
4. `apps/web/src/lib/sanity.ts` — add GROQ projections for new section fields in `sectionProjection`

## GROQ Additions

In `sectionProjection`, add:
```groq
  // sectionSocialMedia
  "socialMediaItems": items[]{
    _key,
    platform,
    title,
    handle,
    url
  },
  // sectionLocations (reuses cardItem items already projected)
  // sectionProcessSteps
  "processStepItems": items[]{
    _key,
    stepNumber,
    title,
    description,
    "image": image { "url": asset->url }
  },
  // sectionCTA (uses top-level title, description, buttonText, buttonUrl already projected from teaser)
```

## Acceptance Criteria
- [ ] All 4 new sections registered in page.ts sections array
- [ ] All 4 new sections registered in schemas/index.ts
- [ ] All 4 new components registered in section-renderer.tsx
- [ ] sectionProjection includes fields for all new sections
- [ ] `pnpm check` passes
