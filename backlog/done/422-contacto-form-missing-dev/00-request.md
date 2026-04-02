# Bug: Contact form section missing on /contacto page

## Description

The `/contacto` page renders the hero, store locations ("NUESTRAS TIENDAS"), and social media sections but is missing the contact form section with the "ENVÍANOS UN MENSAJE" heading and form fields (name, email, message, send button).

## Reproduction Steps

1. Navigate to https://opticasuarez-web-dev.vercel.app/contacto
2. Scroll through the page
3. Observe: the page has "CONTACTO" h1, "NUESTRAS TIENDAS" section, "SÍGUENOS EN REDES SOCIALES" section
4. No contact form section is present

## Expected Behavior

The `/contacto` page should include a contact form section with:
- An h2 heading "ENVÍANOS UN MENSAJE"
- A text input for name ("Nombre")
- A text input for email ("Email")
- A textarea for message
- A submit button ("Enviar")

The `SectionContactForm` component exists in the codebase and the `contacto.json` fallback data includes `sectionContactForm` with `title: "ENVÍANOS UN MENSAJE"`.

## Actual Behavior

The contacto page renders only:
- Hero: h1 "CONTACTO" with subtitle
- Store locations: "NUESTRAS TIENDAS" with Bulevar and Centro cards
- Social media: "SÍGUENOS EN REDES SOCIALES" with Instagram, Facebook, YouTube

The contact form section is completely absent.

## Failing Tests

- **File**: `apps/web-e2e/tests/about-contact.spec.ts`
  - **Test**: `Contacto page has contact form` — **TC-ABOUT-05**

## Error Output

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: /ENVÍANOS UN MENSAJE|MENSAJE/i })
Expected: visible
Received: <element(s) not found>
```

## Investigation Notes

- Ticket #415 (`contacto-form-missing`) was previously marked as done but the form is not present in the development environment
- The `SectionContactForm` component exists in the codebase
- The Sanity page data for `/contacto` in the development dataset may be missing the `sectionContactForm` section
- Alternatively, the `contacto.json` fallback might not be loading this section correctly
- Check Sanity development dataset page builder content for the contacto page

## Priority

High — contact form is essential for user engagement
