# Plan VEO — Test Cases

## Overview

Tests that the Plan VEO page (`/planveo`) renders all content sections from the
government subsidy information page. This page informs parents about the Plan VEO
aid for children's glasses/contacts. It should have a hero, description, coverage
cards, requirements, step-by-step process, FAQ accordion, and CTA.

## Entry Point

`/planveo` — Direct URL load (SSR)

## Test Cases

### TC-PVEO-01: Plan VEO page loads with correct heading

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Navigate to /planveo (SSR)
- **Steps**:
  1. Navigate to /planveo
  2. Verify H1 heading is visible
  3. Verify page title contains "Plan VEO"
- **Expected**: Page renders with H1 visible, title matches, no JS errors
- **Implemented**: Yes

### TC-PVEO-02: Plan VEO page shows key content sections

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /planveo (SSR)
- **Steps**:
  1. Navigate to /planveo
  2. Verify FAQ/accordion section is present
  3. Verify CTA link (WhatsApp or similar) is present
- **Expected**: FAQ section and CTA link are visible, no JS errors
- **Implemented**: Yes

### TC-PVEO-03: Plan VEO page accessible via CSR from homepage

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Look for a link containing "Plan VEO" text
  3. Click the link (CSR)
  4. Wait for page load
- **Expected**: URL changes to include /planveo, page renders with H1, no JS errors
- **Implemented**: No
