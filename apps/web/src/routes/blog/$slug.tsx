import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPostPage from "~/components/blog/blog-post";
import { BreadcrumbSchema } from "~/components/structured-data";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchBlogPost } from "~/lib/server-fns";
import { buildBlogPostBreadcrumbItems } from "~/lib/structured-data-helpers";

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
    const { post } = await fetchBlogPost({ data: params.slug });
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
  const breadcrumbItems = buildBlogPostBreadcrumbItems({
    slug: loaderData.post.slug,
    title: loaderData.post.title,
  });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogPostPage post={loaderData.post} />
    </>
  );
}
