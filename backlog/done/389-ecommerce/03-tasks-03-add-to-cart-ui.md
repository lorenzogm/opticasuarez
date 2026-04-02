# Task 03: Add-to-Cart UI & Navigation Cart Icon

## Objective
Add "Añadir al carrito" button on product detail page, quick add on product cards,
and cart icon with item count in global navigation.

## Files to Modify

### `apps/web/src/components/tienda/product-detail.tsx`
- Import `useCart` from `~/lib/cart`
- Add "Añadir al carrito" button (primary, large) next to/below the inquiry button
- Button adds current product (with selected color if any) to cart
- Show feedback on add: brief "Añadido" state or toast
- If product not available (`availability !== "inStock"`), show disabled button "Agotado"
- Button includes shopping cart icon (lucide-react: `ShoppingCart`)

### `apps/web/src/components/tienda/sections/product-card.tsx`
- Add small cart icon button on hover (bottom-right of card image)
- On click: add product to cart with quantity 1
- Prevent navigation when clicking cart button (stopPropagation)
- Only show if product is in stock

### `apps/web/src/components/global-navigation.tsx`
- Add cart icon (lucide-react: `ShoppingBag`) next to the WhatsApp icon
- Show item count badge (red circle with number) when cart has items
- Badge only visible when `shopEnabled` is true
- Links to `/carrito`
- Also add to mobile navigation

## Acceptance Criteria
- [ ] "Añadir al carrito" button on product detail page
- [ ] Product added to cart with correct data (name, price, image, color, brand)
- [ ] Quick add button on product cards
- [ ] Cart icon in header with item count badge
- [ ] Cart icon visible in both desktop and mobile nav
- [ ] "Agotado" state for out-of-stock products
- [ ] `pnpm check` passes
