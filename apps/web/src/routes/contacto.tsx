import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { getContactPage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { getBaseUrl } from "~/lib/utils";
import ContactoPage from "~/pages/contacto/contacto";

export const Route = createFileRoute("/contacto")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/contacto",
      fallback: {
        title: "Contacto - Óptica Suárez Jaén",
        description:
          "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
        keywords:
          "contacto óptica Jaén, cita optometría Jaén, teléfono óptica Jaén",
      },
    });
  },
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
