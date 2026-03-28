import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import ProductDetail from "~/components/tienda/product-detail";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchProduct, fetchSiteSettings } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";

export const Route = createFileRoute("/tienda/$slug")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const product = (loaderData as any)?.product;
    if (!product) return {};
    const brandName = product.brand?.name;
    return buildHeadFromSanitySeo({
      seo: product.seo,
      path: `/tienda/${product.slug}`,
      fallback: {
        title: brandName
          ? `${product.name} | ${brandName} - Óptica Suárez`
          : `${product.name} - Óptica Suárez`,
        description:
          product.description?.[0]?.children?.[0]?.text ??
          `${product.name} disponible en Óptica Suárez Jaén.`,
        keywords: [
          product.name,
          brandName,
          product.category?.name,
          "tienda óptica Jaén",
        ]
          .filter(Boolean)
          .join(", "),
      },
    });
  },
  loader: async ({ params }) => {
    const { settings } = await fetchSiteSettings();
    if (!settings?.featureFlags?.shopEnabled) {
      throw new Error("Page not found");
    }
    return fetchProduct({ data: params.slug });
  },
  component: RouteComponent,
});

function RouteComponent() {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const { product } = Route.useLoaderData() as { product: any };

  if (!product) {
    return (
      <main className="py-24 text-center">
        <h1 className="font-bold text-2xl text-gray-900">
          Producto no encontrado
        </h1>
        <p className="mt-2 text-gray-500">
          El producto que buscas no existe o ha sido eliminado.
        </p>
      </main>
    );
  }

  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Tienda", url: `${getBaseUrl()}/tienda` },
    ...(product.category
      ? [
          {
            name: product.category.name,
            url: `${getBaseUrl()}/tienda?categoria=${product.category.slug}`,
          },
        ]
      : []),
    {
      name: product.name,
      url: `${getBaseUrl()}/tienda/${product.slug}`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductDetail product={product} />
    </>
  );
}
