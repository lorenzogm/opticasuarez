# Implementation Plan: Ecommerce #389

**Date**: 2026-04-02

## Technical Approach

### Cart Architecture
- `CartProvider` React Context at root level (inside `__root.tsx`)
- `useCart()` hook for all cart operations
- localStorage key: `opticasuarez_cart`
- Cart item shape: `{ productId, slug, name, image, price, quantity, color?, brand? }`
- Max quantity per item: 10

### Checkout Flow Architecture
Replicates the `/cita` multi-step pattern:
- `/checkout` layout route (like `/cita`) with `<Outlet />`
- Nested step routes that validate search params
- Data flows via URL search params between steps
- Final step collects all data and creates order

### Redsys Integration (Redirect Mode)
1. Client clicks "Pagar" on resumen page
2. Server action: create order in Sanity (status: "pending"), generate Redsys form params
3. Client receives signed form data, auto-submits form to Redsys URL
4. Customer pays on Redsys hosted page
5. Redsys redirects to our success/error URL
6. Redsys sends async notification to `/api/redsys-notification`
7. Webhook verifies HMAC-SHA256, updates order in Sanity, sends emails

### Order Storage (Sanity)
New document type `order` with fields:
- `orderNumber` (string, unique, format OS-YYYYMMDD-XXXX)
- `status` (string: pending | paid | failed | cancelled)
- `items[]` (array of: productRef, name, price, quantity, color)
- `customer` (object: name, email, phone, nif, address)
- `shipping` (object: method, cost, address or pickupLocation)
- `totals` (object: subtotal, shipping, total)
- `redsysData` (object: authCode, responseCode, date)
- `createdAt` (datetime)

### Files to Create

| File | Purpose |
|------|---------|
| `apps/web/src/lib/cart.tsx` | CartProvider, useCart hook, types |
| `apps/web/src/lib/cart.test.ts` | Cart logic tests |
| `apps/web/src/routes/carrito.tsx` | Cart page |
| `apps/web/src/components/cart/cart-page.tsx` | Cart page component |
| `apps/web/src/components/cart/cart-item.tsx` | Individual cart item row |
| `apps/web/src/components/cart/cart-summary.tsx` | Cart totals summary |
| `apps/web/src/routes/checkout.tsx` | Checkout layout route |
| `apps/web/src/routes/checkout/index.tsx` | Step 1: Customer data |
| `apps/web/src/routes/checkout/envio.tsx` | Step 2: Shipping selection |
| `apps/web/src/routes/checkout/resumen.tsx` | Step 3: Order review + pay |
| `apps/web/src/routes/checkout/confirmacion.tsx` | Success page |
| `apps/web/src/routes/checkout/error.tsx` | Error page |
| `apps/web/src/components/checkout/checkout-datos.tsx` | Customer form component |
| `apps/web/src/components/checkout/checkout-envio.tsx` | Shipping selection component |
| `apps/web/src/components/checkout/checkout-resumen.tsx` | Order review component |
| `apps/web/src/components/checkout/checkout-confirmacion.tsx` | Success component |
| `apps/web/src/components/checkout/checkout-error.tsx` | Error component |
| `apps/web/src/lib/redsys.ts` | Redsys signing/verification utilities |
| `apps/web/src/lib/redsys.test.ts` | Redsys utility tests |
| `apps/web/src/actions/create-order.ts` | Server action: create order + get Redsys params |
| `apps/web/src/actions/create-order.test.ts` | Order creation tests |
| `apps/web/src/actions/send-order-emails.ts` | Order email notifications |
| `apps/web/server/routes/api/redsys-notification.post.ts` | Redsys webhook handler |
| `apps/sanity-studio/schemas/documents/order.ts` | Sanity order schema |

### Files to Modify

| File | Change |
|------|--------|
| `apps/web/src/routes/__root.tsx` | Wrap app with CartProvider |
| `apps/web/src/components/global-navigation.tsx` | Add cart icon with count badge |
| `apps/web/src/components/tienda/product-detail.tsx` | Add "Añadir al carrito" button |
| `apps/web/src/components/tienda/sections/product-card.tsx` | Add quick "add to cart" button |
| `apps/web/vite.config.ts` | Exclude checkout/carrito from prerender |
| `apps/sanity-studio/schemas/index.ts` | Register order schema |
| `apps/sanity-studio/structure/index.ts` | Add orders to Studio structure (if exists) |

### TDD Plan

1. **Cart logic tests**: add/remove/update/clear/persistence/max quantity
2. **Redsys utility tests**: sign request, verify response, HMAC calculation
3. **Order creation tests**: input validation, order number generation
4. **Component tests**: cart page renders items, checkout forms validate

### Environment Variables Needed

| Variable | Purpose |
|----------|---------|
| `REDSYS_MERCHANT_CODE` | TPV merchant identifier |
| `REDSYS_SECRET_KEY` | HMAC-SHA256 signing key (Base64) |
| `REDSYS_TERMINAL` | Terminal number (usually "1") |
| `REDSYS_URL` | Redsys gateway URL (test vs production) |
