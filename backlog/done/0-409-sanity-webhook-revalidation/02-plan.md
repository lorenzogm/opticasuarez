# Plan: On-demand Revalidation via Sanity Webhook

## Files to Create

| File | Purpose |
|------|---------|
| `apps/web/server/routes/api/revalidate.post.ts` | POST-only Nitro route for webhook handling |

## Files to Modify

| File | Change |
|------|--------|
| `apps/web/vite.config.ts` | Add `/api/**` route rule with `swr: false` |

## Implementation Steps

### Task 1: Create revalidation endpoint

Create `apps/web/server/routes/api/revalidate.post.ts`:
1. Import h3 utilities + Node.js `crypto`
2. Implement HMAC-SHA256 signature verification (timing-safe)
3. Parse webhook payload and extract `_type`, `slug`, `path`
4. Map document type to affected URL paths
5. Call Vercel Deploy Hook URL via POST
6. Return JSON with affected paths and deploy status

### Task 2: Add route rule

In `apps/web/vite.config.ts`, add `/api/**` to route rules with `swr: false` to ensure the revalidation endpoint is never cached.

### Task 3: Documentation

Add setup instructions as comments in the endpoint file:
- How to create Vercel Deploy Hook
- How to configure Sanity webhook
- Required env vars
