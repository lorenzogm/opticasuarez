# Appointment Booking — Test Cases

## Overview

Tests the multi-step appointment booking flow: user navigates to /cita → selects
appointment type → selects location → sees the booking steps progress. This is the
primary conversion flow for the business.

## Entry Point

`/cita` — Appointment page (SSR load)

## Test Cases

### TC-APPT-01: Appointment page loads with type selection

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Navigate to /cita (SSR)
- **Steps**:
  1. Navigate to /cita
  2. Verify appointment type selection is visible
- **Expected**: Page renders with title, appointment type options are visible, no JS errors
- **Implemented**: No

### TC-APPT-02: Navigate through booking steps

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR)
- **Steps**:
  1. Navigate to /cita
  2. Select an appointment type (click first option)
  3. Verify navigation to /cita/centro
  4. Select a location
  5. Verify navigation to /cita/horario
- **Expected**: Each step advances to the next URL, content renders at each step, no JS errors
- **Implemented**: No
