import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "~/components/book/contact-details";

interface ContactoSearch {
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

export const Route = createFileRoute("/cita/contacto")({
  validateSearch: (search: Record<string, unknown>): ContactoSearch => ({
    type: typeof search.type === "string" ? search.type : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
    date: typeof search.date === "string" ? search.date : undefined,
    period: typeof search.period === "string" ? search.period : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
    age: typeof search.age === "string" ? search.age : undefined,
    phone: typeof search.phone === "string" ? search.phone : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
    observations: typeof search.observations === "string" ? search.observations : undefined,
  }),
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
