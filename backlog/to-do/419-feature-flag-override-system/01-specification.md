# Specification: Feature Flag Override System (#419)

## Overview

Introduce a server-side feature flag resolution layer that merges Sanity-defined defaults with cookie-based overrides. This enables developers and product owners to toggle features per-browser without modifying Sanity data. Also adds a new `ecommerce` flag with dependency logic (`ecommerce` → `shopEnabled`).

## Functional Requirements

1. **New Sanity field**: `featureFlags.ecommerce` (boolean, default `false`) in `siteSettings` schema
2. **GROQ query update**: `getSiteSettings` must project the `ecommerce` field
3. **Generic resolution function**: `resolveFeatureFlags()` reads Sanity values, checks `__ff_*` cookies, returns effective flags
4. **Cookie override**: `__ff_shopEnabled` and `__ff_ecommerce` cookies with values `"1"` or `"0"` override Sanity values
5. **Dependency logic**: if `ecommerce` resolves `true`, force `shopEnabled` to `true`
6. **Loader refactor**: `/tienda` and `/tienda/$slug` loaders use `resolveFeatureFlags()` instead of raw `settings.featureFlags`
7. **Root loader refactor**: `__root.tsx` passes resolved flags (not raw Sanity flags) to components

## Non-Functional Requirements

- Cookies must NOT be `httpOnly` (needed for browser-side read/write by story #420)
- Resolution function must be server-only (uses `getCookie`)
- Must not break existing behavior when no override cookies are set

## Integration Points

| File | Change |
|------|--------|
| `apps/sanity-studio/schemas/documents/site-settings.ts` | Add `ecommerce` boolean field |
| `apps/web/src/lib/sanity.ts` | GROQ projection already projects full `featureFlags` — no change needed |
| `apps/web/src/lib/feature-flags.ts` | New file: `resolveFeatureFlags()` |
| `apps/web/src/lib/server-fns.ts` | `fetchSiteSettings` calls `resolveFeatureFlags()` |
| `apps/web/src/routes/__root.tsx` | Use resolved flags from loader |
| `apps/web/src/routes/tienda/index.tsx` | Use resolved flags from root loader or inline resolution |
| `apps/web/src/routes/tienda/$slug.tsx` | Same pattern |

## Success Criteria

- `shopEnabled` is controllable via `__ff_shopEnabled` cookie
- `ecommerce` flag exists in Sanity schema
- Activating `ecommerce` override forces `shopEnabled = true`
- Without cookies, behavior is identical to current (Sanity defaults apply)
- `pnpm check` passes
