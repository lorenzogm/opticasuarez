import { defineField, defineType } from "sanity";

export const cardItem = defineType({
  name: "cardItem",
  title: "Tarjeta",
  type: "object",
  fields: [
    defineField({
      name: "reference",
      title: "Contenido vinculado",
      type: "reference",
      to: [
        { type: "service" },
        { type: "location" },
        { type: "teamMember" },
        { type: "blogPost" },
      ],
      description:
        "Vincula a un contenido existente. Los campos de abajo sobreescriben los del contenido vinculado.",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: "Sobreescribe el título del contenido vinculado",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      description: "Sobreescribe la descripción del contenido vinculado",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      description: "Sobreescribe la imagen del contenido vinculado",
    }),
    defineField({
      name: "link",
      title: "Enlace",
      type: "string",
      description:
        "URL de destino. Sobreescribe el enlace del contenido vinculado.",
    }),
    defineField({
      name: "icon",
      title: "Icono",
      type: "string",
    }),
  ],
  preview: {
    select: {
      customTitle: "title",
      refTitle: "reference.title",
      refName: "reference.name",
      media: "image",
      refMedia: "reference.image",
    },
    prepare({ customTitle, refTitle, refName, media, refMedia }) {
      return {
        title: customTitle || refTitle || refName || "Tarjeta",
        media: media || refMedia,
      };
    },
  },
});
