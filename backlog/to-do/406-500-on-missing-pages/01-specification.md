# Specification: Fix 500 errors on missing pages (#406)

## Overview
Non-existent routes return HTTP 500 instead of 404 because the catch-all route's loader
throws `notFound()` but errors during SSR are not properly handled — there is no
`errorComponent` on the catch-all route and no `defaultErrorComponent` on the router.

## Functional Requirements
1. Non-existent URLs must return HTTP 404 (not 500)
2. A user-friendly "Página no encontrada" page must render
3. A "Volver al inicio" link must be present and functional
4. Client-side navigation to non-existent routes must also show the 404 page

## Non-functional Requirements
- No hydration mismatch errors (relates to #405)
- SEO: proper 404 status code for search engine crawlers

## Root Cause
The catch-all route `apps/web/src/routes/$.tsx` throws `notFound()` when a page
isn't found in Sanity. During SSR, if the server function or `notFound()` propagation
fails, there's no error boundary to catch it — resulting in a 500. Additionally,
network errors from the Sanity fetch could throw unhandled exceptions.

## Integration Points
- `apps/web/src/routes/$.tsx` — catch-all route (main fix)
- `apps/web/src/routes/__root.tsx` — already has `notFoundComponent`
- `apps/web/src/router.tsx` — router config (add defaultErrorComponent)
- `apps/web/src/lib/server-fns.ts` — fetchPage server function

## Success Criteria
- ✅ `GET /this-page-does-not-exist` returns HTTP 404
- ✅ Page shows "Página no encontrada" with "Volver al inicio" link
- ✅ No hydration errors in console
- ✅ E2E tests TC-ERR-01 and TC-ERR-02 pass
- ✅ `pnpm check` passes
