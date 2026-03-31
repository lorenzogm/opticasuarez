# Bug: Contacto page missing contact form section

## Description
The Contacto page at `/contacto` does not have a contact form section. The old site has a full "ENVÍANOS UN MENSAJE" section with form fields (Nombre, Email, Teléfono, Asunto, Mensaje) and a submit button. The new site's Contacto page shows store locations but no contact form.

## Reproduction Steps
1. Navigate to http://localhost:3000/contacto
2. Look for a contact form with "Nombre completo", "Email", "Mensaje" fields
3. No form section is found

## Expected Behavior
The Contacto page should have a contact form section with:
- Heading like "ENVÍANOS UN MENSAJE"
- Name field
- Email field
- Phone field (optional)
- Subject/Message field
- Submit button
- Privacy notice

## Actual Behavior
No contact form section is visible on the page.

## Failing Tests
- **File**: `apps/web-e2e/tests/about-contact.spec.ts`
- **Test**: TC-ABOUT-05
- **Error**: Heading matching "ENVÍANOS UN MENSAJE" not found

## Error Output
```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
Locator: getByRole('heading', { name: /ENVÍANOS UN MENSAJE|MENSAJE/i })
Expected: visible
Received: <element(s) not found>
```

## Priority
High — Contact form is a key conversion mechanism for the business
