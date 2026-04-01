# Task 03 — Refactor loaders to use resolveFeatureFlags()

## Description

Update `fetchSiteSettings` to call `resolveFeatureFlags()`, and update all consuming loaders and components to use the resolved flags.

## Files to Modify

- `apps/web/src/lib/server-fns.ts` — call `resolveFeatureFlags()` in `fetchSiteSettings`
- `apps/web/src/routes/__root.tsx` — consume resolved `featureFlags` from loader data
- `apps/web/src/routes/tienda/index.tsx` — use resolved flags for the `shopEnabled` check
- `apps/web/src/routes/tienda/$slug.tsx` — same pattern

## Implementation

### server-fns.ts

In `fetchSiteSettings`, after getting `settings`, resolve flags:

```typescript
import { resolveFeatureFlags } from "~/lib/feature-flags";

export const fetchSiteSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const settings = await getSiteSettings(preview);
    const featureFlags = resolveFeatureFlags(settings?.featureFlags ?? {});
    return { settings: { ...settings, featureFlags }, isPreview: preview };
  }
);
```

### __root.tsx

The `shopEnabled` extraction from `settings.featureFlags.shopEnabled` remains the same pattern — it will now receive the resolved value.

### tienda/index.tsx and tienda/$slug.tsx

The loaders already call `fetchSiteSettings()` and check `settings?.featureFlags?.shopEnabled` — no change in how they access the value, but the value is now resolved.

## Acceptance Criteria

- [ ] `fetchSiteSettings` returns settings with resolved feature flags
- [ ] `/tienda` loader respects cookie overrides
- [ ] `/tienda/$slug` loader respects cookie overrides
- [ ] Root component receives resolved `shopEnabled`
- [ ] Without cookies, behavior is identical to previous (Sanity defaults)
- [ ] `pnpm check` passes
