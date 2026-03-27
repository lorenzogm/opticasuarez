import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "~/components/book/contact-details";

export const Route = createFileRoute("/cita/contacto")({
  head: () => ({
    meta: [
      { title: "Datos de Contacto - Óptica Suárez" },
      {
        name: "description",
        content:
          "Introduce tus datos de contacto para la cita en Óptica Suárez.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ContactDetails />;
}
