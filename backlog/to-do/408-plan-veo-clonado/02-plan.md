# Plan: Fix Plan VEO Page Content (#408)

## Technical Approach

### Task 1: Fix migration script

Fix `apps/sanity-studio/scripts/migrate-content.mjs` plan-veo section:

1. **Accordion items** (line ~798): Change `question`/`answer` to `title`/`content`
2. **Card items** (line ~759): Add `await uploadImage(b.image)` for each card + hero image
3. **Hero section** (line ~722): Add image upload for hero background

### Task 2: Write targeted fix script

Create `apps/sanity-studio/scripts/fix-plan-veo.mjs` that:
- Connects to Sanity
- Uploads the 4 images (hero + 3 cards)
- Re-creates the plan-veo page document with all corrections

### Task 3: Run and verify

- Run the fix script
- Verify the page renders correctly

## TDD Plan

This is a migration/content fix — no unit tests needed. Validation is:
- `pnpm check` passes (no type/lint/build errors)
- The Sanity fix script runs without errors
