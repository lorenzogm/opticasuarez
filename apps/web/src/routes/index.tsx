import { createFileRoute } from "@tanstack/react-router";
import Homepage from "~/components/homepage/homepage";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchHomepageData } from "~/lib/server-fns";

export const Route = createFileRoute("/")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.homepage;
    const seoHead = buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/",
      fallback: {
        title: "Óptica en Jaén | Óptica Suárez - Desde 1940 cuidando tu visión",
        description:
          "Tu óptica en Jaén desde 1940: exámenes visuales, terapia visual, control de miopía y lentes de contacto con atención profesional.",
        keywords:
          "óptica en Jaén, optometría Jaén, revisión visual Jaén, terapia visual Jaén, control de miopía Jaén, lentes de contacto Jaén, ojo vago Jaén, estrabismo Jaén",
      },
    });
    return {
      ...seoHead,
      links: [
        ...seoHead.links,
        {
          rel: "preload",
          href: "/images/homepage/hero/hero-1.webp",
          as: "image",
          type: "image/webp",
        },
      ],
    };
  },
  loader: () => fetchHomepageData(),
  component: RouteComponent,
});

function RouteComponent() {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const { homepage } = Route.useLoaderData() as any;
  return <Homepage data={homepage} />;
}
