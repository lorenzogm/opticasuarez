# Appointment Booking — Test Cases

## Overview

Tests the multi-step appointment booking flow: user navigates to /cita → selects
appointment type → selects location → selects date/time → fills contact details →
sees confirmation. This is the primary conversion flow for the business.

The flow has 5 steps:
1. `/cita` — Select appointment type (6 options)
2. `/cita/centro` — Select location/center
3. `/cita/horario` — Select date and time
4. `/cita/contacto` — Fill contact details
5. `/cita/confirmacion` — Confirmation

## Entry Point

`/cita` — Appointment page (SSR load)

## Test Cases

### TC-APPT-01: Appointment page loads with type selection

- **Priority**: Critical
- **Type**: Smoke
- **Entry**: Navigate to /cita (SSR)
- **Steps**:
  1. Navigate to /cita
  2. Verify page title contains "Reservar Cita"
  3. Verify appointment type options are visible (at least 3 options)
- **Expected**: Page renders with title, appointment type options are visible, no JS errors
- **Implemented**: Yes

### TC-APPT-02: Select appointment type and advance to center selection

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR)
- **Steps**:
  1. Navigate to /cita
  2. Click an appointment type option (e.g., "Cita refracción")
  3. Click the continue/next button
  4. Verify navigation to /cita/centro
- **Expected**: URL changes to /cita/centro, center selection page renders, no JS errors
- **Implemented**: Yes

### TC-APPT-03: Select center and advance to schedule

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR), then proceed through steps
- **Steps**:
  1. Navigate to /cita
  2. Select an appointment type and proceed to /cita/centro
  3. Verify center/location options are visible
  4. Select a center
  5. Click continue/next button
  6. Verify navigation to /cita/horario
- **Expected**: URL changes to /cita/horario, date/time selection renders, no JS errors
- **Implemented**: Yes

### TC-APPT-04: Schedule page renders with date/time selection

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR), then proceed through steps
- **Steps**:
  1. Navigate through steps to /cita/horario
  2. Verify date selection is visible
  3. Verify time slot options are available
- **Expected**: Schedule page renders with date and time selection UI, no JS errors
- **Implemented**: Yes
