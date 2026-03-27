import { createFileRoute } from "@tanstack/react-router";
import { getFeaturedProducts, getHomepage, getProducts } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import Homepage from "~/pages/homepage/homepage";

export const Route = createFileRoute("/")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.homepage;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/",
      fallback: {
        title: "Óptica en Jaén | Óptica Suárez - Desde 1940 cuidando tu visión",
        description:
          "Tu óptica en Jaén con más de 80 años de experiencia. Especialistas en revisión visual, terapia visual, control de miopía, lentes de contacto, visión infantil y deportiva.",
        keywords:
          "óptica en Jaén, optometría Jaén, revisión visual Jaén, terapia visual Jaén, control de miopía Jaén, lentes de contacto Jaén, ojo vago Jaén, estrabismo Jaén",
      },
    });
  },
  loader: async () => {
    const [homepage, featuredProducts, allProducts] = await Promise.all([
      getHomepage(),
      getFeaturedProducts(),
      getProducts(),
    ]);
    // Use featured products, fallback to 4 most recent if none featured
    const featured = featuredProducts as Record<string, unknown>[];
    const all = allProducts as Record<string, unknown>[];
    const products = featured?.length > 0 ? featured : (all || []).slice(0, 4);
    return { homepage, featuredProducts: products };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { homepage, featuredProducts } = Route.useLoaderData();
  return <Homepage data={homepage} featuredProducts={featuredProducts} />;
}
