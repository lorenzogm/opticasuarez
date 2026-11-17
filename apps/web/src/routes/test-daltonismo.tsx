import { createFileRoute } from "@tanstack/react-router";
import ColorVisionTest from "~/components/color-vision-test";
import { buildHeadFromSanitySeo } from "~/lib/seo";

export const Route = createFileRoute("/test-daltonismo")({
  head: () =>
    buildHeadFromSanitySeo({
      path: "/test-daltonismo",
      fallback: {
        title: "Test de daltonismo online orientativo | Óptica Suárez Jaén",
        description:
          "Conoce las discromatopsias y prueba seis láminas de visión del color. Test orientativo, no diagnóstico. Consulta tus dudas con Óptica Suárez en Jaén.",
      },
    }),
  component: ColorVisionPage,
});

function ColorVisionPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 space-y-5">
        <p className="font-semibold text-blue-900 text-sm uppercase tracking-widest">
          Salud visual · Óptica Suárez en Jaén
        </p>
        <h1 className="font-bold text-3xl text-gray-900 sm:text-4xl">
          Test de daltonismo: explora tu visión del color
        </h1>
        <p className="text-gray-700 text-lg">
          Las discromatopsias son alteraciones en la percepción de los colores.
          Pueden dificultar distinguir algunos tonos, aunque la nitidez de la
          visión sea buena. El daltonismo suele ser hereditario y afectar a la
          distinción entre rojos y verdes; también existen alteraciones
          azul-amarillo y otras adquiridas.
        </p>
        <p className="text-gray-700">
          Las pruebas de Ishihara utilizan puntos de colores que forman números
          para explorar la percepción rojo-verde. Esta breve actividad online
          está inspirada en ellas, pero no sustituye sus láminas clínicas ni una
          valoración profesional. Si notas un cambio reciente en cómo ves los
          colores, consulta con un profesional de la salud visual.
        </p>
      </header>
      <ColorVisionTest />
    </main>
  );
}
