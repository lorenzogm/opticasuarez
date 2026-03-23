import type { Config } from '@react-router/dev/config';
import { getBlogPosts } from './app/ui/lib/blog';

export default {
  // Enable SSR to support the dynamic sitemap route
  ssr: true,
  // basename: '/',
  async prerender() {
    const blogPosts = getBlogPosts();
    const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

    // Return list of URLs to prerender at build time for static hosting
    // This generates static HTML files that match the navigation link structure
    return [
      '/',
      '/blog',
      // Booking routes with Spanish names
      '/cita',
      '/cita/centro',
      '/cita/horario', 
      '/cita/contacto',
      '/cita/confirmacion',
      '/quienes-somos',
      '/servicios',
      '/vision-deportiva',
      '/control-de-miopia',
      '/vision-pediatrica',
      '/terapia-visual',
      '/contactologia',
      '/examen-visual',
      '/ortoqueratologia',
      '/contacto',
      ...blogRoutes,
      // Exclude sitemap.xml from prerendering as it's a dynamic resource route
      // '/sitemap.xml',
    ];
  },
} satisfies Config;
