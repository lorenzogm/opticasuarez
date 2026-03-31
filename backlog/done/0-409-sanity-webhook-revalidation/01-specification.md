# Specification: On-demand Revalidation via Sanity Webhook

## Overview

Create a Nitro server route at `/api/revalidate` that receives Sanity webhook POST requests when documents are published, verifies the request signature, maps the document type to affected URL paths, and triggers a Vercel deployment to regenerate static pages with fresh content.

## Technical Decision: Deploy Hook vs ISR

TanStack Start's prerendered HTML is embedded in the Nitro server bundle (not served as separate static files). True per-page ISR is not supported with this stack (`framework: null` on Vercel). The practical approach is:

1. Webhook receives Sanity publish event
2. Verifies HMAC signature
3. Maps document type to affected URLs (for logging and future ISR upgrade)
4. Triggers Vercel Deploy Hook (full rebuild with fresh Sanity content)

This achieves the same end result: all affected pages get fresh content. The URL mapping logic is preserved for a future upgrade to per-page ISR if TanStack Start adds support.

## Functional Requirements

1. POST `/api/revalidate` accepts Sanity webhook payloads
2. Signature verification using HMAC-SHA256 (`SANITY_WEBHOOK_SECRET`)
3. Document type → URL mapping:
   - `homepage` → `/`
   - `blogPost` → `/blog`, `/blog/{slug}`
   - `page` → `/{path}`
   - `product` → `/tienda`, `/tienda/{slug}`
   - `productCategory`, `brand` → `/tienda`
   - `service`, `location` → `/`
   - `siteSettings` → all pages
4. Trigger Vercel deploy via `VERCEL_DEPLOY_HOOK_URL`
5. Return JSON response with affected paths and status

## Non-Functional Requirements

- Reject non-POST methods (use Nitro method-specific handler)
- Reject unsigned/invalid requests with 401
- Return 500 if env vars are missing (fail closed)
- Timing-safe signature comparison to prevent timing attacks
- No external dependencies (use Node.js built-in `crypto`)

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `SANITY_WEBHOOK_SECRET` | Shared secret for HMAC-SHA256 signature verification |
| `VERCEL_DEPLOY_HOOK_URL` | Vercel Deploy Hook URL to trigger rebuilds |

## Success Criteria

- Sanity webhook fires on document publish → endpoint receives POST
- Invalid signatures → 401 response
- Valid signatures → Vercel deploy triggered → fresh content after rebuild
- All quality gates pass (`pnpm check`)
