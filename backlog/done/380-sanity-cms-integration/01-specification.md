# Specification: Sanity CMS Integration (#380)

## Overview

Replace all static JSON/Markdown content in the opticasuarez web app with Sanity CMS. Set up a Sanity Studio at `apps/sanity-studio/`, design schemas for all document types, migrate all existing content (14 JSON files, 12 blog posts, ~100+ images), and update all 22 TanStack Start routes to fetch from Sanity via GROQ at build time.

## Functional Requirements

### Sanity Studio (`apps/sanity-studio/`)
- New Sanity project under org "opticasuarez", dataset "production"
- Studio deployable via `sanity deploy`
- All schema field names in English, display titles in Spanish for editors
- Document types covering all content: homepage, service pages, blog, about, contact, settings

### Content Migration
- Migration script uploads all images to Sanity CDN and creates all documents
- Original content preserved in repo root `/content/` directory as backup
- All 14 JSON files, 12 blog posts, and images migrated

### Web App Changes (`apps/web/`)
- All routes fetch from Sanity via GROQ in `loader()` functions (server-side, build-time)
- `@sanity/client` added as dependency; `gray-matter` and `fs` blog reads removed
- Sitemap generation queries Sanity instead of reading filesystem
- Preview/draft mode for editors via Sanity perspective

### Schema Design

**Singleton documents:**
- `siteSettings` — social links, phone, email, WhatsApp, nav items
- `homepage` — composable blocks: hero, services grid, video, social media, specialists, news, locations, book appointment, partners, about, brands, testimonials, contact
- `aboutPage` — history timeline, team members (references), testimonials, locations, social media
- `contactPage` — hero, contact info, locations, form config, social media
- `serviciosOverview` — title, description, service references
- `planVeoPage` — specific PlanVEO content (hero, intro, benefits, requirements, howItWorks, FAQ, CTA)

**Collection documents:**
- `servicePage` — flexible service page: hero, intro, items list, process steps, FAQ, CTA, locations
- `blogPost` — title, slug, date, excerpt, author, categories, featured image, body (Portable Text)
- `teamMember` — name, role, image, qualifications/details
- `location` — name, image, address, schedule, phone, email, map URL (referenced by multiple pages)

**Reusable objects:**
- `seo` — title, description, keywords, OG image, canonical URL, robots
- `heroBlock` — title, subtitle, description, CTA text, CTA URL, image
- `processStep` — step number, title, description, image
- `faqItem` — question, answer
- `bookAppointmentBlock` — title, description, button text, WhatsApp message
- `locationReference` — reference to location document
- `socialMediaLink` — platform, title, handle, url
- `testimonialItem` — name, text/review, rating
- `serviceGridItem` — title, description, url, image, alt, imageTitle

## Non-Functional Requirements

- Build time: all GROQ queries run server-side during prerendering
- Images served from Sanity CDN with optimization
- No client-side fetching (all data at build time)
- Preview mode: draft-aware client when preview param/cookie is present

## Out of Scope
- Booking flow (`/cita/*`) — stays hardcoded
- JSON-LD structured data — stays in code
- UI component design changes
- Server routes (robots.txt, og-image.jpg)
