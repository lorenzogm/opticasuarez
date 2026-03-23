import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./structure/desk-structure";

export default defineConfig({
  name: "opticasuarez",
  title: "Óptica Suárez",

  projectId: "2a24wmex",
  dataset: "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
