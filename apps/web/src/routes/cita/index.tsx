import { createFileRoute } from "@tanstack/react-router";
import BookAppointment from "~/pages/book/book-appointment";

export const Route = createFileRoute("/cita/")({
  head: () => ({
    meta: [
      { title: "Reservar Cita - Óptica Suárez" },
      {
        name: "description",
        content:
          "Reserva tu cita para servicios ópticos especializados en Óptica Suárez.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <BookAppointment />;
}
