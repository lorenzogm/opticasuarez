import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { buildHeadFromSanitySeo } from "~/lib/seo";

export const Route = createFileRoute("/bulevar")({
  head: () =>
    buildHeadFromSanitySeo({
      path: "/bulevar",
      fallback: {
        title: "Óptica Suárez Bulevar en Jaén | Centro de Optometría",
        description:
          "Óptica Suárez Bulevar en Jaén: optometría clínica, terapia visual y control de miopía en un centro especializado para toda la familia.",
        keywords:
          "óptica bulevar jaén, óptica suárez bulevar, optometría jaén bulevar, terapia visual jaén bulevar",
      },
    }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-semibold text-blue-700 text-sm uppercase tracking-widest">
          Óptica en Jaén
        </p>
        <h1 className="mt-3 font-bold text-3xl text-gray-900 sm:text-4xl">
          Óptica Suárez Bulevar
        </h1>
        <p className="mt-4 max-w-3xl text-gray-700 text-lg">
          Nuestro centro del Bulevar está especializado en salud visual para
          todas las edades, con revisiones completas, control de miopía y
          terapia visual personalizada.
        </p>
      </section>

      <section
        aria-label="Datos de contacto de Óptica Suárez Bulevar"
        className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 sm:px-6 lg:grid-cols-2"
      >
        <article className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <img
            alt="Fachada de Óptica Suárez Bulevar en Jaén"
            className="h-56 w-full rounded-xl object-cover"
            height={640}
            loading="lazy"
            src="/images/homepage/locations/optica-bulevar.webp"
            width={800}
          />
          <h2 className="mt-6 font-semibold text-2xl text-gray-900">
            Contacto directo
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="https://maps.app.goo.gl/G6fLtLamfj1wQVjr8"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>C. de Canarias, 6, 23009 Jaén</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="tel:+34953093062"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>+34 953 093 062</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="https://wa.me/34953093062"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
                <span>WhatsApp Bulevar</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="mailto:bulevar@opticasuarezjaen.es"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>bulevar@opticasuarezjaen.es</span>
              </a>
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-2xl text-gray-900">
            Ubicación y opiniones
          </h2>
          <p className="mt-3 text-gray-700">
            Encuentra fácilmente nuestra óptica en el Bulevar de Jaén y consulta
            las opiniones reales de nuestros pacientes en Google.
          </p>
          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <p className="sr-only">Valoración de 5 estrellas en Google</p>
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                  key={index}
                />
              ))}
            </div>
            <p className="mt-3 text-gray-700 italic">
              “Gracias a la terapia visual, mi hijo ha mejorado notablemente su
              rendimiento escolar.”
            </p>
            <p className="mt-2 font-medium text-gray-900">
              — Reseña de paciente en Google
            </p>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
            <iframe
              allowFullScreen
              className="h-64 w-full"
              height={400}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=C.+de+Canarias,+6,+23009+Ja%C3%A9n&output=embed"
              title="Mapa de Óptica Suárez Bulevar"
              width={600}
            />
          </div>
          <a
            className="mt-4 inline-block underline underline-offset-2"
            href="https://maps.app.goo.gl/G6fLtLamfj1wQVjr8"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ver opiniones en Google
          </a>
        </article>
      </section>
    </main>
  );
}
