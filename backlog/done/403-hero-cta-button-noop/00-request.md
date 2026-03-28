# Bug: Hero CTA button "Descubre nuestros servicios" does nothing when clicked

## Description
The "Descubre nuestros servicios" call-to-action button in the homepage hero carousel is non-functional. Clicking it neither navigates to the services page nor scrolls to the services section. The button renders as `<button type="submit">` with no `onClick` handler and no parent `<a>` tag or `<form>`.

## Reproduction Steps
1. Navigate to http://localhost:3001/
2. Observe the blue "Descubre nuestros servicios" button in the hero carousel
3. Click the button
4. Observe: Nothing happens — no navigation, no scroll, no visual feedback

## Expected Behavior
Clicking "Descubre nuestros servicios" should either:
- Navigate to `/servicios` (the services overview page), or
- Smooth-scroll down to the services grid section on the homepage

## Evidence
- **Button properties**: `<button type="submit" class="...">Descubre nuestros servicios</button>` — no `onClick`, no parent `<a>`, no parent `<form>`
- **agent-browser eval**: `{hasOnClick: false, type: "submit", parentTag: "DIV", href: "none"}`
- **Scroll check**: `window.scrollY` remains 0 after click
- **Screenshot**: /tmp/qa-screenshot-home.png

## Root Cause (likely)
The `cta` prop is rendered as a plain button in `apps/web/src/components/hero-carousel.tsx` (lines 117-119) without any click handler or link wrapper. The button element has no functionality attached:

```tsx
{cta && (
  <button className="inline-block transform rounded-lg bg-blue-600 ...">
    {cta}
  </button>
)}
```

The component needs either an `onClick` handler that navigates/scrolls, or the button should be wrapped in a `<Link>` to `/servicios`.

## Environment
- App: apps/web (TanStack Start)
- Dev server: http://localhost:3001
- Browser: Chromium (agent-browser)
- Route: `apps/web/src/routes/index.tsx` → `apps/web/src/components/hero-carousel.tsx`

## Priority
High — The CTA is the primary action button in the hero section, the most prominent interactive element on the homepage. A non-functional CTA directly impacts user engagement and conversion.

## Labels
bug, qa-discovered
