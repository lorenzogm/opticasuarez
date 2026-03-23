import { defineField, defineType } from "sanity";

export const serviciosOverview = defineType({
  name: "serviciosOverview",
  title: "Vista general de servicios",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "services",
      title: "Servicios",
      type: "array",
      of: [{ type: "serviceGridItem" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Vista general de servicios" };
    },
  },
});
