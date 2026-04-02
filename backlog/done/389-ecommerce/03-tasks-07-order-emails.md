# Task 07: Order Confirmation Emails

## Objective
Send transactional emails on successful payment: confirmation to customer and notification to store.

## Files to Create

### `apps/web/src/actions/send-order-emails.ts`
Server function that sends two emails via Resend:

1. **Customer email** (to customer's email):
   - Subject: "Pedido confirmado — #{orderNumber} | Óptica Suárez"
   - Content: Order number, items list with quantities and prices, subtotal,
     shipping cost and method, total, shipping address or pickup location,
     estimated delivery ("3-5 días laborables" for delivery, "Disponible en 24h" for pickup),
     contact info for questions

2. **Store email** (to bulevar@opticasuarezjaen.es):
   - Subject: "Nuevo pedido #{orderNumber}"
   - Content: Full order details, customer info (name, email, phone, NIF),
     items with quantities and prices, shipping method and address,
     totals, Redsys auth code

Both emails: plain text format (like existing booking emails), sent from
"Óptica Suárez <no-reply@opticasuarezjaen.es>" (same as booking emails pattern).

## Files to Modify

### `apps/web/server/routes/api/redsys-notification.post.ts`
- After updating order status to "paid": call `sendOrderEmails()`
- Pass order data from Sanity

## Acceptance Criteria
- [ ] Customer confirmation email sent with correct data
- [ ] Store notification email sent with full order details
- [ ] Email sending integrated into Redsys notification webhook
- [ ] Email failures don't block webhook response (catch errors, log them)
- [ ] `pnpm check` passes
