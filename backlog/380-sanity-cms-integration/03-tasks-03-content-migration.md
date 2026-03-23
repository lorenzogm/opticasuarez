# Task 03 — Content backup + migration script

## Goal
Back up all existing content to `/content/` at repo root. Write a Node.js migration script that reads all JSON files, blog Markdown, and images, then uploads/creates them in Sanity.

## Steps

1. Create `/content/` directory at repo root:
   - Copy `apps/web/src/content/*.json` → `/content/json/`
   - Copy `apps/web/src/content/blog/*.md` → `/content/blog/`
   - Copy `apps/web/public/images/` → `/content/images/`

2. Create `scripts/migrate-to-sanity.ts`:
   - Read each JSON file, create corresponding Sanity documents
   - Upload all referenced images to Sanity CDN, replace local paths with asset references
   - Parse blog Markdown with gray-matter, convert body to Portable Text (Sanity block format)
   - Create location documents first (referenced by multiple pages)
   - Create team member documents (referenced by about page)
   - Create singleton documents (homepage, about, contact, servicios, plan-veo, site-settings)
   - Create service page documents (8 services)
   - Create blog post documents (12 posts)
   - Log progress and errors

3. Add script to `package.json`: `"migrate": "tsx scripts/migrate-to-sanity.ts"`

## Acceptance Criteria
- [ ] `/content/` directory contains complete backup of all original content
- [ ] Migration script runs without errors
- [ ] All documents visible in Sanity Studio
- [ ] All images served from Sanity CDN
