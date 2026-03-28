# Bug: Non-existent routes return 500 instead of 404

## Description
When navigating to a URL that doesn't correspond to any page in Sanity CMS or any
file-based route, the app returns a 500 Internal Server Error instead of a proper
404 "Page not found" page.

## Reproduction Steps
1. Navigate to https://opticasuarez-web-dev.vercel.app/this-page-does-not-exist
2. Observe: Page shows "500: INTERNAL_SERVER_ERROR"

Also affects:
- https://opticasuarez-web-dev.vercel.app/vision-deportiva (500)
- https://opticasuarez-web-dev.vercel.app/servicios/plan-veo (500)

## Expected Behavior
The app should show a user-friendly 404 page with:
- "Página no encontrada" heading
- A "Volver al inicio" link back to the homepage
- HTTP 404 status code (not 500)

## Evidence
- **Failing tests**: `apps/web-e2e/tests/error-handling.spec.ts`
  - "non-existent route shows 404 page, not 500"
  - "404 page has link back to homepage"
- **Verified via agent-browser**: `agent-browser open <url>` returns title "500: INTERNAL_SERVER_ERROR"

## Root Cause (likely)
The catch-all route (`apps/web/src/routes/$.tsx`) loader fetches the page from Sanity.
When Sanity returns null/undefined (page not found), the error handling likely throws
an unhandled exception instead of returning a proper 404 response.

## Environment
- App: apps/web (TanStack Start)
- Route: `apps/web/src/routes/$.tsx`
- Server function: `apps/web/src/lib/server-fns.ts` → `fetchPage`
- Deployed URL: https://opticasuarez-web-dev.vercel.app

## Priority
Critical — affects user experience and SEO (search engines penalize 500 errors)

## Labels
bug, qa-discovered
