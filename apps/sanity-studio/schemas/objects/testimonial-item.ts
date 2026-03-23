import { defineField, defineType } from "sanity";

export const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Testimonio",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Texto del testimonio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "rating",
      title: "Puntuación",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "rating" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `${"★".repeat(subtitle)}` : "" };
    },
  },
});
