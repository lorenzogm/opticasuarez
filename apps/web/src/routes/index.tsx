import { createFileRoute } from "@tanstack/react-router";
import Homepage from "~/components/homepage/homepage";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchHomepageData } from "~/lib/server-fns";

export const Route = createFileRoute("/")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.homepage;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/",
      fallback: {
        title: "Óptica en Jaén | Óptica Suárez - Desde 1940 cuidando tu visión",
        description:
          "Tu óptica en Jaén con más de 80 años de experiencia. Especialistas en revisión visual, terapia visual, control de miopía, lentes de contacto, visión infantil y deportiva.",
        keywords:
          "óptica en Jaén, optometría Jaén, revisión visual Jaén, terapia visual Jaén, control de miopía Jaén, lentes de contacto Jaén, ojo vago Jaén, estrabismo Jaén",
      },
    });
  },
  loader: () => fetchHomepageData(),
  component: RouteComponent,
});

function RouteComponent() {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const { homepage } = Route.useLoaderData() as any;
  return <Homepage data={homepage} />;
}
