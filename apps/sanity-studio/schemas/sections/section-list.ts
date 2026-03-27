import { defineField, defineType } from "sanity";

export const sectionList = defineType({
  name: "sectionList",
  title: "Lista",
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
      name: "variant",
      title: "Variante de icono",
      type: "string",
      options: {
        list: [
          { title: "✓ Check", value: "checkmark" },
          { title: "⚠ Advertencia", value: "warning" },
          { title: "● Punto", value: "bullet" },
          { title: "1. Numerado", value: "numbered" },
        ],
      },
      initialValue: "bullet",
    }),
    defineField({
      name: "items",
      title: "Elementos",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Lista" };
    },
  },
});
