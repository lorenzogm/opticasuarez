import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchAboutPage } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";
import Quienessomos from "~/pages/quienes-somos/quienes-somos";

export const Route = createFileRoute("/quienes-somos")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/quienes-somos",
      fallback: {
        title: "Quiénes somos | Óptica Suárez - Expertos en salud visual",
        description:
          "Desde 1940 cuidando de tu visión. Conoce nuestro equipo y trayectoria profesional de Óptica Suárez en Jaén.",
        keywords:
          "historia óptica Jaén, equipo profesional Jaén, optometristas Jaén, desde 1940",
      },
    });
  },
  loader: () => fetchAboutPage(),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    {
      name: "¿Quiénes Somos?",
      url: `${getBaseUrl()}/quienes-somos`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Quienessomos data={data} />
    </>
  );
}
