import { createFileRoute } from "@tanstack/react-router";
import Confirmation from "~/components/book/confirmation";

interface ConfirmacionSearch {
  type?: string;
  location?: string;
  date?: string;
  period?: string;
  name?: string;
  age?: string;
  phone?: string;
  email?: string;
  observations?: string;
}

export const Route = createFileRoute("/cita/confirmacion")({
  validateSearch: (search: Record<string, unknown>): ConfirmacionSearch => ({
    type: typeof search.type === "string" ? search.type : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
    date: typeof search.date === "string" ? search.date : undefined,
    period: typeof search.period === "string" ? search.period : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
    age: typeof search.age === "string" ? search.age : undefined,
    phone: typeof search.phone === "string" ? search.phone : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
    observations:
      typeof search.observations === "string" ? search.observations : undefined,
  }),
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
