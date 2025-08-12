import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import type { Route } from "./+types/sitemap.xml";

export const loader = async ({ request: _request }: Route.LoaderArgs) => {
  const { routes } = await import("virtual:react-router/server-build");
  // Use production domain for consistency
  const domain = "https://opticasuarezjaen.es";
  const sitemap = await generateRemixSitemap({
    domain,
    ignore: [
      // Add any routes you want to exclude from the sitemap
      // Like API endpoints or admin pages
    ],
    // @ts-expect-error Type mismatch, maybe related to a stricter type mentioned in release notes for v.7.0.0
    // https://github.com/forge-42/seo-tools/issues/8
    routes,
  });

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};