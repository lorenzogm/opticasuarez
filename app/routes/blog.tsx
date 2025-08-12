import Blog from '../ui/pages/blog/blog';
import { getBlogPosts } from '../ui/lib/blog';
import { BreadcrumbSchema } from '../ui/components/structured-data';

export function meta() {
  return [
    { title: 'Blog - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Conoce todas las novedades y noticias referentes a la óptica y optometría en Jaén y resto del mundo.',
    },
    {
      property: 'og:title',
      content: 'Blog - Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        'Conoce todas las novedades y noticias referentes a la óptica y optometría en Jaén y resto del mundo.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/blog',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/blog' },
  ];
}

export async function loader() {
  const articles = getBlogPosts();
  return { articles };
}

export default function BlogRoute() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Blog', url: 'https://opticasuarezjaen.es/blog' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Blog />
    </>
  );
}
