import { createFileRoute } from "@tanstack/react-router";
import DateTimeSelection from "~/pages/book/date-time";

export const Route = createFileRoute("/cita/horario")({
  head: () => ({
    meta: [
      { title: "Seleccionar Fecha y Hora - Óptica Suárez" },
      {
        name: "description",
        content: "Selecciona la fecha y hora para tu cita en Óptica Suárez.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <DateTimeSelection />;
}
