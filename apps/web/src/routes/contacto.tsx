import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getContactPage } from "~/lib/sanity";
import { getBaseUrl } from "~/lib/utils";
import ContactoPage from "~/pages/contacto/contacto";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto - Óptica Suárez Jaén" },
      {
        name: "description",
        content:
          "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
      },
      {
        property: "og:title",
        content: "Contacto - Óptica Suárez Jaén",
      },
      {
        property: "og:description",
        content:
          "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
      },
      {
        property: "og:url",
        content: `${getBaseUrl()}/contacto`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${getBaseUrl()}/contacto` }],
  }),
  loader: async () => {
    const data = await getContactPage();
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Contacto", url: `${getBaseUrl()}/contacto` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactoPage data={data} />
    </>
  );
}
