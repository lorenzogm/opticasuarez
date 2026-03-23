import { createFileRoute } from "@tanstack/react-router";
import Confirmation from "~/pages/book/confirmation";

export const Route = createFileRoute("/cita/confirmacion")({
  head: () => ({
    meta: [
      { title: "Confirmar Cita - Óptica Suárez" },
      {
        name: "description",
        content: "Revisa y confirma los detalles de tu cita en Óptica Suárez.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Confirmation />;
}
