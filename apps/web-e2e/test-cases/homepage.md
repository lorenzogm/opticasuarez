# Homepage — Test Cases

## Overview
Tests that the homepage renders all critical sections with meaningful content.
The homepage is the main entry point and must render correctly for both SEO and user experience.

## Test Cases

### TC-HOME-01: Page title is correct
- **Priority**: Critical
- **Type**: SEO
- **Steps**:
  1. Navigate to /
- **Expected**: Title contains "Óptica Suárez"
- **Implemented**: No

### TC-HOME-02: Hero section renders
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate to /
- **Expected**: Hero carousel with slide controls is visible
- **Implemented**: No

### TC-HOME-03: Services grid renders
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /
- **Expected**: Service cards (Visión Binocular, Terapia Visual, etc.) are visible with headings
- **Implemented**: No

### TC-HOME-04: H1 heading exists
- **Priority**: Critical
- **Type**: SEO
- **Steps**:
  1. Navigate to /
- **Expected**: Exactly one H1 element exists on the page
- **Implemented**: No

### TC-HOME-05: WhatsApp CTA is visible
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /
- **Expected**: WhatsApp link is present in header
- **Implemented**: No

### TC-HOME-06: Locations section renders
- **Priority**: Medium
- **Type**: Functional
- **Steps**:
  1. Navigate to /
- **Expected**: "¿Dónde estamos?" section with location info is visible
- **Implemented**: No

### TC-HOME-07: Book appointment CTA renders
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /
- **Expected**: "Reserva tu cita hoy" section with a booking link is visible
- **Implemented**: No

### TC-HOME-08: No JavaScript errors
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate to /
  2. Listen for console errors
- **Expected**: No uncaught exceptions or console.error messages
- **Implemented**: No
