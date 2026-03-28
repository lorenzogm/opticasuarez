# Service Discovery — Test Cases

## Overview

Tests the service discovery journey: user lands on homepage → clicks hero CTA or
services dropdown → navigates to service pages. Service pages are served via the
catch-all page builder route (`/$`), not dedicated `/servicios/*` routes.
All navigation is via clicks (CSR), catching routing bugs.

## Entry Point

`/` — Homepage (SSR load), then navigate to services via clicks

## Test Cases

### TC-SERV-01: Hero CTA navigates to services overview

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Descubre nuestros servicios" hero CTA link (CSR)
  3. Wait for page load
- **Expected**: URL includes /servicios, services overview page renders with H1, no JS errors
- **Implemented**: Yes

### TC-SERV-02: Service pages render via CSR from servicios dropdown

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Servicios" nav link to open dropdown
  3. Click "Terapia Visual" from dropdown (CSR)
  4. Wait for page load
- **Expected**: URL changes to service page, H1 heading visible, service content renders, no JS errors
- **Note**: Service pages are served via the catch-all page builder route
- **Implemented**: Yes

### TC-SERV-03: Multiple service pages render via SSR

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Direct navigation (SSR) to each service URL
- **Steps**:
  1. Navigate to /servicios/examen-visual — verify H1 visible
  2. Navigate to /servicios/contactologia — verify H1 visible
  3. Navigate to /servicios/vision-pediatrica — verify H1 visible
  4. Navigate to /servicios/control-de-miopia — verify H1 visible
  5. Navigate to /servicios/ortoqueratologia — verify H1 visible
- **Expected**: Each service page renders with appropriate title and H1 heading, no JS errors
- **Note**: These pages are served via the catch-all page builder route (`/$`)
- **Implemented**: Yes
