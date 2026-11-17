import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHeadFromSanitySeo } from "~/lib/seo";

const tests = [
  {
    title: "Test de lectura",
    description:
      "Evalúa tu velocidad y comprensión lectora, y algunos síntomas que pueden aparecer al leer.",
    href: "/test-lectura",
  },
  {
    title: "Test de forias",
    description:
      "Explora de forma orientativa la visión binocular, la convergencia y la alineación de los ojos.",
    href: "/test-forias",
  },
  {
    title: "Test de visión de cerca",
    description:
      "Comprueba la agudeza visual de cerca de cada ojo con una prueba orientativa.",
    href: "/test-vision-cerca",
  },
] as const;

export const Route = createFileRoute("/tests")({
  head: () =>
    buildHeadFromSanitySeo({
      seo: null,
      path: "/tests",
      fallback: {
        title: "Tests visuales online | Óptica Suárez Jaén",
        description:
          "Encuentra los tests visuales online de Óptica Suárez: lectura, forias y visión de cerca. Pruebas orientativas para conocer mejor tu visión.",
        keywords:
          "tests visuales online, test de lectura, test de forias, test visión de cerca, óptica Jaén",
      },
    }),
  component: TestsPage,
});

function TestsPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-blue-200 text-sm uppercase tracking-wide">
            Salud visual
          </p>
          <h1 className="mt-3 font-bold text-3xl sm:text-4xl">
            Tests visuales online
          </h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Explora nuestras pruebas orientativas para conocer mejor distintos
            aspectos de tu visión.
          </p>
        </div>
      </section>

      <section
        aria-label="Tests disponibles"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {tests.map((test) => (
            <li key={test.href}>
              <article className="flex h-full flex-col rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 text-xl">
                  {test.title}
                </h2>
                <p className="mt-3 flex-1 text-gray-600">{test.description}</p>
                <Link
                  className="mt-6 inline-flex font-semibold text-blue-700 hover:text-blue-800"
                  to={test.href}
                >
                  Hacer {test.title.toLowerCase()}
                  <span aria-hidden="true" className="ml-1">
                    →
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-xl bg-blue-50 p-4 text-gray-700 text-sm">
          Estas pruebas ofrecen resultados orientativos y no sustituyen una
          revisión visual profesional.
        </p>
      </section>
    </main>
  );
}
