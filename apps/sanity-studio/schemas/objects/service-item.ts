import { defineField, defineType } from "sanity";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Elemento de servicio",
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
      name: "icon",
      title: "Icono",
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
    defineField({
      name: "link",
      title: "Enlace",
      type: "string",
    }),
    defineField({
      name: "benefits",
      title: "Beneficios",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
