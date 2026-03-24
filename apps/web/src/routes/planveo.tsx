import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getPlanVeoPage } from "~/lib/sanity";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
import PlanVeo from "~/pages/plan-veo/plan-veo";

const planVeoKeywords = generatePageKeywords("plan-veo");

export const Route = createFileRoute("/planveo")({
  head: () => ({
    meta: [
      { title: "Plan VEO en Jaén | Óptica Suárez" },
      {
        name: "description",
        content:
          "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords([
          ...planVeoKeywords,
          "plan veo jaen",
          "plan veo optica jaen",
          "ayuda gafas niños jaen",
          "ayuda lentillas niños jaen",
          "gafas infantiles plan veo jaen",
          "ministerio sanidad plan veo jaen",
          "optica plan veo jaen",
          "tramitar plan veo jaen",
          "solicitar plan veo jaen",
          "plan veo ministerio sanidad jaen",
        ]),
      },
      {
        property: "og:title",
        content: "Plan VEO en Jaén | Óptica Suárez",
      },
      {
        property: "og:description",
        content:
          "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
      },
      {
        property: "og:url",
        content: `${getBaseUrl()}/planveo`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${getBaseUrl()}/planveo` }],
  }),
  loader: async () => {
    const data = await getPlanVeoPage();
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
      name: "Plan VEO",
      url: `${getBaseUrl()}/planveo`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <PlanVeo data={data} />
    </>
  );
}
