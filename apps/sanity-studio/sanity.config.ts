import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import RebuildSiteTool from "./lib/rebuild-site-tool";
import { schemaTypes } from "./schemas";
import { structure } from "./structure/desk-structure";

const sharedConfig = {
  projectId: "2a24wmex",

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
};

export default defineConfig([
  {
    ...sharedConfig,
    name: "production",
    title: "Óptica Suárez — Producción",
    dataset: "production",
    basePath: "/production",
  },
  {
    ...sharedConfig,
    name: "development",
    title: "Óptica Suárez — Desarrollo",
    dataset: "development",
    basePath: "/development",
  },
]);
