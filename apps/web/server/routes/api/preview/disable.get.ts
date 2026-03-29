/**
 * GET /api/preview/disable
 *
 * Clears the preview cookie and redirects to the homepage.
 */
import { defineEventHandler, deleteCookie, sendRedirect } from "nitro/h3";

export default defineEventHandler(async (event) => {
  deleteCookie(event, "__sanity_preview", {
    path: "/",
  });

  return sendRedirect(event, "/", 307);
});
