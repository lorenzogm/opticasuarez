import { defineField, defineType } from "sanity";

export const sectionTimeline = defineType({
  name: "sectionTimeline",
  title: "Cronología",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Entradas",
      type: "array",
      of: [{ type: "timelineEntry" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Cronología" };
    },
  },
});
