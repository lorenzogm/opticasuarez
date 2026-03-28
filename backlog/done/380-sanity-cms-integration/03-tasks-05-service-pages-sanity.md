# Task 05 — All 8 service pages → Sanity

## Goal
Update all 8 service page routes to fetch from Sanity using a single flexible `servicePage` document type.

## Service Pages
1. `/examen-visual` — examen-visual.json
2. `/contactologia` — contactologia.json
3. `/control-de-miopia` — control-de-miopia.json
4. `/vision-pediatrica` — vision-pediatrica.json
5. `/terapia-visual` — terapia-visual.json
6. `/vision-deportiva` — vision-deportiva.json
7. `/ortoqueratologia` — ortoqueratologia.json
8. (Plan VEO is separate — Task 06)

## Steps

1. For each service route file (`routes/<service>.tsx`):
   - Add `loader()` calling `getServicePage(slug)` from `~/lib/sanity`
   - SEO meta from Sanity `seo` fields
   - Pass data to page component

2. For each page component (`pages/<service>/<service>.tsx`):
   - Remove JSON import
   - Accept Sanity data as props via `useLoaderData()`
   - Update image sources to Sanity CDN URLs

3. Consider creating a shared service page template component since all services follow the same pattern (hero, intro, items, process, FAQ, CTA, locations)

## Acceptance Criteria
- [ ] All 7 service pages render identically from Sanity data
- [ ] No JSON imports in any service page files
- [ ] `pnpm check` passes
