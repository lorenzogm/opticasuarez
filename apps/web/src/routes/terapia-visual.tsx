import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getServicePage } from "~/lib/sanity";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
import TerapiaVisual from "~/pages/terapia-visual/terapia-visual";

const terapiaVisualKeywords = generatePageKeywords("terapia-visual");

export const Route = createFileRoute("/terapia-visual")({
  head: () => ({
    meta: [
      {
        title:
          "Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez",
      },
      {
        name: "description",
        content:
          "Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(terapiaVisualKeywords),
      },
      {
        property: "og:title",
        content:
          "Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez",
      },
      {
        property: "og:description",
        content:
          "Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.",
      },
      {
        property: "og:url",
        content: `${getBaseUrl()}/terapia-visual`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${getBaseUrl()}/terapia-visual` }],
  }),
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
