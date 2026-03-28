# Error Resilience — Test Cases

## Overview

Tests error handling and recovery: user hits an invalid URL → sees a friendly 404 page
(not a 500 server error) → clicks "Volver al inicio" → recovers to a working homepage.
This journey verifies the app degrades gracefully and users can always recover.

## Entry Point

`/this-page-does-not-exist-xyz` — Non-existent URL (SSR)

## Test Cases

### TC-ERR-01: Non-existent route shows 404, not 500

- **Priority**: Critical
- **Type**: Functional
- **Bug Ticket**: backlog/000-500-on-missing-pages/
- **Entry**: Navigate to /this-page-does-not-exist-xyz (SSR)
- **Steps**:
  1. Navigate to /this-page-does-not-exist-xyz
  2. Check HTTP status code
  3. Check page content
- **Expected**: HTTP status is NOT 500, page shows "no encontrada" or "not found" message, no JS errors
- **Implemented**: No

### TC-ERR-02: 404 page has recovery link to homepage

- **Priority**: High
- **Type**: Functional
- **Bug Ticket**: backlog/000-500-on-missing-pages/
- **Entry**: Navigate to /this-page-does-not-exist-xyz (SSR)
- **Steps**:
  1. Navigate to /this-page-does-not-exist-xyz
  2. Look for "Volver al inicio" link
  3. Click the link (CSR)
  4. Verify homepage renders
- **Expected**: 404 page includes a "Volver al inicio" link, clicking it navigates to /, homepage renders, no JS errors
- **Implemented**: No
