import type { LoaderFunctionArgs } from 'react-router';
import { getBlogPosts } from '../ui/lib/blog';

export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  // Get blog posts for dynamic routes
  const blogPosts = getBlogPosts();
  
  // Use production domain for consistency
  const domain = 'https://opticasuarezjaen.es';
  
  // Define all legitimate routes - this ensures we only include real pages
  const routes = [
    '/',
    '/quienes-somos',
    '/servicios',
    '/vision-deportiva',
    '/control-de-miopia',
    '/vision-pediatrica',
    '/terapia-visual',
    '/contactologia',
    '/examen-visual',
    '/ortoqueratologia',
    '/planveo',
    '/contacto',
    '/blog',
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];

  // Generate sitemap XML manually to ensure full control
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
