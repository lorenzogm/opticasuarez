# SEO — Test Cases

## Overview
Tests that pages have proper meta tags for search engine optimization.

## Test Cases

### TC-SEO-01: Homepage has meta description
- **Priority**: Critical
- **Type**: SEO
- **Steps**:
  1. Navigate to /
- **Expected**: Meta description tag exists and is non-empty
- **Implemented**: No

### TC-SEO-02: Homepage has Open Graph tags
- **Priority**: High
- **Type**: SEO
- **Steps**:
  1. Navigate to /
- **Expected**: og:title, og:description, og:image meta tags are present
- **Implemented**: No

### TC-SEO-03: Homepage has canonical URL
- **Priority**: High
- **Type**: SEO
- **Steps**:
  1. Navigate to /
- **Expected**: Canonical link tag is present
- **Implemented**: No

### TC-SEO-04: Content pages have unique titles
- **Priority**: High
- **Type**: SEO
- **Steps**:
  1. Navigate to /quienes-somos
  2. Navigate to /contacto
  3. Navigate to /blog
- **Expected**: Each page has a distinct title (not the default homepage title)
- **Implemented**: No
