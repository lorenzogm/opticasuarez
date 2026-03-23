# Task 06 — Migrate server routes and email action

## Objective
Create server routes (robots.txt, sitemap.xml, og-image.jpg) and convert the booking email action to a TanStack Start server function.

## Server Routes (3)

### `robots[.]txt.ts` → `/robots.txt`
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        // Same logic as source: return robots.txt content
        return new Response('...', { headers: { 'Content-Type': 'text/plain' } })
      }
    }
  }
})
```

### `sitemap[.]xml.ts` → `/sitemap.xml`
- Same dynamic sitemap logic as source
- Includes all static routes + blog post routes
- Returns XML with correct Content-Type header

### `og-image[.]jpg.ts` → `/og-image.jpg`
- Same OG image generation logic as source
- Returns image with correct Content-Type header

## Server Function: Email

Convert `apps/opticasuarez-react-router/app/actions/send-booking-emails.ts` to use `createServerFn`:

```tsx
import { createServerFn } from '@tanstack/react-start'

export const sendBookingEmails = createServerFn({ method: 'POST' })
  .inputValidator((data: BookingDetails) => data)
  .handler(async ({ data }) => {
    // Same Resend email logic as source
  })
```

## Structured Data
- Verify WebsiteSchema and OrganizationSchema render in __root.tsx
- Verify they appear in `<head>` via HeadContent

## Acceptance Criteria
- [ ] `/robots.txt` returns valid robots content
- [ ] `/sitemap.xml` returns valid XML sitemap with all routes
- [ ] `/og-image.jpg` returns valid image
- [ ] `sendBookingEmails` server function works
- [ ] Structured data renders in HTML head
