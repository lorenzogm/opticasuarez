import {
  defineEventHandler,
  getRequestURL,
  setResponseHeaders,
} from "nitro/h3";

const PRODUCTION_DOMAIN = "opticasuarezjaen.es";

export default defineEventHandler((event) => {
  const requestHost = getRequestURL(event).hostname;
  const isProduction =
    requestHost === PRODUCTION_DOMAIN ||
    requestHost === `www.${PRODUCTION_DOMAIN}`;

  const robotsContent = isProduction
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        "# Block booking flow from indexing",
        "Disallow: /cita",
        "",
        "# Sitemap location",
        `Sitemap: https://${PRODUCTION_DOMAIN}/sitemap.xml`,
      ].join("\n")
    : [
        "# Non-production deployment — block all crawlers",
        "User-agent: *",
        "Disallow: /",
      ].join("\n");

  setResponseHeaders(event, {
    "Content-Type": "text/plain",
    "Cache-Control": "public, max-age=86400",
  });

  return robotsContent;
});
