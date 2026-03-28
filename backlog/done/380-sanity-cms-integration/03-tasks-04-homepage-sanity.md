# Task 04 — Homepage route → Sanity

## Goal
Update the homepage route and page component to fetch data from Sanity instead of importing `homepage.json`.

## Steps

1. Update `routes/index.tsx`:
   - Add `loader()` that calls `getHomepage()` from `~/lib/sanity`
   - SEO meta tags populated from Sanity `seo` fields
   - Pass loaded data to Homepage component via `useLoaderData()`

2. Update `pages/homepage/homepage.tsx`:
   - Remove `import content from "../../content/homepage.json" with { type: "json" }`
   - Accept props from loader data instead
   - Update all section components to receive Sanity data shape
   - Image `src` values now point to Sanity CDN URLs

3. Update homepage section components to handle Sanity image URLs (Sanity image references → URL via client)

## Acceptance Criteria
- [ ] Homepage renders identically from Sanity data
- [ ] No JSON import in homepage files
- [ ] `pnpm check` passes
- [ ] `pnpm build` succeeds with prerendering
