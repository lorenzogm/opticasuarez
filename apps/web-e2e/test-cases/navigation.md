# Navigation — Test Cases

## Overview
Tests client-side and server-side navigation between all pages.
Navigation is the most critical flow — if users can't move between pages, nothing else works.

## Test Cases

### TC-NAV-01: Navigation bar is visible on homepage
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate to /
  2. Check nav element is visible
- **Expected**: Nav bar with links (Inicio, Quienes Somos, Servicios, Blog, Contacto) is visible
- **Implemented**: No

### TC-NAV-02: Navigation bar links are present
- **Priority**: Critical
- **Type**: Functional
- **Steps**:
  1. Navigate to /
  2. Check each nav link exists
- **Expected**: Links for Inicio, Quienes Somos, Servicios, Blog, Contacto are present in nav
- **Implemented**: No

### TC-NAV-03: Client-side navigation to /quienes-somos
- **Priority**: Critical
- **Type**: Functional
- **Steps**:
  1. Navigate to /
  2. Click "Quienes Somos" nav link
  3. Wait for page load
- **Expected**: URL changes to /quienes-somos, page content renders (not 404)
- **Implemented**: No

### TC-NAV-04: Client-side navigation to /blog
- **Priority**: Critical
- **Type**: Functional
- **Steps**:
  1. Navigate to /
  2. Click "Blog" nav link
  3. Wait for page load
- **Expected**: URL changes to /blog, blog list renders with articles
- **Implemented**: No

### TC-NAV-05: Client-side navigation to /contacto
- **Priority**: Critical
- **Type**: Functional
- **Steps**:
  1. Navigate to /
  2. Click "Contacto" nav link
  3. Wait for page load
- **Expected**: URL changes to /contacto, contact page renders (not 404)
- **Implemented**: No

### TC-NAV-06: Servicios dropdown opens on click
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /
  2. Click "Servicios" nav link
- **Expected**: Dropdown opens showing service sub-pages
- **Implemented**: No

### TC-NAV-07: Navigate to homepage via logo
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /blog
  2. Click the Óptica Suárez logo/link
- **Expected**: URL changes to /, homepage content renders
- **Implemented**: No

### TC-NAV-08: Mobile menu opens
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Set viewport to mobile (375x812)
  2. Navigate to /
  3. Click hamburger menu button
- **Expected**: Mobile menu opens showing navigation links
- **Implemented**: No
