# Error Handling — Test Cases

## Overview
Tests that error pages render correctly instead of crashing.

## Test Cases

### TC-ERR-01: Non-existent route shows 404, not 500
- **Priority**: Critical
- **Type**: Functional
- **Steps**:
  1. Navigate to /this-page-does-not-exist
- **Expected**: Page shows a user-friendly 404 message, NOT a 500 server error
- **Implemented**: No

### TC-ERR-02: 404 page has link back to homepage
- **Priority**: High
- **Type**: Functional
- **Steps**:
  1. Navigate to /this-page-does-not-exist
- **Expected**: 404 page includes a "Volver al inicio" link that navigates to /
- **Implemented**: No
