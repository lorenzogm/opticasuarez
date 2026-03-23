import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Bloque héroe",
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
      name: "ctaText",
      title: "Texto del botón",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
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
      name: "imageTitle",
      title: "Título de la imagen",
      type: "string",
    }),
    defineField({
      name: "imageAlt",
      title: "Texto alternativo de la imagen",
      type: "string",
    }),
  ],
});
