import { defineField, defineType } from "sanity";

export const serviceGridItem = defineType({
  name: "serviceGridItem",
  title: "Elemento de la cuadrícula de servicios",
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
      name: "url",
      title: "Enlace",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
    }),
    defineField({
      name: "imageTitle",
      title: "Título de la imagen",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
