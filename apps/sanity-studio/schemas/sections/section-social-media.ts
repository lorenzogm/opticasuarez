import { defineField, defineType } from "sanity";

export const sectionSocialMedia = defineType({
  name: "sectionSocialMedia",
  title: "Redes sociales",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Enlaces de redes sociales",
      type: "array",
      of: [{ type: "socialMediaLink" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Redes sociales" };
    },
  },
});
