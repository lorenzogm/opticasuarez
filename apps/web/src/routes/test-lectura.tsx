import { createFileRoute } from "@tanstack/react-router";
import ReadingTest from "~/components/reading-test";
import { buildHeadFromSanitySeo } from "~/lib/seo";

export const Route = createFileRoute("/test-lectura")({
  head: () =>
    buildHeadFromSanitySeo({
      seo: null,
      path: "/test-lectura",
      fallback: {
        title: "Test de lectura online orientativo | Óptica Suárez Jaén",
        description:
          "Haz un test de lectura rápido y descubre si tu velocidad, comprensión o síntomas al leer aconsejan una revisión visual en Óptica Suárez, Jaén.",
        keywords:
          "test de lectura, velocidad lectora, visión y lectura, revisión visual Jaén, salud visual infantil",
      },
    }),
  component: ReadingTest,
});
