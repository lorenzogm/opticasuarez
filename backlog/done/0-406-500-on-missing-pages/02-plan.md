# Plan: Fix 500 errors on missing pages (#406)

## Technical Approach

### 1. Add error handling to the catch-all route (`apps/web/src/routes/$.tsx`)
- Wrap `fetchPage` call in try/catch to handle network errors gracefully
- Add `errorComponent` to the route for SSR error boundary
- Ensure `notFound()` is thrown correctly

### 2. Add `defaultErrorComponent` to the router (`apps/web/src/router.tsx`)
- Provide a fallback error component for any unhandled route errors

### 3. Harden the server function (`apps/web/src/lib/server-fns.ts`)
- Catch Sanity fetch errors in `fetchPage` and return `{ page: null }` instead of throwing

### TDD Plan
- Write tests that verify 404 page rendering when page data is null
- Verify error component renders for unexpected errors
- Run E2E tests to validate end-to-end behavior

## Files to Modify
1. `apps/web/src/routes/$.tsx` — add error handling + errorComponent
2. `apps/web/src/router.tsx` — add defaultErrorComponent
3. `apps/web/src/lib/server-fns.ts` — harden fetchPage error handling
4. `apps/web-e2e/tests/error-resilience.spec.ts` — remove .fixme() skip
