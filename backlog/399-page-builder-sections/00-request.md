# Issue #399 — Page builder: add new section types and card variants

## Description

The generic page builder (`page` document in Sanity) currently supports 8 section types: hero, cards, features, text, accordion, teaser, testimonials, and timeline. To enable migrating dedicated pages (quiénes somos, plan VEO, contacto, services) to the page builder, we need additional section types and a new card variant.

All new section types must follow the existing pattern: a Sanity schema in `schemas/sections/`, a React component in `components/sections/`, registered in both the `page` document `sections` array and the `SectionRenderer` component, plus the corresponding GROQ fields in `sectionProjection`.

## Acceptance Criteria

- [ ] Card variant `profile`: centered layout with image (portrait, h-80), name heading, subtitle/role in accent color, detail strings
- [ ] sectionSocialMedia: icon + title + handle with external link, 2-column grid
- [ ] sectionLocations: Image + location name + map link button, 2-column grid
- [ ] sectionProcessSteps: Numbered steps with title + description + optional image, vertical stepper
- [ ] sectionCTA: Call-to-action with title, description, button text + URL
- [ ] All new sections registered in SectionRenderer, page document sections array, and sectionProjection GROQ
