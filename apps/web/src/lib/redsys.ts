import { createCipheriv, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Redsys redirect payment integration.
 *
 * Implements the HMAC_SHA256_V1 signing protocol:
 * 1. Derive order-specific key via 3DES-CBC(secretKey, orderNumber)
 * 2. Sign Base64url(merchantParams) with HMAC-SHA256(orderKey)
 * 3. Verify response signature with same algorithm
 *
 * Card data never passes through our server — only the redirect form.
 */

const TRANSACTION_TYPE = "0"; // Standard authorization
const CURRENCY = "978"; // EUR

/** Convert euro amount to cents string for Redsys (e.g. 12.50 → "1250") */
export function toCents(euros: number): string {
  return String(Math.round(euros * 100));
}

/** Encode merchant parameters object as Base64url string. */
export function encodeMerchantParameters(
  data: Record<string, string>
): string {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

/** Decode Base64url merchant parameters back to object. */
export function decodeMerchantParameters(
  encoded: string
): Record<string, string> {
  return JSON.parse(
    Buffer.from(encoded, "base64url").toString("utf-8")
  ) as Record<string, string>;
}

/**
 * Derive order-specific encryption key via 3DES-CBC.
 * The Redsys secret key is Base64-encoded; the order number is zero-padded to 16 bytes.
 */
export function encrypt3DES(secretKeyBase64: string, orderNumber: string): Buffer {
  const key = Buffer.from(secretKeyBase64, "base64");
  const iv = Buffer.alloc(8, 0); // 8-byte zero IV per Redsys spec
  const orderPadded = Buffer.alloc(16, 0);
  Buffer.from(orderNumber, "utf-8").copy(orderPadded);

  const cipher = createCipheriv("des-ede3-cbc", key, iv);
  cipher.setAutoPadding(false);
  return Buffer.concat([cipher.update(orderPadded), cipher.final()]);
}

/** HMAC-SHA256 of merchantParameters with the order-derived key. Returns Base64url. */
export function signRequest(
  merchantParametersB64: string,
  orderKey: Buffer
): string {
  const hmac = createHmac("sha256", orderKey);
  hmac.update(merchantParametersB64);
  return hmac.digest("base64url");
}

/**
 * Verify a Redsys response signature.
 * Re-derives the order key from the secret + order number,
 * then compares HMAC of the encoded params against the received signature.
 */
export function verifySignature(
  encodedParams: string,
  receivedSignature: string,
  secretKeyBase64: string,
  orderNumber: string
): boolean {
  const orderKey = encrypt3DES(secretKeyBase64, orderNumber);
  const expected = signRequest(encodedParams, orderKey);

  const sigBuf = Buffer.from(receivedSignature, "base64url");
  const expBuf = Buffer.from(expected, "base64url");

  if (sigBuf.length !== expBuf.length) return false;
  return timingSafeEqual(sigBuf, expBuf);
}

interface RedsysFormOptions {
  orderNumber: string;
  amount: number;
  merchantCode: string;
  terminal: string;
  secretKey: string;
  redsysUrl: string;
  merchantUrl: string; // notification callback URL
  okUrl: string; // redirect on success
  koUrl: string; // redirect on failure
}

interface RedsysFormData {
  url: string;
  fields: {
    Ds_SignatureVersion: string;
    Ds_MerchantParameters: string;
    Ds_Signature: string;
  };
}

/** Build the form payload for the Redsys redirect. */
export function getRedsysFormData(options: RedsysFormOptions): RedsysFormData {
  const merchantParams: Record<string, string> = {
    Ds_Merchant_Amount: toCents(options.amount),
    Ds_Merchant_Order: options.orderNumber,
    Ds_Merchant_MerchantCode: options.merchantCode,
    Ds_Merchant_Terminal: options.terminal,
    Ds_Merchant_TransactionType: TRANSACTION_TYPE,
    Ds_Merchant_Currency: CURRENCY,
    Ds_Merchant_MerchantURL: options.merchantUrl,
    Ds_Merchant_UrlOK: options.okUrl,
    Ds_Merchant_UrlKO: options.koUrl,
  };

  const encoded = encodeMerchantParameters(merchantParams);
  const orderKey = encrypt3DES(options.secretKey, options.orderNumber);
  const signature = signRequest(encoded, orderKey);

  return {
    url: options.redsysUrl,
    fields: {
      Ds_SignatureVersion: "HMAC_SHA256_V1",
      Ds_MerchantParameters: encoded,
      Ds_Signature: signature,
    },
  };
}
