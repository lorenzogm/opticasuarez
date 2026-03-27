import { defineEventHandler, setResponseHeaders } from "nitro/h3";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2026-03-23";
const SANITY_CDN_URL = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

const domain =
  process.env.VITE_BASE_URL?.replace(/\/+$/, "") ||
  "https://opticasuarezjaen.es";

const staticRoutes = [
  "/",
  "/quienes-somos",
  "/servicios",
  "/servicios/vision-deportiva",
  "/servicios/control-de-miopia",
  "/servicios/vision-pediatrica",
  "/servicios/terapia-visual",
  "/servicios/contactologia",
  "/servicios/examen-visual",
  "/servicios/ortoqueratologia",
  "/planveo",
  "/contacto",
  "/blog",
];

async function fetchBlogSlugs(): Promise<string[]> {
  const query = '*[_type == "blogPost"]{ "slug": slug.current }';
  const url = new URL(SANITY_CDN_URL);
  url.searchParams.set("query", query);

  const res = await fetch(url.toString());
  if (!res.ok) return [];

  const json = (await res.json()) as {
    result: { slug: string }[];
  };
  return (json.result || []).map((item) => item.slug);
}

export default defineEventHandler(async (event) => {
  const blogSlugs = await fetchBlogSlugs();
  const allRoutes = [
    ...staticRoutes,
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ];

  const today = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  setResponseHeaders(event, {
    "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=86400",
  });

  return sitemap;
});
