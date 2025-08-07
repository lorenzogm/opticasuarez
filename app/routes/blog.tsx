import Blog from '../ui/pages/blog/blog';
import { getBlogPosts } from '../ui/lib/blog';

export function meta() {
  return [
    { title: 'Blog - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Blog de Óptica Suárez con artículos de interés sobre salud visual, cuidado de los ojos y novedades en óptica.',
    },
  ];
}

export async function loader() {
  const articles = getBlogPosts();
  return { articles };
}

export default function BlogRoute() {
  return <Blog />;
}
