import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import ControlDeMiopia from "~/pages/control-de-miopia/control-de-miopia";

export const Route = createFileRoute("/control-de-miopia")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/control-de-miopia",
      fallback: {
        title: "Control de Miopía Jaén - Óptica Suárez",
        description:
          "Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.",
        keywords:
          "control miopía Jaén, frenar miopía Jaén, miopía infantil Jaén, ortoqueratología Jaén",
      },
    });
  },
  loader: async () => {
    const data = await getServicePage("control-de-miopia");
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return <ControlDeMiopia data={data} />;
}
