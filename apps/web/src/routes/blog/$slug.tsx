import { createFileRoute, notFound } from "@tanstack/react-router";
import { type BlogPost, getBlogPost } from "~/lib/blog";
import BlogPostPage from "~/pages/blog/blog-post";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    const post = (loaderData as { post: BlogPost } | undefined)?.post;
    if (!post) {
      return {
        meta: [
          { title: "Artículo no encontrado - Óptica Suárez" },
          { name: "description", content: "El artículo que buscas no existe." },
        ],
      };
    }

    return {
      meta: [
        { title: `${post.title} - Óptica Suárez` },
        { name: "description", content: post.excerpt },
        {
          property: "og:title",
          content: `${post.title} - Óptica Suárez`,
        },
        {
          property: "og:description",
          content: post.excerpt,
        },
        {
          property: "og:url",
          content: `https://opticasuarezjaen.es/blog/${post.slug}`,
        },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://opticasuarezjaen.es/blog/${post.slug}`,
        },
      ],
    };
  },
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const loaderData = Route.useLoaderData() as { post: BlogPost };
  return <BlogPostPage post={loaderData.post} />;
}
