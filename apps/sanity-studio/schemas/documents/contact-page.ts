import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Página de contacto",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Héroe",
      type: "heroBlock",
    }),
    defineField({
      name: "contactInfo",
      title: "Información de contacto",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({ name: "phone", title: "Teléfono", type: "string" }),
        defineField({
          name: "email",
          title: "Correo electrónico",
          type: "string",
        }),
        defineField({
          name: "generalInfo",
          title: "Información general",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Ubicaciones",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "items",
          title: "Ubicaciones",
          type: "array",
          of: [{ type: "reference", to: [{ type: "location" }] }],
        }),
      ],
    }),
    defineField({
      name: "contactForm",
      title: "Formulario de contacto",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "form",
          title: "Campos del formulario",
          type: "object",
          fields: [
            defineField({
              name: "nameLabel",
              title: "Etiqueta de nombre",
              type: "string",
            }),
            defineField({
              name: "namePlaceholder",
              title: "Placeholder de nombre",
              type: "string",
            }),
            defineField({
              name: "emailLabel",
              title: "Etiqueta de correo",
              type: "string",
            }),
            defineField({
              name: "emailPlaceholder",
              title: "Placeholder de correo",
              type: "string",
            }),
            defineField({
              name: "phoneLabel",
              title: "Etiqueta de teléfono",
              type: "string",
            }),
            defineField({
              name: "phonePlaceholder",
              title: "Placeholder de teléfono",
              type: "string",
            }),
            defineField({
              name: "subjectLabel",
              title: "Etiqueta de asunto",
              type: "string",
            }),
            defineField({
              name: "subjectPlaceholder",
              title: "Placeholder de asunto",
              type: "string",
            }),
            defineField({
              name: "messageLabel",
              title: "Etiqueta de mensaje",
              type: "string",
            }),
            defineField({
              name: "messagePlaceholder",
              title: "Placeholder de mensaje",
              type: "string",
            }),
            defineField({
              name: "submitButton",
              title: "Texto del botón enviar",
              type: "string",
            }),
            defineField({
              name: "successMessage",
              title: "Mensaje de éxito",
              type: "string",
            }),
            defineField({
              name: "privacy",
              title: "Texto de privacidad",
              type: "text",
              rows: 2,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Redes sociales",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "links",
          title: "Enlaces",
          type: "array",
          of: [{ type: "socialMediaLink" }],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página de contacto" };
    },
  },
});
