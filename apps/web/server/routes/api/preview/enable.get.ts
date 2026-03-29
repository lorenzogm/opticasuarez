/**
 * GET /api/preview/enable?secret=<SANITY_PREVIEW_SECRET>&redirect=<path>
 *
 * Called by Sanity Presentation tool to enable draft-content preview.
 * Validates the shared secret, sets a preview cookie, and redirects
 * the iframe to the requested page.
 */
import {
  defineEventHandler,
  getQuery,
  sendRedirect,
  setCookie,
  setResponseStatus,
} from "nitro/h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const secret = query.secret as string | undefined;
  const redirect = (query.redirect as string) || "/";

  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;

  if (!expectedSecret) {
    setResponseStatus(event, 500);
    return { error: "SANITY_PREVIEW_SECRET not configured" };
  }

  if (!secret || secret !== expectedSecret) {
    setResponseStatus(event, 401);
    return { error: "Invalid preview secret" };
  }

  setCookie(event, "__sanity_preview", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60,
  });

  return sendRedirect(event, redirect, 307);
});
