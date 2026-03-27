import { defineField, defineType } from "sanity";

export const sectionProcessSteps = defineType({
  name: "sectionProcessSteps",
  title: "Pasos del proceso",
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
      title: "Pasos",
      type: "array",
      of: [{ type: "processStep" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Pasos del proceso" };
    },
  },
});
