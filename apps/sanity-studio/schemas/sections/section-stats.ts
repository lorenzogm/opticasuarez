import { defineField, defineType } from "sanity";

export const sectionStats = defineType({
  name: "sectionStats",
  title: "Estadísticas",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "items",
      title: "Estadísticas",
      type: "array",
      of: [
        {
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
              rows: 2,
            }),
            defineField({
              name: "value",
              title: "Valor (ej: 67%)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "value" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Estadísticas" };
    },
  },
});
