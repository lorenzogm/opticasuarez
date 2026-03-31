## Description

After the site is statically pre-rendered (#408), content editors need a way to update the live site without triggering a full rebuild. When a document is published in Sanity CMS, a webhook should notify the web app to revalidate the affected page(s) so that fresh static HTML is generated on-demand.

This implements **on-demand revalidation** via a Sanity webhook that calls an API endpoint on the Vercel deployment. The endpoint determines which pages are affected by the document change and triggers revalidation for those specific URLs. For shared content like site settings (navigation, footer), all pages should be revalidated.

## Acceptance Criteria

- [ ] A Nitro server route `/api/revalidate` exists that accepts POST requests from Sanity webhooks
- [ ] The webhook payload is verified using a shared secret (`SANITY_WEBHOOK_SECRET` environment variable)
- [ ] When a `blogPost` is published/updated, both `/blog` (listing) and `/blog/<slug>` are revalidated
- [ ] When a `page` document is published/updated, the corresponding catch-all URL path is revalidated
- [ ] When a `homepage` document is published/updated, `/` is revalidated
- [ ] When `siteSettings` is published/updated, all pages are revalidated (since layout is shared)
- [ ] When a `product`, `productCategory`, or `brand` is updated, `/tienda` and the relevant product page are revalidated
- [ ] When a `service` or `location` document is updated, the homepage and relevant pages are revalidated
- [ ] Invalid or unsigned webhook requests are rejected with 401
- [ ] The Sanity webhook is configured in Sanity's management dashboard (sanity.io/manage) to fire on document publish events
- [ ] `SANITY_WEBHOOK_SECRET` is added as an environment variable in Vercel (via Vercel CLI)

## Technical Context

### Relevant Existing Code
- `apps/web/server/routes/` — Existing Nitro server routes (`robots.txt.ts`, `sitemap.xml.ts`); the revalidation endpoint follows the same pattern
- `apps/web/src/lib/sanity.ts` — Sanity project config and GROQ queries; useful for understanding document types and their URL mappings
- `apps/web/vite.config.ts` — Nitro configuration; route rules for the revalidation endpoint should disable SWR caching
- `infra/vercel/src/main.tf` — Vercel project and environment variables via Terraform

### Patterns to Follow
- Nitro `defineEventHandler` pattern for server routes (see existing `sitemap.xml.ts`)
- Vercel's on-demand ISR revalidation API (`res.revalidate(path)`) or Nitro's cache invalidation mechanism
- Sanity webhook payload structure: `{ _type, _id, slug, ... }` with HMAC signature header

### Data & API
- Sanity webhook sends `POST` with JSON body containing the published document's `_type`, `_id`, and relevant fields
- Sanity includes `x-sanity-webhook-signature` header for HMAC verification
- Document type → URL mapping:
  - `homepage` → `/`
  - `blogPost` → `/blog` + `/blog/{slug}`
  - `page` → `/{path}` (from page's `path` field)
  - `product` → `/tienda` + `/tienda/{slug}`
  - `siteSettings` → all pages (full revalidation)
  - `service` → `/` (homepage services section)
  - `location` → `/` (homepage locations section)

## Scope

### In Scope
- Creating the `/api/revalidate` Nitro server route
- Webhook signature verification
- Document-type-aware page revalidation logic
- Configuring the Sanity webhook in sanity.io/manage (document the steps)
- Adding `SANITY_WEBHOOK_SECRET` to Vercel via CLI

### Out of Scope
- Static pre-rendering setup (Story #408 — prerequisite)
- Sanity preview/draft mode (Story #410)
- Full rebuild trigger from Sanity Studio (Story #411)

## Priority

High — This is the second piece of the static site initiative, directly following #408. Without it, content updates require a full rebuild.

## Type

feature

## Notes

- This story depends on #408 (static pre-rendering) being completed first — on-demand revalidation only makes sense once pages are statically generated
- Vercel's ISR revalidation works by accepting a request to a specific path and regenerating the static page in the background
- Consider using Vercel's `/__revalidate` mechanism or `@vercel/functions` for ISR if using Vercel's native static adapter
- The webhook should be idempotent — receiving the same event twice should not cause issues
- For `siteSettings` changes, revalidating all pages could be expensive; consider whether Vercel supports bulk revalidation or if we need to enumerate all known paths

## Related Stories

- #408 Static pre-rendering at build time — prerequisite; provides the static output that this story revalidates
- #410 Sanity Presentation tool (live preview) — independent; preview is for drafts, revalidation is for published content
- #411 Rebuild Site button in Sanity Studio — complementary; button triggers full rebuild, webhook triggers per-page revalidation
- #412 Remove products from homepage — independent
