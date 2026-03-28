# Landing Page — Test Cases

## Overview

Tests that the homepage (landing page) renders all critical sections correctly via SSR.
The homepage is the main entry point for users and search engines — it must load fast,
render all sections with meaningful content, and have zero JavaScript errors.

## Entry Point

`/` — Direct URL load (SSR)

## Test Cases

### TC-LAND-01: Homepage loads with correct title

- **Priority**: Critical
- **Type**: SEO
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
- **Expected**: Title contains "Óptica Suárez", no JS errors
- **Implemented**: No

### TC-LAND-02: Hero section renders with carousel controls

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Check hero carousel is visible
- **Expected**: Hero carousel with "Next slide" and "Previous slide" controls is visible, no JS errors
- **Implemented**: No

### TC-LAND-03: Services grid shows service cards

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Scroll to services section
- **Expected**: Service cards (Visión Binocular, Terapia Visual, Contactología) are visible with headings, no JS errors
- **Implemented**: No

### TC-LAND-04: Page has exactly one H1

- **Priority**: Critical
- **Type**: SEO
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Count H1 elements
- **Expected**: Exactly one H1 element exists on the page, no JS errors
- **Implemented**: No

### TC-LAND-05: WhatsApp contact link is visible

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Check for WhatsApp link
- **Expected**: WhatsApp link is present and visible, no JS errors
- **Implemented**: No

### TC-LAND-06: Locations section renders

- **Priority**: Medium
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Scroll to locations section
- **Expected**: "¿Dónde estamos?" section with location info is visible, no JS errors
- **Implemented**: No

### TC-LAND-07: Book appointment CTA renders

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Scroll to appointment section
- **Expected**: "Reserva tu cita" section with a booking link is visible, no JS errors
- **Implemented**: No
