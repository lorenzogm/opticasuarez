import { createFileRoute, notFound } from "@tanstack/react-router";
import { getBlogPost } from "~/lib/sanity";
import { getBaseUrl } from "~/lib/utils";
import BlogPostPage from "~/pages/blog/blog-post";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data shape
    const post = (loaderData as { post: any } | undefined)?.post;
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
          content: `${getBaseUrl()}/blog/${post.slug}`,
        },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        {
          rel: "canonical",
          href: `${getBaseUrl()}/blog/${post.slug}`,
        },
      ],
    };
  },
  loader: async ({ params }) => {
    const post = await getBlogPost(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const loaderData = Route.useLoaderData() as { post: any };
  return <BlogPostPage post={loaderData.post} />;
}
