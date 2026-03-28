# QA Task 01 — Appointment Booking Test Cases & Tests

## Test Cases to Add

### TC-APPT-03: Select appointment center (Step 2)
- After selecting appointment type and clicking Continue
- Navigate to /cita/centro
- Verify center selection options appear
- Select a center and proceed

### TC-APPT-04: Select date and time (Step 3)
- After selecting center
- Navigate to /cita/horario
- Verify date/time selection appears

### TC-APPT-05: Complete contact details (Step 4)
- After selecting date/time
- Navigate to /cita/contacto
- Verify contact form fields appear

## Playwright Tests to Write
- Update `apps/web-e2e/tests/appointment-booking.spec.ts` with new tests

## Acceptance Criteria
- [ ] Test case docs updated in `apps/web-e2e/test-cases/appointment-booking.md`
- [ ] Playwright tests implement TC-APPT-03 through TC-APPT-05
- [ ] Tests follow journey-based pattern (import from ./fixtures)
- [ ] Each test has TC-ID comment
