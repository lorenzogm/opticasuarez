import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import Tienda from "~/components/tienda/tienda";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchTiendaData } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";

interface TiendaSearch {
  q?: string;
  categoria?: string;
  marca?: string;
  genero?: string;
  precioMin?: number;
  precioMax?: number;
}

export const Route = createFileRoute("/tienda/")({
  validateSearch: (search: Record<string, unknown>): TiendaSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    categoria:
      typeof search.categoria === "string" ? search.categoria : undefined,
    marca: typeof search.marca === "string" ? search.marca : undefined,
    genero: typeof search.genero === "string" ? search.genero : undefined,
    precioMin:
      typeof search.precioMin === "number" ? search.precioMin : undefined,
    precioMax:
      typeof search.precioMax === "number" ? search.precioMax : undefined,
  }),
  head: () =>
    buildHeadFromSanitySeo({
      seo: null,
      path: "/tienda",
      fallback: {
        title: "Tienda Online | Óptica Suárez Jaén",
        description:
          "Compra online monturas, gafas de sol, lentillas y productos de salud ocular en Óptica Suárez Jaén. Las mejores marcas con asesoramiento profesional.",
        keywords:
          "tienda óptica Jaén, gafas online Jaén, monturas Jaén, gafas de sol Jaén, lentillas online, Óptica Suárez tienda",
      },
    }),
  loader: () => fetchTiendaData(),
  component: RouteComponent,
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
  const products = (loaderData as any).products as unknown[];
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
  const categories = (loaderData as any).categories as unknown[];
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
  const brands = (loaderData as any).brands as unknown[];
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Tienda", url: `${getBaseUrl()}/tienda` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Tienda brands={brands} categories={categories} products={products} />
    </>
  );
}
