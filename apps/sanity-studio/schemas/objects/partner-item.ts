import { defineField, defineType } from "sanity";

export const partnerItem = defineType({
  name: "partnerItem",
  title: "Marca asociada",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Logo",
      type: "image",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
