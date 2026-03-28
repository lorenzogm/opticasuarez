# Task 01 — Bootstrap Sanity Studio + schema definitions

## Goal
Create a new Sanity project, set up Sanity Studio at `apps/sanity-studio/`, and define all document and object schemas.

## Steps

1. Run `npm create sanity@latest` to create the Sanity project under org "opticasuarez"
   - Project name: "opticasuarez"
   - Dataset: "production"
   - Output directory: `apps/sanity-studio/`
   - Template: clean (no template)

2. Define **object schemas** in `schemas/objects/`:
   - `seo.ts` — title, description, keywords, ogImage, canonicalUrl, robots
   - `hero-block.ts` — title, subtitle, description, ctaText, ctaUrl, image
   - `process-step.ts` — stepNumber, title, description, image
   - `faq-item.ts` — question, answer
   - `book-appointment-block.ts` — title, description, buttonText, whatsappMessage
   - `social-media-link.ts` — platform, title, handle, url
   - `testimonial-item.ts` — name, text, rating
   - `service-grid-item.ts` — title, description, url, image, alt, imageTitle
   - `schedule.ts` — weekdays, weekdaysHours, saturday, saturdayHours

3. Define **document schemas** in `schemas/documents/`:
   - `site-settings.ts` (singleton) — social links, phone, email, whatsapp, nav
   - `location.ts` — name, image, address, schedule, phone, email, mapUrl, whatsappUrl
   - `team-member.ts` — name, role, image, details[]
   - `homepage.ts` (singleton) — hero, servicesGrid, videoAbout, socialMedia, specialists, news, locations refs, partners, services, about, brands, testimonials, bookAppointment, contact, seo
   - `service-page.ts` — slug, mainTitle, subtitle, heroImage, intro, items[], process, benefits, frequency (optional), faq, cta, locations refs, seo
   - `blog-post.ts` — title, slug, date, excerpt, author, categories[], featuredImage, body (Portable Text), seo
   - `about-page.ts` (singleton) — mainTitle, history timeline, team refs, testimonials, locations, socialMedia, seo
   - `contact-page.ts` (singleton) — hero, contactInfo, locations refs, contactForm, socialMedia, seo
   - `servicios-overview.ts` (singleton) — title, description, services refs, seo
   - `plan-veo-page.ts` (singleton) — hero, introduction, benefits, requirements, howItWorks, faq, cta, seo

4. Register all schemas in `schemas/index.ts`
5. Configure `sanity.config.ts` with singleton document support (structure builder)
6. Add `apps/sanity-studio/` to pnpm workspace

## Acceptance Criteria
- [ ] `cd apps/sanity-studio && npx sanity build` succeeds
- [ ] All document types appear in Sanity Studio
- [ ] Singleton documents show as single-instance in structure
- [ ] Field display titles are in Spanish
