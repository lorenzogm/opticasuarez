# Site Navigation — Test Cases

## Overview

Tests client-side navigation (CSR) from the homepage to every major page via nav link
clicks. This is the most critical journey — it catches bugs that only manifest during
client-side routing (like the `startsWith` crash) which SSR-only tests miss entirely.
Every navigation step verifies the destination rendered with content and no JS errors.

## Entry Point

`/` — Homepage (SSR load), then navigate everywhere via clicks

## Test Cases

### TC-SNAV-01: CSR navigation to Quienes Somos

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Quienes Somos" nav link (CSR)
  3. Wait for page load
- **Expected**: URL changes to /quienes-somos, H1 heading visible, page content renders, no JS errors
- **Implemented**: Yes

### TC-SNAV-02: CSR navigation to Blog

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Blog" nav link (CSR)
  3. Wait for page load
- **Expected**: URL changes to /blog, H1 heading visible, blog articles listed, no JS errors
- **Implemented**: Yes

### TC-SNAV-03: CSR navigation to Contacto

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Contacto" nav link (CSR)
  3. Wait for page load
- **Expected**: URL changes to /contacto, H1 heading visible, contact info renders, no JS errors
- **Implemented**: Yes

### TC-SNAV-04: Servicios dropdown opens and navigates to service page

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Servicios" nav link to open dropdown
  3. Click "Examen Visual" from the dropdown (CSR)
  4. Wait for page load
- **Expected**: Dropdown opens showing service sub-pages, clicking "Examen Visual" navigates to service page, H1 visible, no JS errors
- **Implemented**: Yes

### TC-SNAV-05: Navigate back to homepage via logo

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /blog (SSR)
- **Steps**:
  1. Navigate to /blog
  2. Click the Óptica Suárez logo in the nav (CSR)
  3. Wait for page load
- **Expected**: URL changes to /, homepage content renders, no JS errors
- **Implemented**: Yes

### TC-SNAV-06: Mobile menu opens and navigates

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to / (SSR, mobile viewport)
- **Steps**:
  1. Set viewport to mobile (375x812)
  2. Navigate to /
  3. Click hamburger menu button
  4. Verify nav links are visible
- **Expected**: Mobile menu opens showing Inicio, Blog, Contacto links, no JS errors
- **Implemented**: Yes

### TC-SNAV-07: Navigation bar is present with all links

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Check nav element and its links
- **Expected**: Nav bar visible with links for Inicio, Quienes Somos, Servicios, Blog, Contacto, no JS errors
- **Implemented**: Yes
