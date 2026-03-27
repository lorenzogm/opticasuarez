import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import Ortoqueratologia from "~/pages/ortoqueratologia/ortoqueratologia";

export const Route = createFileRoute("/ortoqueratologia")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/ortoqueratologia",
      fallback: {
        title: "Ortoqueratología en Jaén | Óptica Suárez",
        description:
          "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
        keywords:
          "ortoqueratología Jaén, orto-k Jaén, lentes nocturnas Jaén, frenar miopía sin gafas Jaén",
      },
    });
  },
  loader: async () => {
    const data = await getServicePage("ortoqueratologia");
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return <Ortoqueratologia data={data} />;
}
