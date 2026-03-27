import { defineField, defineType } from "sanity";

export const featureItem = defineType({
  name: "featureItem",
  title: "Característica",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icono",
      type: "string",
      description: "Emoji o nombre de icono",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
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
    defineField({
      name: "link",
      title: "Enlace",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
