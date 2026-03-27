import { defineField, defineType } from "sanity";

export const sectionTeaser = defineType({
  name: "sectionTeaser",
  title: "Teaser",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttonText",
      title: "Texto del botón",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "Enlace del botón",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "variant",
      title: "Variante",
      type: "string",
      options: {
        list: [
          { title: "Por defecto", value: "default" },
          { title: "Destacado", value: "highlight" },
          { title: "Banner", value: "banner" },
        ],
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "buttonText" },
    prepare({ title, subtitle }) {
      return { title: title || "Teaser", subtitle };
    },
  },
});
