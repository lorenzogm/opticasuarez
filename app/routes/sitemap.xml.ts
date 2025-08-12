import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap';
import type { LoaderFunctionArgs } from 'react-router';

export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  // For React Router v7, we need to import the routes differently
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routes = (globalThis as any).__remixServerBuild?.routes || {};

  // Use production domain for consistency
  const domain = 'https://opticasuarezjaen.es';
  const sitemap = await generateRemixSitemap({
    domain,
    ignore: [
      // Add any routes you want to exclude from the sitemap
      // Like API endpoints or admin pages
    ],
    routes,
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
