# QA Gap Analysis — opticasuarez

**Date:** 2026-03-30
**Analyst:** QA to Done (custom-qa)
**Scope:** `apps/web/` (TanStack Start), `apps/web-e2e/`, `apps/sanity-studio/` — unit, integration, E2E

---

## Executive Summary

The TanStack Start web app (`apps/web/`) has **zero unit tests** and **zero integration tests**. E2E coverage exists in `apps/web-e2e/` (37 test cases across 9 files) with good journey coverage but gaps in form submission, booking completion, and service page content. The biggest risks are untested business-critical logic: booking validation/sanitization, SEO head generation, Sanity image resolution, email sending, and the section renderer mapping.

---

## Current Test Inventory

| Layer | Files | Test Cases | Status |
|-------|-------|-----------|--------|
| **Unit (Vitest) — web** | 0 | 0 | ❌ Missing entirely |
| **Integration (Vitest) — web** | 0 | 0 | ❌ Missing entirely |
| **E2E — web-e2e** | 9 | 37 | ✅ Good journey coverage |
| **Total** | 9 | 37 | |

### E2E Coverage (web-e2e)

| Domain | Tests | Status |
|--------|-------|--------|
| Homepage (landing, hero, services, locations, CTA) | 7 | ✅ |
| Navigation (desktop, mobile, servicios dropdown) | 7 | ✅ |
| Booking flow (type → center → schedule → contact → confirm) | 8 | ✅ |
| Blog (listing, CSR article, SSR article) | 3 | ✅ |
| About / Contact pages (Quienes Somos, Contacto) | 3 | ✅ |
| SEO metadata (description, OG tags, canonical, unique titles) | 4 | ✅ |
| Service discovery (hero CTA, dropdown nav, SSR service pages) | 3 | ✅ |
| Error handling (404, recovery to home) | 2 | ✅ |
| Contact form submission | 0 | ❌ |
| Booking completion (click "Confirmar cita") | 0 | ❌ |
| Plan VEO page | 0 | ❌ |
| Shop / Tienda pages | 0 | ❌ |
| FAQ accordion interaction | 0 | ❌ |
| Structured data / JSON-LD | 0 | ❌ |

---

## Gap Analysis by Layer

### 🔴 GAP 1: Unit Tests — Zero Coverage in `apps/web/`

No `*.test.ts(x)` files exist. The following modules have testable pure logic:

#### Critical Priority

| Module | Functions / Logic | Why Unit Test? |
|--------|-------------------|----------------|
| `src/lib/sanity.ts` | `sanityImageUrl(ref)`, `resolveImage(image)` — image ref → CDN URL conversion, multi-format handling | Pure functions, multiple input formats (string, object with asset url, object with asset _ref, undefined), critical for all images on site |
| `src/lib/seo.ts` | `buildHeadFromSanitySeo({ seo, path, fallback })` — SEO meta tag assembly, canonical URL, OG tags | Pure function, fallback logic with 6+ fields, directly impacts search ranking |
| `src/lib/utils.ts` | `cn()` — Tailwind class merging; `getBaseUrl()` — env-based URL | Pure functions, trivial to test |
| `src/lib/services.ts` | `servicePages[]` — data integrity for 8 services | Static data, verify no broken URLs, no missing fields, no duplicates |
| `src/actions/send-booking-emails.ts` | `sendBookingEmails()` — appointment type mapping, location lookup, email content, Resend API, graceful fallback | Exported async function, side-effect-heavy, mock Resend, verify email payloads |

#### High Priority

| Module | Functions / Logic | Why Unit Test? |
|--------|-------------------|----------------|
| `src/actions/submit-booking.ts` | Input validator — required field checks, email regex, sanitization (trim + slice) | Security-sensitive input validation, extractable via import |
| `src/actions/submit-product-inquiry.ts` | Input validator — required fields (name, phone), email regex, sanitization | Same pattern, needs coverage |

#### Estimated Effort: ~7 test files, ~55-70 test cases

---

### 🟡 GAP 2: Integration Tests — Zero Coverage

Cross-module flows that should be tested with Vitest + mocks:

| Flow | What to Test | Priority |
|------|-------------|----------|
| **SEO pipeline** | `buildHeadFromSanitySeo` receives Sanity SEO data → produces correct meta array with fallbacks | High |
| **Image resolution chain** | Various Sanity image formats → `resolveImage` → correct CDN URL | High |
| **Email sending pipeline** | `sendBookingEmails` with mocked Resend → verify 2 email payloads sent with correct content | Critical |
| **Product inquiry pipeline** | `submitProductInquiry` handler with mocked Resend → verify conditional confirmation email | Medium |

#### Estimated Effort: ~4 test files, ~20-25 test cases

---

### 🟡 GAP 3: E2E — Missing Feature Coverage in web-e2e

#### Not Covered ❌

| Feature | Impact | What's Missing |
|---------|--------|----------------|
| **Booking completion** | Critical | Tests stop at confirmation page render — never clicks "Confirmar cita" |
| **Contact form submission** | High | Contact page tested for existence but form never submitted |
| **Plan VEO page** | Medium | No test navigates to or verifies `/planveo` |
| **Shop / Tienda** | Medium | No tests for product listing, filtering, or product detail pages |
| **Form validation boundaries** | Medium | Only empty-field errors tested; no boundary testing (phone format, age limits) |
| **FAQ accordion** | Low | Appears on multiple pages but open/close never tested |
| **Mobile booking flow** | Medium | Booking tests only run on desktop viewport |

---

## Risk Assessment

| Risk | Severity | Current Mitigation | Gap |
|------|----------|-------------------|-----|
| Image resolution bugs | 🔴 Critical | None | `resolveImage` handles 4+ formats with zero tests |
| SEO meta tag regression | 🔴 Critical | E2E checks basic OG tags | `buildHeadFromSanitySeo` fallback logic untested |
| Booking validation bypass | 🔴 Critical | E2E empty-field test only | Input sanitization (trim/slice) and email regex untested |
| Email sending failures | 🔴 Critical | None | No tests for email content, API errors, or missing API key |
| Broken section renderer | 🟡 High | Covered via E2E page loads | `sectionComponents` mapping has 14 entries, no unit coverage |
| Service data integrity | 🟡 High | None | 8 services hardcoded with URLs, no validation |
| Product inquiry errors | 🟡 Medium | None | `submitProductInquiry` completely untested |

---

## Vitest Infrastructure Status

- **Root config:** `vitest.config.ts` delegates to `projects: ["apps/*"]`
- **Web app Vitest config:** ❌ Missing — `apps/web/vite.config.ts` has no `test` block
- **Dependencies:** Vitest 4.0.1 at root; `apps/web/` needs `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` as devDependencies
- **Note:** `apps/web/` uses `import.meta.env` and `@tanstack/react-start` — server functions (`createServerFn`) cannot be directly imported in Vitest without mocking the framework

**Setup needed:**
1. Install Vitest + Testing Library in `apps/web/`
2. Add `test` block to `vite.config.ts` (jsdom environment, setup file)
3. For server actions: test the exported validation logic and `sendBookingEmails` directly (bypass `createServerFn` wrapper)

---

## Recommended Action Plan

### Phase 1: Unit Tests (Highest Impact)

1. **Set up Vitest** in `apps/web/` — config, dependencies, setup file
2. **`sanity.test.ts`** — `sanityImageUrl()` and `resolveImage()` with all input variants
3. **`seo.test.ts`** — `buildHeadFromSanitySeo()` with full Sanity data, partial data, and fallback-only
4. **`utils.test.ts`** — `cn()` class merging and `getBaseUrl()` env resolution
5. **`services.test.ts`** — data integrity: no duplicates, all URLs start with `/`, all fields present
6. **`send-booking-emails.test.ts`** — mock Resend, verify payloads, test graceful fallback
7. **`submit-booking.test.ts`** — input validation: required fields, email regex, sanitization limits
8. **`submit-product-inquiry.test.ts`** — input validation and conditional email

### Phase 2: E2E Gaps

9. Add booking completion test to web-e2e
10. Add Plan VEO page test
11. Add contact form submission test

---

## Metrics Summary

| Metric | Current | Target |
|--------|---------|--------|
| Unit test files (web) | 0 | ~7 |
| Unit test cases (web) | 0 | ~65 |
| Integration test files (web) | 0 | ~4 |
| Integration test cases (web) | 0 | ~22 |
| E2E test files (web-e2e) | 9 | ~12 |
| E2E test cases (web-e2e) | 37 | ~50 |
| Total test cases | 37 | ~137 |
| Image resolution coverage | 0% | 100% |
| SEO generation coverage | 0% | 100% |
| Booking validation coverage | 0% | 100% |
| Email sending coverage | 0% | 100% |
