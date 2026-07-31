import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { buildHeadFromSanitySeo } from "~/lib/seo";

export const Route = createFileRoute("/centro")({
  head: () =>
    buildHeadFromSanitySeo({
      path: "/centro",
      fallback: {
        title: "Óptica Suárez Centro en Jaén | Óptica y Optometría",
        description:
          "Óptica Suárez Centro en Jaén: especialistas en salud visual, lentes progresivas y atención optométrica personalizada en pleno centro.",
        keywords:
          "óptica centro jaén, óptica suárez centro, optometría centro de jaén, gafas graduadas jaén centro",
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
          Óptica Suárez Centro
        </h1>
        <p className="mt-4 max-w-3xl text-gray-700 text-lg">
          En nuestra óptica del centro de Jaén encontrarás asesoramiento
          personalizado, tecnología de última generación y una amplia selección
          de lentes para cada estilo de vida.
        </p>
      </section>

      <section
        aria-label="Datos de contacto de Óptica Suárez Centro"
        className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 sm:px-6 lg:grid-cols-2"
      >
        <article className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <img
            alt="Fachada de Óptica Suárez Centro en Jaén"
            className="h-56 w-full rounded-xl object-cover"
            height={640}
            loading="lazy"
            src="/images/homepage/locations/optica-centro.webp"
            width={800}
          />
          <h2 className="mt-6 font-semibold text-2xl text-gray-900">
            Contacto directo
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="https://maps.app.goo.gl/17ZkGLbx8gELpTAw7"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>P.º de la Estación, 12, 23003 Jaén</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="tel:+34953223180"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>+34 953 223 180</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="https://wa.me/34953223180"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
                <span>WhatsApp Centro</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 underline underline-offset-2"
                href="mailto:centro@opticasuarezjaen.es"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>centro@opticasuarezjaen.es</span>
              </a>
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-2xl text-gray-900">
            Ubicación y opiniones
          </h2>
          <p className="mt-3 text-gray-700">
            Visítanos en pleno centro de Jaén y consulta las opiniones de Google
            para conocer la experiencia de quienes ya han confiado en nosotros.
          </p>
          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <div
              aria-label="Valoración de 5 estrellas en Google"
              className="flex gap-1 text-yellow-400"
              role="img"
            >
              {Array.from({ length: 5 }, (_, starIndex) => (
                <Star
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                  key={starIndex}
                />
              ))}
            </div>
            <p className="mt-3 text-gray-700 italic">
              “La terapia visual me ayudó a superar la fatiga visual que tenía
              por trabajar muchas horas frente al ordenador.”
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
              src="https://www.google.com/maps?q=P.%C2%BA+de+la+Estaci%C3%B3n,+12,+23003+Ja%C3%A9n&output=embed"
              title="Mapa de Óptica Suárez Centro"
              width={600}
            />
          </div>
          <a
            className="mt-4 inline-block underline underline-offset-2"
            href="https://maps.app.goo.gl/17ZkGLbx8gELpTAw7"
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
