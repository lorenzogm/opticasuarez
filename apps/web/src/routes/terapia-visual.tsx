import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { getBaseUrl } from "~/lib/utils";
import TerapiaVisual from "~/pages/terapia-visual/terapia-visual";

export const Route = createFileRoute("/terapia-visual")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/terapia-visual",
      fallback: {
        title:
          "Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez",
        description:
          "Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.",
        keywords:
          "terapia visual Jaén, ojo vago Jaén, estrabismo Jaén, entrenamiento visual Jaén",
      },
    });
  },
  loader: async () => {
    const data = await getServicePage("terapia-visual");
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Servicios", url: `${getBaseUrl()}/servicios` },
    {
      name: "Terapia Visual",
      url: `${getBaseUrl()}/terapia-visual`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <TerapiaVisual data={data} />
    </>
  );
}
