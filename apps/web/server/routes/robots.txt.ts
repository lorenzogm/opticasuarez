import { defineEventHandler, setResponseHeaders } from "nitro/h3";

const domain =
  process.env.VITE_BASE_URL?.replace(/\/+$/, "") ||
  "https://opticasuarezjaen.es";

export default defineEventHandler((event) => {
  const robotsContent = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Sitemap location",
    `Sitemap: ${domain}/sitemap.xml`,
  ].join("\n");

  setResponseHeaders(event, {
    "Content-Type": "text/plain",
    "Cache-Control": "public, max-age=86400",
  });

  return robotsContent;
});
