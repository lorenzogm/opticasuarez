import { createFileRoute } from "@tanstack/react-router";
import NearVisionTest from "~/components/near-vision-test";
import { buildHeadFromSanitySeo } from "~/lib/seo";

export const Route = createFileRoute("/test-vision-cerca")({
  head: () =>
    buildHeadFromSanitySeo({
      seo: null,
      path: "/test-vision-cerca",
      fallback: {
        title: "Test de agudeza visual de cerca en Jaén | Óptica Suárez",
        description:
          "Haz un test orientativo de visión de cerca en cada ojo y descubre cuándo puede convenirte una revisión visual completa en Óptica Suárez, Jaén.",
        keywords:
          "test visión de cerca, agudeza visual, revisión visual Jaén, salud visual",
      },
    }),
  component: NearVisionTest,
});
