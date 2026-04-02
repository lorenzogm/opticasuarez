# Task 02: Update booking components to use typed search params

## Description

Update booking components to remove `strict: false` workaround in `useSearch` calls and use proper typed search params from the validated routes.

## Files to Modify

1. `apps/web/src/components/book/location-selection.tsx` — Remove `strict: false`, use typed search
2. `apps/web/src/components/book/date-time.tsx` — Remove `strict: false`, use typed search (if applicable)
3. `apps/web/src/components/book/contact-details.tsx` — Remove `strict: false`, use typed search (if applicable)
4. `apps/web/src/components/book/confirmation.tsx` — Remove `strict: false`, use typed search (if applicable)

## Acceptance Criteria

- [ ] No `strict: false` workarounds in booking components
- [ ] Components properly receive search params
- [ ] `pnpm check` passes
