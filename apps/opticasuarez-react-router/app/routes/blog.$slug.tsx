import { useLoaderData } from "react-router";
import type { BlogPost as BlogPostType } from "../ui/lib/blog";
import { getBlogPost } from "../ui/lib/blog";
import BlogPost from "../ui/pages/blog/blog-post";

export async function loader({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    throw new Response("Blog post not found", { status: 404 });
  }

  return { post };
}

export function links({ context }: { context?: { post?: BlogPostType } } = {}) {
  // Access the post from the loader data passed via context
  if (context?.post?.slug) {
    return [
      {
        rel: "canonical",
        href: `https://opticasuarezjaen.es/blog/${context.post.slug}`,
      },
    ];
  }
  return [];
}

export function meta({ data }: { data: { post: BlogPostType } | null }) {
  if (!data?.post) {
    return [
      { title: "Artículo no encontrado - Óptica Suárez" },
      { name: "description", content: "El artículo que buscas no existe." },
    ];
  }

  return [
    { title: `${data.post.title} - Óptica Suárez` },
    { name: "description", content: data.post.excerpt },
    ...(data.post.keywords
      ? [{ name: "keywords", content: data.post.keywords }]
      : []),
    { property: "og:type", content: "article" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: `${data.post.title} - Óptica Suárez`,
    },
    {
      property: "og:description",
      content: data.post.excerpt,
    },
    {
      property: "og:url",
      content: `https://opticasuarezjaen.es/blog/${data.post.slug}`,
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `${data.post.title} - Óptica Suárez`,
    },
    {
      name: "twitter:description",
      content: data.post.excerpt,
    },
    { name: "robots", content: "index, follow" },
  ];
}

interface LoaderData {
  post: BlogPostType;
}

export default function BlogPostRoute() {
  const { post } = useLoaderData<LoaderData>();

  return <BlogPost post={post} />;
}
