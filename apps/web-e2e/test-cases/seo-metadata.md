# SEO Metadata — Test Cases

## Overview

Tests that all pages have proper SEO meta tags (description, Open Graph, canonical URL,
unique titles). This is the only journey that uses page.goto() for every page, because
SEO meta tags are server-rendered and must be verified via SSR.

## Entry Point

Multiple pages via SSR (page.goto for each)

## Test Cases

### TC-SEO-01: Homepage has meta description

- **Priority**: Critical
- **Type**: SEO
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Check meta[name="description"] tag
- **Expected**: Meta description tag exists and has more than 10 characters, no JS errors
- **Implemented**: Yes

### TC-SEO-02: Homepage has Open Graph tags

- **Priority**: High
- **Type**: SEO
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Check og:title, og:description, og:image meta tags
- **Expected**: All three Open Graph tags are present and non-empty, no JS errors
- **Implemented**: Yes

### TC-SEO-03: Homepage has canonical URL

- **Priority**: High
- **Type**: SEO
- **Entry**: Navigate to / (SSR)
- **Steps**:
  1. Navigate to /
  2. Check link[rel="canonical"] tag
- **Expected**: Canonical link tag is present and non-empty, no JS errors
- **Implemented**: Yes

### TC-SEO-04: Content pages have unique titles

- **Priority**: High
- **Type**: SEO
- **Entry**: Navigate to /, /quienes-somos, /blog (SSR)
- **Steps**:
  1. Navigate to / — record title
  2. Navigate to /quienes-somos — record title
  3. Navigate to /blog — record title
  4. Compare all three titles
- **Expected**: Each page has a distinct title (not the same as homepage), no JS errors
- **Implemented**: Yes
