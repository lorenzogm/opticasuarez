# Bug: 404 page causes React hydration mismatch errors

## Description
The 404 error page at any non-existent route triggers React hydration mismatch errors.
The server-rendered HTML does not match what React renders on the client, causing the
entire root to switch to client rendering.

## Reproduction Steps
1. Navigate to any non-existent URL (e.g., http://localhost:3000/this-page-does-not-exist)
2. Open browser DevTools console
3. Observe hydration mismatch errors

## Expected Behavior
The 404 page should render without any JavaScript errors. It should show "Página no
encontrada" with a "Volver al inicio" link and zero hydration mismatches.

## Actual Behavior
The page renders visually correct ("Página no encontrada" + "Volver al inicio") but
throws multiple hydration mismatch errors:
- "Hydration failed because the initial UI does not match what was rendered on the server." (×18)
- "There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."

## Failing Tests
- **File**: `apps/web-e2e/tests/error-resilience.spec.ts`
- **Test 1**: `non-existent route shows 404 page, not 500` (TC-ERR-01)
- **Test 2**: `404 page recovery to homepage` (TC-ERR-02)

## Error Output
```
Error: Uncaught JavaScript errors detected during test

expect(received).toEqual(expected) // deep equality

- Expected: Array []
+ Received: Array [
+   "Hydration failed because the initial UI does not match what was rendered on the server.",
+   (×18 repetitions)
+   "There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.",
+ ]

   at fixtures.ts:15
```

## Related
- `backlog/000-500-on-missing-pages/` — original ticket about 500 errors on missing pages
- The catch-all route `apps/web/src/routes/$.tsx` handles non-existent pages

## Priority
Critical — hydration errors indicate SSR/CSR mismatch which can cause client-side
navigation failures and degraded user experience.
