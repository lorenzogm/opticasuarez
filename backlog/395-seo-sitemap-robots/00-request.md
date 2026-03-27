# SEO: Add sitemap.xml and robots.txt routes querying Sanity

**Issue**: #395
**Priority**: High (SEO critical)

## Summary
Create dynamic `/sitemap.xml` and `/robots.txt` server routes in the TanStack Start app
that query Sanity for blog posts, generating a complete sitemap. Replace the current
build-time static generation with runtime server routes.

## Acceptance Criteria
- sitemap.xml route returning valid XML with all static pages + dynamic blog posts
- robots.txt route returning plain text with sitemap reference
- Proper Content-Type and Cache-Control headers
- All `pnpm check` validations pass
