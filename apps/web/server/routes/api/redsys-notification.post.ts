/**
 * POST /api/redsys-notification
 *
 * Receives Redsys payment notification callbacks.
 *
 * Protocol:
 * 1. Parse form body: Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature
 * 2. Decode merchant parameters to extract Ds_Order and Ds_Response
 * 3. Verify HMAC-SHA256 signature with merchant secret key
 * 4. Update order in Sanity based on response code
 * 5. Always return HTTP 200 (per Redsys specification)
 *
 * Response codes: 0000–0099 = success, anything else = failure
 */
import {
  defineEventHandler,
  readBody,
  setResponseHeaders,
  setResponseStatus,
} from "nitro/h3";
import { sendOrderEmails } from "~/actions/send-order-emails";
import { decodeMerchantParameters, verifySignature } from "~/lib/redsys";
import { getOrderByNumber, sanityPatch } from "~/lib/sanity";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, { "Content-Type": "application/json" });

  const secretKey = process.env.REDSYS_SECRET_KEY;
  if (!secretKey) {
    console.error("[redsys-notification] REDSYS_SECRET_KEY not configured");
    setResponseStatus(event, 200);
    return { ok: false };
  }

  let body: Record<string, string>;
  try {
    body = (await readBody(event)) as Record<string, string>;
  } catch {
    setResponseStatus(event, 200);
    return { ok: false, error: "Invalid body" };
  }

  const encodedParams = body.Ds_MerchantParameters;
  const receivedSignature = body.Ds_Signature;

  if (!(encodedParams && receivedSignature)) {
    setResponseStatus(event, 200);
    return { ok: false, error: "Missing parameters" };
  }

  // Decode to get order number and response code
  let params: Record<string, string>;
  try {
    params = decodeMerchantParameters(encodedParams);
  } catch {
    setResponseStatus(event, 200);
    return { ok: false, error: "Invalid merchant parameters" };
  }

  const orderNumber = params.Ds_Order;
  const responseCode = params.Ds_Response;

  if (!(orderNumber && responseCode)) {
    setResponseStatus(event, 200);
    return { ok: false, error: "Missing order or response code" };
  }

  // Verify signature
  const isValid = verifySignature(
    encodedParams,
    receivedSignature,
    secretKey,
    orderNumber
  );

  if (!isValid) {
    console.error(
      `[redsys-notification] Invalid signature for order ${orderNumber}`
    );
    setResponseStatus(event, 200);
    return { ok: false, error: "Invalid signature" };
  }

  // Response codes 0000-0099 = success
  const responseNum = Number.parseInt(responseCode, 10);
  const isSuccess = responseNum >= 0 && responseNum <= 99;

  // Find the order in Sanity
  try {
    const order = await getOrderByNumber(orderNumber);
    if (!order?._id) {
      console.error(`[redsys-notification] Order not found: ${orderNumber}`);
      setResponseStatus(event, 200);
      return { ok: false, error: "Order not found" };
    }

    const patchData: Record<string, unknown> = {
      status: isSuccess ? "paid" : "failed",
      redsysData: {
        responseCode,
        authCode: params.Ds_AuthorisationCode || "",
        date: new Date().toISOString(),
      },
    };

    await sanityPatch(order._id as string, patchData);

    // Send confirmation emails on successful payment (non-blocking)
    if (isSuccess) {
      try {
        await sendOrderEmails({
          orderNumber,
          items: (order.items as Record<string, unknown>[]).map((item) => ({
            name: item.name as string,
            quantity: item.quantity as number,
            price: item.price as number,
            color: item.color as { name: string } | undefined,
            brand: item.brand as string | undefined,
          })),
          customer: order.customer as {
            nombre: string;
            email: string;
            telefono: string;
            nif?: string;
            direccion: string;
            codigoPostal: string;
            ciudad: string;
            provincia: string;
          },
          shipping: order.shipping as { method: string; cost: number },
          totals: order.totals as {
            subtotal: number;
            shipping: number;
            total: number;
          },
          redsysAuthCode: params.Ds_AuthorisationCode,
        });
      } catch (emailErr) {
        console.error(
          `[redsys-notification] Failed to send emails for ${orderNumber}:`,
          emailErr
        );
      }
    }
  } catch (err) {
    console.error(
      `[redsys-notification] Error updating order ${orderNumber}:`,
      err
    );
    setResponseStatus(event, 200);
    return { ok: false, error: "Internal error" };
  }

  setResponseStatus(event, 200);
  return { ok: true };
});
