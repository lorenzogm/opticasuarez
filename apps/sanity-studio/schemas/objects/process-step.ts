import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Paso del proceso",
  type: "object",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Número de paso",
      type: "number",
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
    select: { title: "title", subtitle: "stepNumber" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Paso ${subtitle}` };
    },
  },
});
