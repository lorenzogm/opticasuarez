# Implementation Plan: Feature Flag Override System (#419)

## Task 01 — Add ecommerce flag to Sanity schema + update GROQ query

**Files to modify:**
- `apps/sanity-studio/schemas/documents/site-settings.ts` — add `ecommerce` boolean field inside `featureFlags`

**Approach:**
- Add a `defineField({ name: "ecommerce", ... type: "boolean", initialValue: false })` alongside `shopEnabled`
- The GROQ query in `sanity.ts` already projects the full `featureFlags` object, so no query change is needed

## Task 02 — Create resolveFeatureFlags() function

**Files to create:**
- `apps/web/src/lib/feature-flags.ts` — new module

**Approach:**
- Define `FeatureFlags` type with `shopEnabled` and `ecommerce` booleans
- Export `resolveFeatureFlags(sanityFlags)` that:
  1. Copies Sanity values as defaults
  2. Reads `__ff_shopEnabled` and `__ff_ecommerce` cookies via `getCookie()`
  3. Overrides values when cookie is `"1"` or `"0"`
  4. Applies dependency: `ecommerce === true` → `shopEnabled = true`
  5. Returns resolved flags object
- Use try/catch around `getCookie` calls (same pattern as `isPreviewMode`)

## Task 03 — Refactor loaders to use resolveFeatureFlags()

**Files to modify:**
- `apps/web/src/lib/server-fns.ts` — `fetchSiteSettings` returns resolved featureFlags
- `apps/web/src/routes/tienda/index.tsx` — use resolved flags
- `apps/web/src/routes/tienda/$slug.tsx` — use resolved flags
- `apps/web/src/routes/__root.tsx` — use resolved flags

**Approach:**
- In `fetchSiteSettings`, call `resolveFeatureFlags(settings.featureFlags)` and return the resolved flags alongside settings
- In tienda loaders, consume the resolved flags instead of `settings?.featureFlags?.shopEnabled`
- In root, consume resolved `shopEnabled` from the already-resolved flags
- All loaders get resolved feature flags via `fetchSiteSettings` — single resolution point

## TDD Plan

Since this codebase doesn't have unit tests for server-fns or feature flag logic yet, the TDD approach will be:
- Task 02 includes writing tests for `resolveFeatureFlags()` (pure function once we mock `getCookie`)
- Test cases: no cookies → Sanity defaults, cookie overrides, dependency logic, invalid cookie values
