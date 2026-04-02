import { createFileRoute } from "@tanstack/react-router";
import LocationSelection from "~/components/book/location-selection";

interface CentroSearch {
  type?: string;
}

export const Route = createFileRoute("/cita/centro")({
  validateSearch: (search: Record<string, unknown>): CentroSearch => ({
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Seleccionar Centro - Óptica Suárez" },
      {
        name: "description",
        content: "Selecciona el centro de Óptica Suárez para tu cita.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <LocationSelection />;
}
