# Blog — Test Cases

## Overview
Tests the blog list page and individual blog post pages.
Blog is important for SEO traffic and content marketing.

## Test Cases

### TC-BLOG-01: Blog list page renders
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate to /blog
- **Expected**: Blog page renders with article list, each article has a title and link
- **Implemented**: No

### TC-BLOG-02: Blog list has articles
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /blog
- **Expected**: At least one blog article card is visible
- **Implemented**: No

### TC-BLOG-03: Blog article renders via SSR
- **Priority**: Critical
- **Type**: Smoke
- **Steps**:
  1. Navigate directly to a blog article URL (e.g., /blog/cual-es-el-mejor-progresivo)
- **Expected**: Article renders with title, content, not "Artículo no encontrado"
- **Implemented**: No

### TC-BLOG-04: Blog article via CSR from list
- **Priority**: Critical
- **Type**: Functional
- **Steps**:
  1. Navigate to /blog
  2. Click on the first article link
- **Expected**: Article page renders with content (not "Artículo no encontrado")
- **Implemented**: No
