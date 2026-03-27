import { defineField, defineType } from "sanity";

export const sectionHero = defineType({
  name: "sectionHero",
  title: "Héroe",
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
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Imagen de fondo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Texto alternativo de la imagen",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "Texto del botón",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "Enlace del botón",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
    prepare({ title, subtitle }) {
      return { title: title || "Héroe", subtitle };
    },
  },
});
