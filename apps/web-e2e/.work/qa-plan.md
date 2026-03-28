# QA Plan — Test Implementation Plan

**Date**: 2026-03-28

## Current State

- 32 test cases documented, all implemented as Playwright tests
- 31/33 tests pass (Chromium), 2 fail (error-resilience hydration bug)
- Coverage is comprehensive for all functional pages

## Work Items

### 1. Update appointment-booking test cases (Medium priority)

The appointment booking flow has 5 steps (/cita → /cita/centro → /cita/horario → /cita/contacto → /cita/confirmacion)
but only steps 1-2 are tested. Add test cases for the full booking flow.

**Files:**
- Update: `apps/web-e2e/test-cases/appointment-booking.md` — add TC-APPT-03 through TC-APPT-05
- Update: `apps/web-e2e/tests/appointment-booking.spec.ts` — implement new tests

### 2. Update service-discovery test cases for current routes (Low priority)

Service pages are now served via the catch-all page builder instead of dedicated `/servicios/*` routes.
Tests pass but the test case documentation references old routes. Update to reflect reality.

**Files:**
- Update: `apps/web-e2e/test-cases/service-discovery.md` — clarify that pages are served via page builder

### 3. File bug ticket for 404 hydration errors (High priority)

The error-resilience tests fail because the 404 page has React hydration mismatches.
Create a bug ticket so the Developer agent can fix it.

**Files:**
- Create: `backlog/to-do/405-404-page-hydration-errors/00-request.md`

## Task Order

1. Task 01: Update appointment-booking test cases + implement Playwright tests
2. Task 02: Update service-discovery test case docs
3. Task 03: Create bug ticket for 404 hydration errors
