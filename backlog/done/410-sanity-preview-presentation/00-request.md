## Description

Content editors need the ability to preview draft (unpublished) changes in Sanity before publishing them to the live site. This story adds the **Sanity Presentation tool** — an iframe-based live preview inside Sanity Studio where editors see the website update in real-time as they edit content.

The web app already has the infrastructure for preview mode: all `sanityFetch()` calls accept a `preview` parameter that switches from CDN to API URL and adds a Bearer token. This story wires everything together: configuring the Presentation plugin in Sanity Studio, creating a preview route/handler in the web app, and enabling the preview parameter based on a URL flag.

## Acceptance Criteria

- [ ] Sanity Studio includes the Presentation tool plugin with an iframe pointing to the web app's preview URL
- [ ] Editors can open any document in Sanity Studio and see a live preview in an embedded iframe that updates as they type
- [ ] The web app has a preview mode activated by a URL parameter (e.g., `?preview=true`) that causes all Sanity queries to fetch draft content instead of published content
- [ ] Preview mode uses the Sanity API URL (not CDN) with a Bearer token (`SANITY_API_TOKEN`) to access draft documents
- [ ] Preview mode is only available when the correct token/parameter is present — regular visitors never see draft content
- [ ] `SANITY_API_TOKEN` environment variable is set in Vercel (via Vercel CLI) with a read-only Sanity API token
- [ ] A visual indicator (banner or badge) shows in the web app when preview mode is active, so editors know they're seeing draft content

## Technical Context

### Relevant Existing Code
- `apps/web/src/lib/sanity.ts` — `sanityFetch()` already accepts `preview = false` parameter; when `true`, it uses `SANITY_API_URL` instead of CDN and adds `Authorization: Bearer ${process.env.SANITY_API_TOKEN}` header
- `apps/web/src/lib/server-fns.ts` — Server functions (`fetchHomepageData`, `fetchBlogPosts`, etc.) currently hardcode `preview = false`; need to accept and forward preview flag
- `apps/web/src/routes/__root.tsx` — Root layout; good place to read the preview query param and pass it down via context
- `apps/sanity-studio/sanity.config.ts` — Studio config; currently has `structureTool()` and `visionTool()` plugins; needs `presentationTool()` added
- `apps/sanity-studio/package.json` — Will need `@sanity/presentation` dependency
- `.env.example` in `apps/web/` — Already has `SANITY_API_TOKEN=` placeholder

### Patterns to Follow
- Sanity Presentation plugin: `presentationTool({ previewUrl: '...' })` in `sanity.config.ts`
- TanStack Start search params for preview flag
- React context or loader data for propagating preview state to all routes

### Data & API
- Sanity API token: read-only token from sanity.io/manage → API → Tokens
- Sanity project ID: `2a24wmex`, dataset: `production`
- Preview URL pattern: `{BASE_URL}?preview=true` (or a dedicated `/preview` path)

## Scope

### In Scope
- Install and configure `@sanity/presentation` plugin in Sanity Studio
- Create preview mode handler in the web app (read URL param, set preview context)
- Pass `preview=true` through server functions to `sanityFetch()`
- Add visual preview indicator (banner)
- Add `SANITY_API_TOKEN` to Vercel environment variables

### Out of Scope
- Static pre-rendering (Story #408)
- On-demand revalidation (Story #409)
- Rebuild button (Story #411)
- Real-time collaboration features
- Draft access control beyond URL parameter + token

## Priority

High — This was explicitly called out as important by the product owner. Editors need to preview content before publishing.

## Type

feature

## Notes

- The Sanity Presentation tool requires the web app to respond to messages from the Sanity Studio iframe for real-time updates. Check `@sanity/preview-kit` or `@sanity/client` for the `createClient({ useCdn: false, token, perspective: 'previewDrafts' })` pattern
- In static mode (#408), preview requests should bypass the static cache and render server-side with draft content — this may require a separate Nitro route rule for preview URLs
- Consider using `@sanity/visual-editing` for click-to-edit overlays in the preview iframe (stretch goal, not required)
- The preview token should NEVER be exposed to the client bundle — all preview fetches must happen server-side via server functions

## Related Stories

- #408 Static pre-rendering at build time — preview mode needs to bypass static cache
- #409 On-demand revalidation via Sanity webhook — revalidation is for published content; preview is for draft content
- #411 Rebuild Site button in Sanity Studio — independent
- #412 Remove products from homepage — independent
