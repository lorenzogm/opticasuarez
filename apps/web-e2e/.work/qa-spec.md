# QA Spec — Site Map and Testing Scope

**Date**: 2026-03-28

## Site Map

| URL | Title | Purpose | Status |
|-----|-------|---------|--------|
| `/` | Óptica en Jaén \| Óptica Suárez | Homepage: hero carousel, 6 service cards, video, locations, CTA | Working |
| `/quienes-somos` | Quiénes Somos \| Óptica Suárez | About: history timeline, team section, reviews | Working |
| `/contacto` | Contacto \| Óptica Suárez | Contact: 2 store locations with map links | Working |
| `/blog` | Blog de Salud Visual | Blog list: 14 articles, category filters | Working |
| `/blog/{slug}` | (varies) | Blog article detail | Working |
| `/cita` | Reservar Cita | Appointment booking: 6 types, multi-step flow | Working |
| `/tienda` | Tienda Online | Shop: feature-flagged, currently broken with JS errors | Broken |
| `/{page}` | (varies) | Dynamic pages via Sanity page builder (catch-all route) | Working |
| Non-existent | Página no encontrada | 404 page: friendly message + "Volver al inicio" link | Hydration errors |

## Existing Test Coverage

32 test cases across 8 journeys, 31/33 Playwright tests pass (Chromium).

| Journey | Test Cases | Spec File | Status |
|---------|-----------|-----------|--------|
| Landing (homepage) | 7 | landing.spec.ts | All PASS |
| Site Navigation | 7 | site-navigation.spec.ts | All PASS |
| About & Contact | 3 | about-contact.spec.ts | All PASS |
| Blog Engagement | 3 | blog-engagement.spec.ts | All PASS |
| Service Discovery | 3 | service-discovery.spec.ts | All PASS |
| Error Resilience | 2 | error-resilience.spec.ts | 2 FAIL (hydration) |
| SEO Metadata | 4 | seo-metadata.spec.ts | All PASS |
| Appointment Booking | 2 | appointment-booking.spec.ts | All PASS |

## Known Issues

1. **404 page hydration errors** — SSR/CSR mismatch causes React hydration failures.
   Tests catch this via the auto JS error fixture. Bug already tracked: backlog/000-500-on-missing-pages/
2. **Tienda broken** — /tienda page renders error overlay. Feature-flagged, not tested.

## Gaps Identified

- No new uncovered user journeys — existing 8 journeys cover all functional pages.
- Test case documentation for some journeys references stale service routes (e.g., /servicios/examen-visual) but tests pass because pages are served via the catch-all page builder.
- Appointment booking test cases exist but only test steps 1-2 of the 5-step flow.
