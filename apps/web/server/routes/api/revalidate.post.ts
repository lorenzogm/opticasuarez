/**
 * POST /api/revalidate
 *
 * Receives Sanity webhook events on document publish and triggers a GitHub
 * Actions workflow so that prerendered pages are rebuilt with fresh CMS content.
 *
 * Required environment variables:
 *   SANITY_WEBHOOK_SECRET  — shared secret for HMAC-SHA256 signature verification
 *   GITHUB_DEPLOY_TOKEN    — GitHub PAT with actions:write scope
 *
 * Sanity webhook setup (sanity.io/manage → project → API → Webhooks):
 *   URL:        https://opticasuarezjaen.es/api/revalidate
 *   Dataset:    production
 *   Trigger on: Create, Update, Delete
 *   Projection: { _type, _id, "slug": slug.current, "path": path.current }
 *   Secret:     (paste the same value as SANITY_WEBHOOK_SECRET)
 *   HTTP method: POST
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  defineEventHandler,
  readRawBody,
  setResponseHeaders,
  setResponseStatus,
} from "nitro/h3";

const SIGNATURE_HEADER = "sanity-webhook-signature";

function isValidSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hmac = createHmac("sha256", secret);
  hmac.update(body);
  const expected = hmac.digest("base64");

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);

  if (sigBuf.length !== expBuf.length) return false;
  return timingSafeEqual(sigBuf, expBuf);
}

interface WebhookPayload {
  _type: string;
  _id?: string;
  slug?: string;
  path?: string;
}

function getAffectedPaths(doc: WebhookPayload): string[] {
  switch (doc._type) {
    case "homepage":
      return ["/"];
    case "blogPost":
      return ["/blog", doc.slug ? `/blog/${doc.slug}` : ""].filter(Boolean);
    case "page":
      return doc.path ? [`/${doc.path.replace(/^\//, "")}`] : [];
    case "product":
      return ["/tienda", doc.slug ? `/tienda/${doc.slug}` : ""].filter(Boolean);
    case "productCategory":
    case "brand":
      return ["/tienda"];
    case "service":
    case "location":
      return ["/"];
    case "siteSettings":
      return ["*"];
    default:
      return [];
  }
}

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, { "Content-Type": "application/json" });

  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    setResponseStatus(event, 500);
    return { error: "SANITY_WEBHOOK_SECRET not configured" };
  }

  const githubToken = process.env.GITHUB_DEPLOY_TOKEN;
  if (!githubToken) {
    setResponseStatus(event, 500);
    return { error: "GITHUB_DEPLOY_TOKEN not configured" };
  }

  const rawBody = await readRawBody(event);
  const signature = event.headers.get(SIGNATURE_HEADER);

  if (!(rawBody && signature && isValidSignature(rawBody, signature, secret))) {
    setResponseStatus(event, 401);
    return { error: "Invalid signature" };
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    setResponseStatus(event, 400);
    return { error: "Invalid JSON payload" };
  }

  const affectedPaths = getAffectedPaths(payload);

  const deployResponse = await fetch(
    "https://api.github.com/repos/lorenzogm/opticasuarez/actions/workflows/web-vercel-deploy.yml/dispatches",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${githubToken}`,
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );

  if (!deployResponse.ok) {
    setResponseStatus(event, 502);
    return { error: "Failed to trigger deploy" };
  }

  return {
    message: "Deploy triggered",
    documentType: payload._type,
    documentId: payload._id,
    affectedPaths,
  };
});
