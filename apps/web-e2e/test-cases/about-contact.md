# About & Contact — Test Cases

## Overview

Tests the about & contact journey: user navigates from homepage to Quienes Somos page
(via click, not SSR) → verifies full content (history timeline, team sections) → then
navigates to Contacto page → verifies contact information. All via CSR navigation to
catch client-side routing bugs.

## Entry Point

`/` — Homepage (SSR load), then navigate to about/contact via clicks

## Test Cases

### TC-ABOUT-01: Navigate to Quienes Somos via nav click and verify content

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Quienes Somos" nav link (CSR)
  3. Wait for page load
  4. Verify H1 heading visible
  5. Verify "NUESTRA HISTORIA" timeline section has content
  6. Verify "NUESTRO EQUIPO" team section is visible
- **Expected**: URL changes to /quienes-somos, H1 visible, timeline section shows events (not empty), team section visible, no JS errors
- **Implemented**: No

### TC-ABOUT-02: Navigate to Contacto via nav click and verify content

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Contacto" nav link (CSR)
  3. Wait for page load
  4. Verify H1 heading visible
  5. Verify contact information is present
- **Expected**: URL changes to /contacto, H1 visible, contact page renders with content (not "Página no encontrada"), no JS errors
- **Implemented**: No

### TC-ABOUT-03: Quienes Somos renders via SSR with full content

- **Priority**: High
- **Type**: Smoke
- **Entry**: Navigate to /quienes-somos (SSR)
- **Steps**:
  1. Navigate directly to /quienes-somos
  2. Verify H1 heading visible
  3. Verify page title
  4. Verify "NUESTRA HISTORIA" timeline has events
- **Expected**: Page renders with title matching "Quiénes Somos" or "Óptica Suárez", H1 visible, timeline section has at least one entry, no JS errors
- **Implemented**: No
