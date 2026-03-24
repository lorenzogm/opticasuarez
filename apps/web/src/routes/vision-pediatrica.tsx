import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getServicePage } from "~/lib/sanity";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
import VisionPediatrica from "~/pages/vision-pediatrica/vision-pediatrica";

const visionPediatricaKeywords = generatePageKeywords("vision-pediatrica");

export const Route = createFileRoute("/vision-pediatrica")({
  head: () => ({
    meta: [
      {
        title:
          "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
      },
      {
        name: "description",
        content:
          "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(visionPediatricaKeywords),
      },
      {
        property: "og:title",
        content:
          "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
      },
      {
        property: "og:description",
        content:
          "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
      },
      {
        property: "og:url",
        content: `${getBaseUrl()}/vision-pediatrica`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: `${getBaseUrl()}/vision-pediatrica`,
      },
    ],
  }),
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
