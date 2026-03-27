import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchPlanVeoPage } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";
import PlanVeo from "~/pages/plan-veo/plan-veo";

export const Route = createFileRoute("/planveo")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/planveo",
      fallback: {
        title: "Plan VEO en Jaén | Óptica Suárez",
        description:
          "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
        keywords:
          "plan veo Jaén, ayuda gafas niños Jaén, plan veo óptica Jaén, ministerio sanidad plan veo",
      },
    });
  },
  loader: () => fetchPlanVeoPage(),
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
