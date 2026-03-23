import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "Pregunta frecuente",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Pregunta",
      type: "string",
    }),
    defineField({
      name: "answer",
      title: "Respuesta",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "question" },
  },
});
