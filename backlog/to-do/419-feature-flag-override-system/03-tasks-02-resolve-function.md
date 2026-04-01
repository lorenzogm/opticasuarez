# Task 02 — Create resolveFeatureFlags() function

## Description

Create the server-side feature flag resolution function that merges Sanity defaults with cookie-based overrides and applies dependency logic.

## Files to Create

- `apps/web/src/lib/feature-flags.ts`

## Tests to Write First (TDD Red Phase)

Create `apps/web/src/lib/feature-flags.test.ts`:

1. **No cookies** → returns Sanity defaults unchanged
2. **`__ff_shopEnabled` = "1"** → `shopEnabled` is `true` regardless of Sanity
3. **`__ff_shopEnabled` = "0"** → `shopEnabled` is `false` regardless of Sanity
4. **`__ff_ecommerce` = "1"** → `ecommerce` is `true` AND `shopEnabled` forced to `true`
5. **Both cookies set** → both overrides apply, then dependency logic runs
6. **Invalid cookie value** (not "1" or "0") → uses Sanity default
7. **getCookie throws** (not in request context) → uses Sanity defaults

## Implementation

```typescript
import { getCookie } from "@tanstack/react-start/server";

export type FeatureFlags = {
  shopEnabled: boolean;
  ecommerce: boolean;
};

export function resolveFeatureFlags(sanityFlags: Partial<FeatureFlags>): FeatureFlags {
  const resolved: FeatureFlags = {
    shopEnabled: sanityFlags.shopEnabled ?? false,
    ecommerce: sanityFlags.ecommerce ?? false,
  };

  // Read cookie overrides
  try {
    const shopCookie = getCookie("__ff_shopEnabled");
    if (shopCookie === "1") resolved.shopEnabled = true;
    else if (shopCookie === "0") resolved.shopEnabled = false;

    const ecommerceCookie = getCookie("__ff_ecommerce");
    if (ecommerceCookie === "1") resolved.ecommerce = true;
    else if (ecommerceCookie === "0") resolved.ecommerce = false;
  } catch {
    // Not in a request context — return Sanity defaults
  }

  // Dependency: ecommerce → shopEnabled
  if (resolved.ecommerce) {
    resolved.shopEnabled = true;
  }

  return resolved;
}
```

## Acceptance Criteria

- [ ] `FeatureFlags` type is exported
- [ ] `resolveFeatureFlags()` is exported
- [ ] Cookie overrides work for `"1"` and `"0"` values
- [ ] Dependency logic: `ecommerce === true` → `shopEnabled = true`
- [ ] Graceful fallback when `getCookie` throws
- [ ] Tests pass
- [ ] `pnpm check` passes
