# QA Plan — Gap Coverage Implementation

**Date**: 2026-03-31

## Work Items

### 1. Plan VEO page tests (High priority) — NEW journey
- Create `test-cases/plan-veo.md` with TC-PVEO-01 through TC-PVEO-03
- Create `tests/plan-veo.spec.ts`
- Expected: tests will FAIL (page returns 404), create bug ticket

### 2. Service page content depth (Medium priority) — UPDATE existing
- Update `test-cases/service-discovery.md` with TC-SERV-04 through TC-SERV-06
- Update `tests/service-discovery.spec.ts` to add deeper content checks
- Add vision-deportiva to SSR test list

### 3. Contacto page depth (Medium priority) — UPDATE existing
- Update `test-cases/about-contact.md` with TC-ABOUT-04 through TC-ABOUT-05
- Update `tests/about-contact.spec.ts` to verify stores and form fields

### 4. Blog category filters (Low priority) — UPDATE existing
- Update `test-cases/blog-engagement.md` with TC-BLOG-04
- Update `tests/blog-engagement.spec.ts` to test filter tabs

### 5. SEO for service pages (Low priority) — UPDATE existing
- Update `test-cases/seo-metadata.md` with TC-SEO-05
- Update `tests/seo-metadata.spec.ts` to check service page meta tags

## Task Order
1. Plan VEO (new journey file)
2. Service Discovery updates
3. About & Contact updates
4. Blog updates
5. SEO updates
