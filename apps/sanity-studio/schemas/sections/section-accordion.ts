import { defineField, defineType } from "sanity";

export const sectionAccordion = defineType({
  name: "sectionAccordion",
  title: "Acordeón",
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
      name: "items",
      title: "Elementos",
      type: "array",
      of: [{ type: "accordionItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Acordeón" };
    },
  },
});
