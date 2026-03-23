import { createFileRoute } from "@tanstack/react-router";
import LocationSelection from "~/pages/book/location-selection";

export const Route = createFileRoute("/cita/centro")({
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
