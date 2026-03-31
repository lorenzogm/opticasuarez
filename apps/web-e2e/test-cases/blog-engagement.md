# Blog Engagement — Test Cases

## Overview

Tests the blog browsing journey: user navigates to blog list via nav → sees articles →
clicks an article → reads article detail → navigates back. Covers both SSR and CSR
paths to ensure blog content renders correctly throughout the flow.

## Entry Point

`/` — Homepage (SSR load), then navigate to blog via nav click

## Test Cases

### TC-BLOG-01: Navigate to blog via nav and see articles

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Click "Blog" nav link (CSR)
  3. Wait for page load
- **Expected**: URL changes to /blog, H1 heading visible, at least one article card with "Leer más" link visible, no JS errors
- **Implemented**: Yes

### TC-BLOG-02: Click article from blog list (CSR)

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to /blog (SSR)
- **Steps**:
  1. Navigate to /blog
  2. Click the first article link (CSR)
  3. Wait for page load
- **Expected**: URL changes to /blog/{slug}, H1 heading visible, article content renders (not "Artículo no encontrado"), no JS errors
- **Implemented**: Yes

### TC-BLOG-03: Blog article renders via SSR

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Navigate to /blog (SSR) to discover a real article URL
- **Steps**:
  1. Navigate to /blog
  2. Extract a real article URL from the list
  3. Navigate directly to that article URL (SSR)
- **Expected**: Article page renders with H1, content visible (not "Artículo no encontrado"), no JS errors
- **Implemented**: Yes

### TC-BLOG-04: Blog category filter dropdown is visible and interactive

- **Priority**: Medium
- **Type**: Functional
- **Entry**: Navigate to /blog (SSR)
- **Steps**:
  1. Navigate to /blog
  2. Verify category filter dropdown (select) is visible
  3. Select a category from the dropdown
  4. Verify articles are still visible (page doesn't break)
- **Expected**: Category dropdown is present, selecting a category doesn't cause errors, articles remain visible, no JS errors
- **Implemented**: Yes
