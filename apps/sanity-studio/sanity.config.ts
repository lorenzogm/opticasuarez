import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import RebuildSiteTool from "./lib/rebuild-site-tool";
import { schemaTypes } from "./schemas";
import { structure } from "./structure/desk-structure";

export default defineConfig({
  name: "opticasuarez",
  title: "Óptica Suárez",

  projectId: "2a24wmex",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/preview/enable",
        },
      },
    }),
    visionTool(),
  ],

  tools: [
    {
      name: "rebuild-site",
      title: "Reconstruir sitio",
      component: RebuildSiteTool,
    },
  ],

  schema: {
    types: schemaTypes,
  },
});
