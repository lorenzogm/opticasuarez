import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getBlogPosts } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { getBaseUrl } from "~/lib/utils";
import Blog from "~/pages/blog/blog";

interface BlogSearch {
  category?: string;
}

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () =>
    buildHeadFromSanitySeo({
      seo: null,
      path: "/blog",
      fallback: {
        title: "Blog de Salud Visual y Óptica en Jaén | Óptica Suárez",
        description:
          "Descubre consejos de salud visual, neurodesarrollo infantil y novedades en optometría. Blog de Óptica Suárez en Jaén: información útil sobre visión y bienestar ocular para todas las edades.",
        keywords:
          "óptica en Jaén, salud visual Jaén, blog optometría Jaén, consejos visión Jaén",
      },
    }),
  loader: async () => {
    const articles = await getBlogPosts();
    return { articles };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const { articles } = Route.useLoaderData() as { articles: any[] };
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Blog", url: `${getBaseUrl()}/blog` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Blog articles={articles} />
    </>
  );
}
