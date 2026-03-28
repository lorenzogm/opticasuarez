# <Page/Flow Name> — Test Cases

## Overview

<!-- Brief description of what this test suite covers and why it's critical. -->

## Test Cases

### TC-<PREFIX>-01: <Test case title>

- **Priority**: Critical / High / Medium
- **Type**: Smoke / Functional / Visual / SEO
- **Steps**:
  1. Navigate to <URL>
  2. <action>
  3. <action>
- **Expected**: <expected outcome>
- **Implemented**: Yes / No

### TC-<PREFIX>-02: <Test case title>

- **Priority**: Critical / High / Medium
- **Type**: Smoke / Functional / Visual / SEO
- **Steps**:
  1. Navigate to <URL>
  2. <action>
- **Expected**: <expected outcome>
- **Implemented**: Yes / No

<!--
GUIDELINES:
- PREFIX must be a short uppercase identifier (NAV, HOME, BLOG, SEO, ERR, etc.)
- Each test case file maps 1:1 to a spec file: test-cases/navigation.md → tests/navigation.spec.ts
- Priority levels:
    Critical — App is broken without this (navigation, page rendering, 500 errors)
    High     — Important feature or UX issue
    Medium   — Nice to have, minor UI detail
- Type levels:
    Smoke      — Basic "does it load" check
    Functional — User interaction or business logic
    Visual     — Layout, responsiveness, visual appearance
    SEO        — Meta tags, structured data, canonical URLs
- Steps should be concrete and reproducible
- Expected should describe observable behavior, not implementation details
- Update "Implemented" to "Yes" and add the spec file + test name when the test is written
-->
