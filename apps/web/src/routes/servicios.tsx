import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchServiciosOverview } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";
import Servicios from "~/pages/servicios/servicios";

export const Route = createFileRoute("/servicios")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/servicios",
      fallback: {
        title: "Servicios - Óptica Suárez",
        description:
          "¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.",
        keywords:
          "servicios ópticos Jaén, optometría Jaén, terapia visual Jaén, lentes de contacto Jaén",
      },
    });
  },
  loader: () => fetchServiciosOverview(),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Servicios", url: `${getBaseUrl()}/servicios` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Servicios data={data} />
    </>
  );
}
