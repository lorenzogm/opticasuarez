# Specification: Fix Plan VEO Page Content (#408)

## Overview

The Plan VEO page (`/planveo`) displays incorrect content due to bugs in the Sanity
migration script `migrate-content.mjs`. Three issues need fixing:

1. **Card images**: The benefits cards (gafas graduadas, lentillas, solución de lentillas)
   were migrated without their images. The images exist in `apps/web/public/images/plan-veo/`
   and are referenced in `content/json/plan-veo.json`, but the migration script omits them.

2. **FAQ accordion empty**: The FAQ accordion items were created with `question`/`answer`
   fields, but the Sanity schema `accordionItem` expects `title`/`content`. The GROQ query
   projects `items[]{_key, title, content}`, so the misnamed fields result in empty items.

3. **Background colors**: Section backgrounds are hardcoded in page builder components.
   No `backgroundColor` field exists in any section schema. The current section stack
   (text → cards → features → processSteps → accordion → CTA) produces three consecutive
   `bg-gray-50` sections (features, processSteps, accordion). This is an existing design
   limitation, not a Sanity content issue. **Deferred to follow-up** unless addressable
   via content-only changes.

## Functional Requirements

- Accordion items must use `title` (from `question`) and `content` (from `answer`)
- Card items must include uploaded Sanity image references
- Hero section must include the uploaded hero image

## Integration Points

- `apps/sanity-studio/scripts/migrate-content.mjs` — Lines 794-804 (accordion), 759-770 (cards), 722-726 (hero)
- `apps/sanity-studio/schemas/objects/accordion-item.ts` — Expects `title`/`content`
- `apps/web/src/lib/sanity.ts` — GROQ projection: `"accordionItems": items[]{_key, title, content}`
- `content/json/plan-veo.json` — Source data with correct fields

## Success Criteria

- ✅ Card images render correctly (uploaded to Sanity, referenced in card items)
- ✅ FAQ section shows all 8 questions with expandable answers
- ✅ Migration script produces correct data if re-run in the future
