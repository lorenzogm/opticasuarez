import { useLoaderData } from 'react-router';
import { getBlogPost } from '../ui/lib/blog';
import BlogPost from '../ui/pages/blog/blog-post';
import type { BlogPost as BlogPostType } from '../ui/lib/blog';

export function meta({ data }: { data: { post: BlogPostType } | null }) {
  if (!data?.post) {
    return [
      { title: 'Artículo no encontrado - Óptica Suárez' },
      { name: 'description', content: 'El artículo que buscas no existe.' },
    ];
  }

  return [
    { title: `${data.post.title} - Óptica Suárez` },
    { name: 'description', content: data.post.excerpt },
    {
      property: 'og:title',
      content: `${data.post.title} - Óptica Suárez`,
    },
    {
      property: 'og:description',
      content: data.post.excerpt,
    },
    {
      property: 'og:url',
      content: `https://opticasuarezjaen.es/blog/${data.post.slug}`,
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: `https://opticasuarezjaen.es/blog/${data.post.slug}` },
  ];
}

export async function loader({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    throw new Response('Blog post not found', { status: 404 });
  }

  return { post };
}

interface LoaderData {
  post: BlogPostType;
}

export default function BlogPostRoute() {
  const { post } = useLoaderData<LoaderData>();

  return <BlogPost post={post} />;
}
