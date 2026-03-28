# <Journey Name> — Test Cases

## Overview

<!-- Brief description of the user journey this suite covers and why it's critical. -->

## Entry Point

<!-- The URL where this journey starts (e.g. /, /blog, /cita). Only the entry point uses page.goto(). -->

## Test Cases

### TC-<PREFIX>-01: <Entry point loads correctly>

- **Priority**: Critical / High / Medium
- **Type**: Smoke / Functional / Visual / SEO
- **Entry**: Navigate to <URL> (SSR)
- **Steps**:
  1. Navigate to <URL>
  2. Verify page rendered with content
- **Expected**: Page loads, H1 visible, no JS errors
- **Implemented**: No

### TC-<PREFIX>-02: <CSR navigation to next page>

- **Priority**: Critical / High / Medium
- **Type**: Smoke / Functional / Visual / SEO
- **Entry**: Start from <previous page>
- **Steps**:
  1. Click <link/button> to navigate (CSR)
  2. Wait for page load
  3. Verify destination rendered
- **Expected**: URL changes, destination page renders with H1 + content, no JS errors
- **Implemented**: No

<!--
GUIDELINES — Journey-Based Test Cases:
- PREFIX must be a short uppercase identifier matching the journey:
    LAND  — Landing page (homepage SSR)
    SNAV  — Site navigation (CSR to all pages)
    SERV  — Service discovery (homepage → services → detail)
    BLOG  — Blog engagement (list → article → back)
    ERR   — Error resilience (invalid URL → 404 → recover)
    SEO   — SEO metadata (meta tags across pages)
    APPT  — Appointment booking (multi-step /cita flow)
    ABOUT — About & contact (quienes-somos → contacto)
- Each test case file maps 1:1 to a spec file:
    test-cases/site-navigation.md → tests/site-navigation.spec.ts
- Tests follow USER JOURNEYS, not pages:
    Entry point (page.goto) → CSR navigation (clicks) → assertions at each step
- MANDATORY: Every test case must include "no JS errors" in the expected outcome.
    The Playwright fixture auto-detects pageerror events; this is what catches
    bugs like the startsWith crash that only manifest during CSR navigation.
- Priority levels:
    Critical — App is broken without this (navigation, page rendering, 500 errors)
    High     — Important feature or UX issue
    Medium   — Nice to have, minor UI detail
- Type levels:
    Smoke      — Basic "does it load" check
    Functional — User interaction or business logic
    Visual     — Layout, responsiveness, visual appearance
    SEO        — Meta tags, structured data, canonical URLs
- Steps should be concrete, reproducible, and follow a real user flow
- Expected should describe observable behavior, not implementation details
- page.goto() is ONLY used for the entry point; all other navigation is via clicks
- Update "Implemented" to "Yes" when the test is written in the spec file
-->
