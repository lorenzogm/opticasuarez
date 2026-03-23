import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nombre del sitio",
      type: "string",
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
      description: "Formato: tel:+34...",
    }),
    defineField({
      name: "email",
      title: "Correo electrónico",
      type: "string",
    }),
    defineField({
      name: "whatsappUrl",
      title: "Enlace de WhatsApp",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "socialMedia",
      title: "Redes sociales",
      type: "array",
      of: [{ type: "socialMediaLink" }],
    }),
    defineField({
      name: "navigationItems",
      title: "Elementos de navegación",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etiqueta", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración del sitio" };
    },
  },
});
