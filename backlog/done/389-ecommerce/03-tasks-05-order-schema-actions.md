# Task 05: Sanity Order Schema & Server Actions

## Objective
Create the Sanity order document type and server actions for order creation.

## Tests to Write First (Red Phase)

### `apps/web/src/actions/create-order.test.ts`
- Creates order with valid data (returns orderNumber)
- Validates required customer fields (name, email, phone)
- Validates email format
- Sanitizes all input fields (trim + length limits)
- Generates correct order number format (OS-YYYYMMDD-XXXX)
- Calculates correct totals (subtotal + shipping)
- Rejects empty cart (no items)

## Files to Create

### `apps/sanity-studio/schemas/documents/order.ts`
Sanity document type "order":
- `orderNumber` (string, required, readonly)
- `status` (string: pending | paid | failed | cancelled, default "pending")
- `items[]` (array of objects: productId, name, slug, price, quantity, color, brand, image)
- `customer` (object: name, email, phone, nif, address, postalCode, city, province)
- `shipping` (object: method [delivery|pickup-bulevar|pickup-centro], cost: number)
- `totals` (object: subtotal, shipping, total)
- `redsysData` (object: authCode, responseCode, merchantParameters, date — all optional)
- `_createdAt` (automatic)

### `apps/web/src/actions/create-order.ts`
Server action using `createServerFn({ method: "POST" })`:
- Input: cart items, customer data, shipping method
- Validates all fields
- Generates order number: `OS-${YYYYMMDD}-${random4digits}`
- Calculates totals (subtotal from items, shipping cost from method)
- Creates order document in Sanity (status: "pending")
- Returns: `{ orderId, orderNumber, redsysParams }` (Redsys params for redirect)

## Files to Modify

### `apps/sanity-studio/schemas/index.ts`
- Import and register the order schema

### `apps/web/src/lib/sanity.ts`
- Add Sanity write client (for mutations)
- Add `createOrder()` function
- Add `updateOrderStatus()` function
- Add `getOrder()` function (by orderNumber)

## Acceptance Criteria
- [ ] Order tests written and passing
- [ ] Sanity order schema created and registered
- [ ] createOrder server action working
- [ ] Order number generation correct
- [ ] Input validation comprehensive
- [ ] Sanity write client configured
- [ ] `pnpm check` passes
