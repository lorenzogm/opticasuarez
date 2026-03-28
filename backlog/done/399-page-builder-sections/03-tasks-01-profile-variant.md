# Task 01: Profile Card Variant

Add `profile` variant to existing `sectionCards` schema and component.

## Files to Edit

1. `apps/sanity-studio/schemas/sections/section-cards.ts` — add `{ title: "Perfil", value: "profile" }` to variant options
2. `apps/web/src/components/sections/section-cards.tsx` — add profile rendering branch
3. `apps/web/src/lib/sanity.ts` — add `subtitle` (from ref.role) and `details` to cardItemProjection

## Implementation Details

### Schema Change
Add `profile` to the variant list in section-cards.ts.

### Component Change
In section-cards.tsx:
- Add `"profile": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"` to `variantClasses`
- Detect `isProfile = variant === "profile"` 
- When profile: render centered card with portrait image (h-80, rounded-lg), name heading (uppercase, heading-4), subtitle in blue-800, details list

### GROQ Change
In cardItemProjection, ensure the `ref` object includes:
- `"subtitle": role` (maps teamMember.role to subtitle)
- `details` (already should be there from teamMember)

## Acceptance Criteria
- [ ] `profile` variant appears in Sanity schema options
- [ ] Profile cards render with centered layout, portrait image, name, role in blue, details
- [ ] `pnpm check` passes
