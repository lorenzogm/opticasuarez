## Description

The homepage currently fetches products from Sanity (featured products + all products) alongside the homepage content. This adds unnecessary complexity and load to the homepage. Products should only appear on the dedicated `/tienda` shop pages.

Remove the product fetching and product section from the homepage loader and component. The homepage should be purely informational: hero, services, video, specialists, news, locations, partners, testimonials, CTA, and contact sections.

## Acceptance Criteria

- [ ] The homepage loader no longer fetches `getFeaturedProducts()` or `getProducts()` from Sanity
- [ ] The homepage component no longer renders any product section or product cards
- [ ] The homepage loads faster due to fewer Sanity queries
- [ ] The `/tienda` routes continue to work and display products as before
- [ ] No TypeScript errors or broken imports after removing product code from homepage

## Technical Context

### Relevant Existing Code
- `apps/web/src/lib/server-fns.ts` — `fetchHomepageData()` currently calls `Promise.all([getHomepage(), getFeaturedProducts(), getProducts()])` and returns products alongside homepage content; remove the product calls
- `apps/web/src/routes/index.tsx` — Homepage route; uses the loader data including products; remove product-related rendering
- `apps/web/src/lib/sanity.ts` — `getFeaturedProducts()` and `getProducts()` queries; these stay (used by `/tienda`) but are removed from the homepage flow

### Patterns to Follow
- Keep the existing component structure; just remove the product-related parts
- Ensure the TypeScript types are updated if the loader return type changes

### Data & API
- `fetchHomepageData()` server function return type will shrink (no `products` field)
- `getHomepage()` query remains unchanged

## Scope

### In Scope
- Remove product fetching from `fetchHomepageData()` server function
- Remove product section rendering from the homepage component
- Update TypeScript types as needed

### Out of Scope
- Changes to `/tienda` routes (products stay there)
- Changes to Sanity schemas
- Removing the product Sanity queries themselves (they're still used by tienda)

## Priority

Medium — Small cleanup that simplifies the homepage and reduces build-time Sanity API calls.

## Type

chore

## Notes

- This is a small, focused change — likely a few lines in `server-fns.ts` and the homepage route
- Check if any homepage section components reference products and clean those up too

## Related Stories

- #408 Static pre-rendering at build time — fewer queries on the homepage means faster static builds
- #409 On-demand revalidation via Sanity webhook — homepage revalidation mapping no longer needs product triggers
- #410 Sanity Presentation tool (live preview) — independent
- #411 Rebuild Site button in Sanity Studio — independent
