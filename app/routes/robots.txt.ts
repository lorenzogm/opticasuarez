import type { LoaderFunctionArgs } from 'react-router';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const domain = url.origin;

  const robotsContent = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Sitemap location',
    `Sitemap: ${domain}/sitemap.xml`,
    '',
    '# Crawl delay (optional - not usually needed for small sites)',
    '# Crawl-delay: 1',
  ].join('\n');

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
};
