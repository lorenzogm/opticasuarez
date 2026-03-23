import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Ubicación",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
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
      name: "address",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "schedule",
      title: "Horario",
      type: "schedule",
    }),
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string",
    }),
    defineField({
      name: "phoneUrl",
      title: "Enlace de teléfono",
      type: "string",
    }),
    defineField({
      name: "whatsappUrl",
      title: "Enlace de WhatsApp",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Correo electrónico",
      type: "string",
    }),
    defineField({
      name: "mapUrl",
      title: "Enlace de Google Maps",
      type: "url",
    }),
    defineField({
      name: "contactUrl",
      title: "Enlace de contacto",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
