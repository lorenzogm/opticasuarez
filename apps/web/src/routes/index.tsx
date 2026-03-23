import { createFileRoute } from "@tanstack/react-router";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
import Homepage from "~/pages/homepage/homepage";

const homeKeywords = generatePageKeywords("home");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti" },
      {
        name: "description",
        content:
          "Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(homeKeywords),
      },
      { name: "author", content: "Óptica Suárez" },
      {
        property: "og:title",
        content: "Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti",
      },
      {
        property: "og:description",
        content:
          "Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: `${getBaseUrl()}/`,
      },
      {
        property: "og:image",
        content: `${getBaseUrl()}/og-image.jpg`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti",
      },
      {
        name: "twitter:description",
        content:
          "Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${getBaseUrl()}/` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Homepage />;
}
