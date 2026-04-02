# Task 01: Cart Context, Hook & Tests (TDD Red → Green)

## Objective
Create the cart infrastructure: React Context, useCart hook, localStorage persistence, and comprehensive tests.

## Tests to Write First (Red Phase)

### `apps/web/src/lib/cart.test.ts`
- `addItem` adds a product to cart
- `addItem` increments quantity if product already in cart
- `addItem` respects max quantity of 10
- `removeItem` removes a product from cart
- `updateQuantity` changes item quantity
- `updateQuantity` removes item if quantity set to 0
- `clearCart` empties the cart
- `getCartTotal` returns correct subtotal
- `getItemCount` returns total number of items
- Cart state persists to localStorage
- Cart loads from localStorage on init
- Cart handles corrupted localStorage gracefully

## Files to Create

### `apps/web/src/lib/cart.tsx`
```
Types:
- CartItem: { productId: string, slug: string, name: string, image: string, price: number, quantity: number, color?: { name: string, hex: string }, brand?: string }
- CartContextType: { items: CartItem[], addItem, removeItem, updateQuantity, clearCart, itemCount: number, subtotal: number }

Implementation:
- CartProvider: wraps children with CartContext.Provider
- useCart(): returns CartContextType
- localStorage key: "opticasuarez_cart"
- Max quantity per item: 10
- On mount: load from localStorage
- On change: save to localStorage
```

## Acceptance Criteria
- [ ] All cart tests written and failing (red)
- [ ] CartProvider and useCart implemented (green)
- [ ] localStorage persistence works
- [ ] Edge cases handled (corrupted data, max quantity)
- [ ] `pnpm check` passes
