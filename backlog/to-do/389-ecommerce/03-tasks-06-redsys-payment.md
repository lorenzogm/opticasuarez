# Task 06: Redsys Payment Integration

## Objective
Implement Redsys redirect payment flow: request signing, form generation,
response verification, and notification webhook.

## Tests to Write First (Red Phase)

### `apps/web/src/lib/redsys.test.ts`
- `encodeOrder` generates correct merchant parameters JSON (Base64)
- `signRequest` produces correct HMAC-SHA256 signature
- `verifySignature` returns true for valid signature
- `verifySignature` returns false for tampered data
- `decodeResponse` correctly parses Base64 merchant parameters
- `getRedsysFormData` returns all required form fields
- Order amounts in cents (12.50€ → "1250")

## Files to Create

### `apps/web/src/lib/redsys.ts`
Redsys utility library:

```
Constants:
- REDSYS_URL (from env: test = https://sis-t.redsys.es:25443/sis/realizarPago, prod = https://sis.redsys.es/sis/realizarPago)
- TRANSACTION_TYPE = "0" (authorization)
- CURRENCY = "978" (EUR)

Functions:
- encrypt3DES(secretKey: string, orderNumber: string): string
  → 3DES-CBC encrypt order number with merchant key
- signRequest(merchantParams: string, key3DES: string): string
  → HMAC-SHA256 of Base64 merchant params with 3DES key
- encodeMerchantParameters(data: Record<string, string>): string
  → JSON → Base64url encode
- decodeMerchantParameters(encoded: string): Record<string, string>
  → Base64url decode → JSON parse
- verifySignature(encodedParams: string, receivedSignature: string, secretKey: string): boolean
  → Verify Redsys response signature
- getRedsysFormData(options): { url, fields }
  → Generate form data for redirect (Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature)
```

### `apps/web/server/routes/api/redsys-notification.post.ts`
Redsys notification webhook (POST):
- Receives: Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature
- Verify signature with HMAC-SHA256
- If valid: decode merchant parameters, get Ds_Response code
- Response codes: 0000-0099 = success, anything else = failure
- On success: update order status to "paid" in Sanity, send confirmation emails
- On failure: update order status to "failed" in Sanity
- Return HTTP 200 (always, per Redsys spec)

### `apps/web/src/routes/checkout/confirmacion.tsx`
- Success page after Redsys redirect
- Search params: `pedido` (order number)
- Shows: "¡Pedido confirmado!" + order number
- Shows order summary (fetched from Sanity by order number)
- Shows estimated delivery info
- Link to home

### `apps/web/src/routes/checkout/error.tsx`
- Error page after failed Redsys payment
- Search params: `pedido` (order number)
- Shows: "Error en el pago"
- Shows: "Reintentar pago" button
- Shows: "Contactar" link
- Link to cart

## Environment Variables
- `REDSYS_MERCHANT_CODE` — Merchant FUC code
- `REDSYS_SECRET_KEY` — HMAC key (Base64 encoded)
- `REDSYS_TERMINAL` — Terminal number (default "1")
- `REDSYS_URL` — Gateway URL (test or production)

## Acceptance Criteria
- [ ] Redsys tests written and passing
- [ ] Merchant parameters correctly encoded
- [ ] HMAC-SHA256 signature generation working
- [ ] Signature verification working
- [ ] Form data generation for redirect complete
- [ ] Webhook endpoint handles notifications correctly
- [ ] Order status updated in Sanity on payment result
- [ ] Success page shows order confirmation
- [ ] Error page shows retry option
- [ ] `pnpm check` passes

## Security Notes
- Card data NEVER passes through our server (redirect mode)
- Webhook MUST verify HMAC signature before processing
- Secret key MUST be in environment variables only
- 3DES encryption for order-specific key derivation
