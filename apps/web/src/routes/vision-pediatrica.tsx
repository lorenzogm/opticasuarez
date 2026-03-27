import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { getBaseUrl } from "~/lib/utils";
import VisionPediatrica from "~/pages/vision-pediatrica/vision-pediatrica";

export const Route = createFileRoute("/vision-pediatrica")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/vision-pediatrica",
      fallback: {
        title:
          "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
        description:
          "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
        keywords:
          "visión pediátrica Jaén, examen visual infantil Jaén, óptica infantil Jaén, ojo vago niños Jaén",
      },
    });
  },
  loader: async () => {
    const data = await getServicePage("vision-pediatrica");
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
      name: "Visión Infantil",
      url: `${getBaseUrl()}/vision-pediatrica`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <VisionPediatrica data={data} />
    </>
  );
}
