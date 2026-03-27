import { createFileRoute, notFound } from "@tanstack/react-router";
import { getBlogPost } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
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

    return buildHeadFromSanitySeo({
      seo: post.seo,
      path: `/blog/${post.slug}`,
      fallback: {
        title: `${post.title} - Óptica Suárez`,
        description: post.excerpt || "",
        keywords: post.categories
          ? `${post.categories.join(", ")}, óptica Jaén, salud visual Jaén`
          : "óptica Jaén, salud visual Jaén",
      },
    });
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
