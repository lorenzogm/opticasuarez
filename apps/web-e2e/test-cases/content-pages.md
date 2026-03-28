# Content Pages — Test Cases

## Overview
Tests that CMS-driven content pages (/quienes-somos, /contacto, service pages) render
correctly via both SSR (direct URL) and CSR (client-side navigation).

## Test Cases

### TC-CONTENT-01: /quienes-somos renders via SSR
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /quienes-somos
- **Expected**: Page renders with "Nosotros" heading, team section, history section
- **Implemented**: No

### TC-CONTENT-02: /contacto renders via SSR
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /contacto
- **Expected**: Page renders with contact information
- **Implemented**: No

### TC-CONTENT-03: Service pages render via SSR
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /servicios/examen-visual
- **Expected**: Page renders with service content and heading
- **Implemented**: No

### TC-CONTENT-04: /servicios/terapia-visual renders
- **Priority**: High
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /servicios/terapia-visual
- **Expected**: Page renders with service content
- **Implemented**: No

### TC-CONTENT-05: /servicios/contactologia renders
- **Priority**: High
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /servicios/contactologia
- **Expected**: Page renders with service content
- **Implemented**: No

### TC-CONTENT-06: /servicios/vision-pediatrica renders
- **Priority**: High
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /servicios/vision-pediatrica
- **Expected**: Page renders with service content
- **Implemented**: No

### TC-CONTENT-07: /servicios/control-de-miopia renders
- **Priority**: High
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /servicios/control-de-miopia
- **Expected**: Page renders with service content
- **Implemented**: No

### TC-CONTENT-08: /servicios/ortoqueratologia renders
- **Priority**: High
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /servicios/ortoqueratologia
- **Expected**: Page renders with service content
- **Implemented**: No

### TC-CONTENT-09: /cita renders
- **Priority**: High
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to /cita
- **Expected**: Appointment booking page renders
- **Implemented**: No

### TC-CONTENT-10: /quienes-somos timeline section has content
- **Priority**: Medium
- **Type**: Functional
- **Bug Ticket**: backlog/404-quienes-somos-empty-timeline/
- **Steps**:
  1. Navigate to /quienes-somos
  2. Scroll to the "NUESTRA HISTORIA" section
  3. Check for timeline entries below the heading
- **Expected**: The "NUESTRA HISTORIA" section displays timeline entries with years and descriptions (e.g., 1940 — APERTURA, 1960 — HOGAR PERMANENTE, etc.), not an empty container
- **Implemented**: No
