import { defineField, defineType } from "sanity";

export const sectionFeatures = defineType({
  name: "sectionFeatures",
  title: "Características",
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
      title: "Características",
      type: "array",
      of: [{ type: "featureItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Características" };
    },
  },
});
