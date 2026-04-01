# READBEFORE — Context for Task Execution

## Item Summary

**#419 Feature flag override system (cookie-based)**

Add a server-side resolution layer for feature flags that merges Sanity defaults with cookie-based overrides. Add the `ecommerce` flag to Sanity. Apply dependency logic: `ecommerce → shopEnabled`.

## Key Decisions

- New file `apps/web/src/lib/feature-flags.ts` for the resolution function
- Cookie convention: `__ff_{flagName}` with values `"1"` (true) or `"0"` (false)
- Cookies are NOT httpOnly (story #420 needs browser JS access)
- Resolution happens once in `fetchSiteSettings` — all loaders consume resolved flags
- Dependency: `ecommerce === true` forces `shopEnabled = true`

## File Paths

| File | Action |
|------|--------|
| `apps/sanity-studio/schemas/documents/site-settings.ts` | Modify — add `ecommerce` field |
| `apps/web/src/lib/feature-flags.ts` | Create — `resolveFeatureFlags()` + types |
| `apps/web/src/lib/server-fns.ts` | Modify — call `resolveFeatureFlags()` in `fetchSiteSettings` |
| `apps/web/src/routes/__root.tsx` | Modify — consume resolved flags |
| `apps/web/src/routes/tienda/index.tsx` | Modify — use resolved flags |
| `apps/web/src/routes/tienda/$slug.tsx` | Modify — use resolved flags |

## Patterns to Follow

- `getCookie()` from `@tanstack/react-start/server` — wrap in try/catch
- kebab-case file naming
- No `any` types — define explicit `FeatureFlags` type
- Existing cookie pattern: `__sanity_preview` with `"1"/"0"` strings

## Preflight

Run `pnpm check` from monorepo root before marking any task complete.
