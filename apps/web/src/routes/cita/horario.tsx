import { createFileRoute } from "@tanstack/react-router";
import DateTimeSelection from "~/components/book/date-time";

interface HorarioSearch {
  type?: string;
  location?: string;
}

export const Route = createFileRoute("/cita/horario")({
  validateSearch: (search: Record<string, unknown>): HorarioSearch => ({
    type: typeof search.type === "string" ? search.type : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
  }),
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
