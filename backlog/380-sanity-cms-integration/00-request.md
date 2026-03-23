# [380] Integrate Sanity CMS: migrate content from repo and connect to TanStack Start app

**Source**: GitHub Issue #380
**Priority**: Low
**Labels**: feature

## Summary

Integrate Sanity as the headless CMS for the opticasuarez project. All existing content currently stored as JSON files and Markdown blog posts in the repository must be migrated into Sanity. The TanStack Start web application (`apps/web/`) must be updated to fetch content from Sanity at build time instead of importing local JSON/Markdown files. A Sanity Studio must be set up at `apps/sanity-studio/` so non-technical users can edit content directly.

## Key Decisions (from user)

1. Create a new Sanity project from scratch, org = "opticasuarez"
2. Environment variables will be obtained after project creation
3. Keep all content as backup in `/content`, then set up schemas + studio first, then run migration script
4. Task breakdown approved (9 tasks)
5. Deploy Sanity Studio to Sanity's hosted studio (`sanity deploy`)
6. Schema field names in English, display `title` labels in Spanish for editors
