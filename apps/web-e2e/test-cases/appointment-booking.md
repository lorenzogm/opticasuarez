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

### TC-APPT-05: Select date/time and advance to contact details

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR), then proceed through steps
- **Steps**:
  1. Navigate through steps 1-3 to /cita/horario
  2. Verify calendar with weekday dates is visible
  3. Click an available date
  4. Select a time period (Mañana or Tarde)
  5. Click continue/next button
  6. Verify navigation to /cita/contacto
- **Expected**: URL changes to /cita/contacto, contact form renders with fields for nombre, teléfono, edad, email, no JS errors
- **Implemented**: Yes

### TC-APPT-06: Contact details form renders with required fields

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR), then proceed through steps
- **Steps**:
  1. Navigate through steps 1-4 to /cita/contacto
  2. Verify form fields are visible: Nombre completo, Teléfono móvil, Edad del paciente, Email
  3. Verify optional Observaciones textarea is visible
  4. Verify appointment summary box shows selected type, date, and time period
- **Expected**: Contact form renders with all required fields, summary box shows booking details, no JS errors
- **Implemented**: Yes

### TC-APPT-07: Contact form validation shows errors for empty required fields

- **Priority**: High
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR), then proceed through steps
- **Steps**:
  1. Navigate through steps 1-4 to /cita/contacto
  2. Click the submit/continue button without filling any fields
  3. Verify validation error messages appear
- **Expected**: Error messages appear for nombre, teléfono, edad, and email fields, no JS errors
- **Implemented**: Yes

### TC-APPT-08: Confirmation page renders with booking summary

- **Priority**: Critical
- **Type**: Functional
- **Entry**: Navigate to /cita (SSR), then proceed through all steps
- **Steps**:
  1. Navigate through steps 1-4 to /cita/contacto
  2. Fill all required fields with valid data
  3. Click continue/submit button
  4. Verify navigation to /cita/confirmacion
  5. Verify booking summary displays: service type, location, date/time, contact details
  6. Verify "Confirmar cita" button is visible
- **Expected**: Confirmation page shows full booking summary with all entered data, confirm button visible, no JS errors
- **Implemented**: Yes
