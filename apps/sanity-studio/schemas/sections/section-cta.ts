import { defineField, defineType } from "sanity";

export const sectionCTA = defineType({
  name: "sectionCTA",
  title: "Llamada a la acción",
  type: "object",
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
      name: "buttonText",
      title: "Texto del botón",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "Enlace del botón",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "buttonText" },
    prepare({ title, subtitle }) {
      return { title: title || "Llamada a la acción", subtitle };
    },
  },
});
