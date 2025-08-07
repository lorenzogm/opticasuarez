import type { Config } from '@react-router/dev/config';
import { getBlogPosts } from './app/ui/lib/blog';

export default {
  ssr: false, // Disable SSR for static prerendering
  // basename: '/',
  async prerender() {
    const blogPosts = getBlogPosts();
    const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

    // Return list of URLs to prerender at build time for static hosting
    // This generates static HTML files that match the navigation link structure
    return [
      '/',
      '/blog',
      '/book',
      '/book/step2',
      '/book/step3',
      '/book/step4',
      '/quienes-somos',
      '/servicios',
      '/vision-deportiva',
      '/control-de-miopia',
      '/vision-pediatrica',
      '/terapia-visual',
      '/contactologia',
      '/examen-visual',
      '/contacto',
      ...blogRoutes,
    ];
  },
} satisfies Config;
