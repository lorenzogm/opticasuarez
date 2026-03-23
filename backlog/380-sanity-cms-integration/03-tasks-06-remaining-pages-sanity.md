# Task 06 — About + Contact + Services overview + Plan VEO → Sanity

## Goal
Update the remaining non-service singleton pages to fetch from Sanity.

## Pages
1. `/quienes-somos` — aboutPage singleton
2. `/contacto` — contactPage singleton
3. `/servicios` — serviciosOverview singleton
4. `/planveo` — planVeoPage singleton

## Steps

1. Update each route file:
   - Add `loader()` calling the corresponding Sanity query
   - SEO meta from Sanity fields

2. Update each page component:
   - Remove JSON import
   - Accept Sanity data via props/loader
   - Update image sources

3. About page: team members come from `teamMember` document references
4. Contact page: locations come from `location` document references
5. Services overview: service list comes from `servicePage` document references

## Acceptance Criteria
- [ ] All 4 pages render identically from Sanity data
- [ ] No JSON imports remaining
- [ ] `pnpm check` passes
