import { defineField, defineType } from "sanity";

export const sectionLocations = defineType({
  name: "sectionLocations",
  title: "Ubicaciones",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Ubicaciones",
      type: "array",
      of: [{ type: "cardItem" }],
      description: "Vincula ubicaciones existentes o añade tarjetas manuales.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Ubicaciones" };
    },
  },
});
