# Task 04: Checkout Flow — Routes & Form Components

## Objective
Create the multi-step checkout flow with customer data form, shipping selection,
and order review page.

## Files to Create

### `apps/web/src/routes/checkout.tsx`
- Layout route (like `/cita.tsx`): renders `<Outlet />`
- Head: noindex, nofollow
- Feature gate: loader checks `featureFlags.ecommerce`

### `apps/web/src/routes/checkout/index.tsx`
- Step 1: Customer data form
- Renders `<CheckoutDatos />`
- On submit: navigate to `/checkout/envio` with customer params in search

### `apps/web/src/components/checkout/checkout-datos.tsx`
- Form fields: nombre*, email*, teléfono*, NIF (optional)
- Address fields: dirección*, código postal*, ciudad*, provincia*
- All fields validated (required fields, email format, phone format)
- Progress indicator: Step 1 of 3
- "Siguiente" button → `/checkout/envio?nombre=...&email=...`

### `apps/web/src/routes/checkout/envio.tsx`
- Step 2: Shipping method selection
- validateSearch: all customer fields from step 1
- Renders `<CheckoutEnvio />`

### `apps/web/src/components/checkout/checkout-envio.tsx`
- Radio options:
  1. Envío a domicilio (península) — 5,50€ (GLS)
  2. Recogida en Óptica Suárez Bulevar (Av. de Andalucía, 3, Jaén) — Gratis
  3. Recogida en Óptica Suárez Centro (P.º de la Estación, 12, Jaén) — Gratis
- Checkbox: "Envío fuera de península" → shows message "Contacte con nosotros" + disables continue
- Progress indicator: Step 2 of 3
- Navigation: "Anterior" + "Siguiente"

### `apps/web/src/routes/checkout/resumen.tsx`
- Step 3: Order review
- validateSearch: all customer + shipping params
- Renders `<CheckoutResumen />`

### `apps/web/src/components/checkout/checkout-resumen.tsx`
- Cart items summary (from useCart)
- Customer data summary
- Shipping method + cost
- Totals: subtotal, shipping, total
- Terms checkbox (required)
- "Pagar con tarjeta" button (triggers order creation + Redsys redirect)
- Progress indicator: Step 3 of 3

## Checkout Data Flow
- Step 1 → collects customer data → passes as search params
- Step 2 → selects shipping → adds to search params
- Step 3 → reads all params + cart items → creates order + redirects to Redsys

## Acceptance Criteria
- [ ] Checkout layout route with feature flag gate
- [ ] Step 1: Customer data form with validation
- [ ] Step 2: Shipping method selection with correct prices
- [ ] Step 3: Order review with all data + pay button
- [ ] Progress indicator shows current step
- [ ] Navigation between steps works (forward + back)
- [ ] "Fuera de península" case handled
- [ ] Redirect to /carrito if cart is empty
- [ ] `pnpm check` passes
