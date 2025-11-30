import { useLoaderData } from 'react-router';
import { getBlogPost } from '../ui/lib/blog';
import BlogPost from '../ui/pages/blog/blog-post';
import type { BlogPost as BlogPostType } from '../ui/lib/blog';

export async function loader({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    throw new Response('Blog post not found', { status: 404 });
  }

  return { post };
}

export function links({ context }: { context?: { post?: BlogPostType } } = {}) {
  // Access the post from the loader data passed via context
  if (context?.post?.slug) {
    return [
      { rel: 'canonical', href: `https://opticasuarezjaen.es/blog/${context.post.slug}` },
    ];
  }
  return [];
}

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
  ];
}

interface LoaderData {
  post: BlogPostType;
}

export default function BlogPostRoute() {
  const { post } = useLoaderData<LoaderData>();

  return <BlogPost post={post} />;
}
