import type { Config } from '@react-router/dev/config';
import { getBlogPosts } from './app/ui/lib/blog';

export default {
  ssr: true,
  basename: process.env.NODE_ENV === 'production' ? '/opticasuarez-new/' : '/',
  async prerender() {
    const blogPosts = getBlogPosts();
    const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

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
