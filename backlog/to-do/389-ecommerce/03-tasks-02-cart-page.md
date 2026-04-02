# Task 02: Cart Page & Components

## Objective
Create the `/carrito` route and cart UI components. Mount CartProvider in root layout.

## Files to Create

### `apps/web/src/routes/carrito.tsx`
- Route: `/carrito`
- Feature gate: check `featureFlags.ecommerce` in loader (throw if disabled)
- Head: title "Carrito - Óptica Suárez", noindex
- Renders `<CartPage />`

### `apps/web/src/components/cart/cart-page.tsx`
- Shows list of cart items (CartItem component)
- Empty state: "Tu carrito está vacío" with link to /tienda
- Cart summary sidebar (subtotal, estimated shipping, total)
- "Tramitar pedido" button → navigates to /checkout
- "Seguir comprando" link → /tienda

### `apps/web/src/components/cart/cart-item.tsx`
- Product image (small thumbnail)
- Product name (linked to product page)
- Brand name
- Selected color (if any, with color swatch)
- Price (with sale price if applicable)
- Quantity selector (1-10)
- Remove button (trash icon)

### `apps/web/src/components/cart/cart-summary.tsx`
- Subtotal
- Shipping estimate ("Calculado en el siguiente paso")
- Total
- "Tramitar pedido" button

## Files to Modify

### `apps/web/src/routes/__root.tsx`
- Import CartProvider from `~/lib/cart`
- Wrap the app content with `<CartProvider>`

### `apps/web/vite.config.ts`
- Add `/carrito` and `/checkout/*` to prerender exclusion list

## Acceptance Criteria
- [ ] CartProvider mounted at root level
- [ ] /carrito route works with feature flag gate
- [ ] Cart page shows items from context
- [ ] Empty cart state displayed correctly
- [ ] Quantity can be updated
- [ ] Items can be removed
- [ ] Prerender exclusion added
- [ ] `pnpm check` passes
