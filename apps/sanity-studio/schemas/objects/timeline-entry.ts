import { defineField, defineType } from "sanity";

export const timelineEntry = defineType({
  name: "timelineEntry",
  title: "Entrada de cronología",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Año",
      type: "string",
    }),
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
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});
