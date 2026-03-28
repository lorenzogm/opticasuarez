# READBEFORE — Issue #399 Context

**Issue**: #399 — Page builder: add new section types and card variants
**Scope**: `apps/sanity-studio/` and `apps/web/src/`

## Key Decisions

- `profile` card variant goes in existing `sectionCards` (not a new section type)
- `sectionSocialMedia` uses existing `socialMediaLink` object schema (already in schemas/objects/)
- `sectionLocations` uses `cardItem` with location references (reuses existing infra)
- `sectionProcessSteps` uses existing `processStep` object schema (already in schemas/objects/)
- `sectionCTA` is a simple section with direct fields (title, description, buttonText, buttonUrl)
- No new object schemas needed — all object types already exist

## File Paths

### Sanity Schemas
- `apps/sanity-studio/schemas/sections/section-cards.ts` — edit (add profile variant)
- `apps/sanity-studio/schemas/sections/section-social-media.ts` — new
- `apps/sanity-studio/schemas/sections/section-locations.ts` — new
- `apps/sanity-studio/schemas/sections/section-process-steps.ts` — new
- `apps/sanity-studio/schemas/sections/section-cta.ts` — new
- `apps/sanity-studio/schemas/index.ts` — edit (register new schemas)
- `apps/sanity-studio/schemas/documents/page.ts` — edit (add to sections array)

### Web Components
- `apps/web/src/components/sections/section-cards.tsx` — edit (add profile branch)
- `apps/web/src/components/sections/section-social-media.tsx` — new
- `apps/web/src/components/sections/section-locations.tsx` — new
- `apps/web/src/components/sections/section-process-steps.tsx` — new
- `apps/web/src/components/sections/section-cta.tsx` — new
- `apps/web/src/components/sections/section-renderer.tsx` — edit (register new components)
- `apps/web/src/lib/sanity.ts` — edit (sectionProjection + cardItemProjection)

## Patterns

- Section schemas: `defineType({ type: "object", ... })`
- Components: `export default function SectionXyz({ section }: { section: any })`
- Container: `<section className="px-4 py-16 sm:px-6"><div className="container mx-auto max-w-6xl">...</div></section>`
- Use `Text` component for typography, `resolveImage()` for images
- Kebab-case file names

## Preflight

```bash
pnpm check
```
