# Specification: Ecommerce — Cart, Checkout, Redsys Payments, Shipping & Emails

**Item**: #389
**Date**: 2026-04-02

## Overview

Implement the complete ecommerce flow for Óptica Suárez: shopping cart, multi-step checkout
(guest only for MVP), Redsys payment integration (redirect/notification mode), shipping options,
order storage in Sanity, and transactional emails via Resend.

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Cart storage | React Context + localStorage | No server needed, persists across sessions |
| Order storage | Sanity document | Already set up, low volume shop, avoids new DB infra |
| Payment | Redsys redirect mode | Card data never on our server, simplest integration |
| Auth | Guest checkout only (MVP) | Ticket says guest checkout always available; user accounts deferred |
| Email | Resend | Already configured and used for bookings |
| Shipping | Fixed rates | 5.50€ peninsula, free store pickup, contact message for islands |
| Feature gate | `ecommerce` flag | Already exists in feature-flags.ts |

## Functional Requirements

### FR-1: Shopping Cart
- Add products to cart from product detail page (with selected color if applicable)
- View cart with product images, names, quantities, prices
- Update quantity (1–10 per item)
- Remove items from cart
- Show subtotal, shipping estimate, and total
- Persist cart in localStorage (survives page refresh / browser close)
- Cart icon in global navigation with item count badge (visible when `shopEnabled` is true)

### FR-2: Checkout Flow
Multi-step checkout replicating the `/cita` pattern with URL params:
1. **Datos** (`/checkout/`) — Name, email, phone, NIF (optional), address fields
2. **Envío** (`/checkout/envio`) — Select shipping method:
   - Envío a domicilio (península): 5.50€ via GLS
   - Recogida en Óptica Bulevar: Gratis
   - Recogida en Óptica Centro: Gratis
   - Fuera de península: "Contacte con nosotros" message (blocks checkout)
3. **Resumen** (`/checkout/resumen`) — Review order, accept terms, pay button

### FR-3: Order Creation
- Server action creates order in Sanity on "Pay" click
- Order data: items, customer info, shipping method, totals, status ("pending")
- Order gets unique reference number (format: OS-YYYYMMDD-XXXX)
- Returns order ID and Redsys form data for redirect

### FR-4: Redsys Payment
- Redirect mode: customer is sent to Redsys hosted payment page
- On success: redirect to `/checkout/confirmacion?pedido=<orderId>`
- On failure: redirect to `/checkout/error?pedido=<orderId>`
- Server notification (webhook): `/api/redsys-notification` updates order status
- HMAC-SHA256 signature verification on all Redsys responses

### FR-5: Confirmation & Error Pages
- `/checkout/confirmacion` — Thank you page with order number, summary, estimated delivery
- `/checkout/error` — Payment failed page with retry option

### FR-6: Transactional Emails
- **Customer confirmation**: order number, items, totals, shipping info, estimated delivery
- **Store notification**: to bulevar@opticasuarezjaen.es with full order details

## Non-Functional Requirements

- **Security**: Payment data never touches our server (Redsys redirect mode)
- **Security**: HMAC-SHA256 verification on Redsys webhook notifications
- **Security**: Input sanitization on all checkout form fields
- **Accessibility**: All forms have proper labels, error messages, keyboard navigation
- **Performance**: Cart operations instant (client-side state)
- **Feature gated**: All `/checkout/*` and `/carrito` routes behind `ecommerce` flag

## Integration Points

| System | Integration | Files |
|--------|-------------|-------|
| Sanity | Product data (existing), Order storage (new) | `apps/sanity-studio/schemas/documents/order.ts` |
| Redsys | Payment redirect + webhook | `apps/web/src/lib/redsys.ts`, `apps/web/server/routes/api/redsys-notification.post.ts` |
| Resend | Transactional emails | `apps/web/src/actions/send-order-emails.ts` |
| Feature flags | `ecommerce` flag gate | `apps/web/src/lib/feature-flags.ts` (existing) |

## Success Criteria

- [ ] Cart persists across page refreshes
- [ ] Checkout flow collects all required data
- [ ] Order created in Sanity with correct data
- [ ] Redsys payment redirect works (test mode)
- [ ] Webhook verifies signature and updates order
- [ ] Confirmation emails sent to customer and store
- [ ] All routes gated behind `ecommerce` feature flag
- [ ] All new code has tests
- [ ] `pnpm check` passes
