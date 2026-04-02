import { defineField, defineType } from "sanity";

export const sectionContactForm = defineType({
  name: "sectionContactForm",
  title: "Formulario de contacto",
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
      name: "email",
      title: "Email de destino",
      type: "string",
      description: "Email al que se enviarán los mensajes del formulario",
    }),
    defineField({
      name: "nameLabel",
      title: "Etiqueta del campo nombre",
      type: "string",
    }),
    defineField({
      name: "namePlaceholder",
      title: "Placeholder del campo nombre",
      type: "string",
    }),
    defineField({
      name: "emailLabel",
      title: "Etiqueta del campo email",
      type: "string",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Placeholder del campo email",
      type: "string",
    }),
    defineField({
      name: "phoneLabel",
      title: "Etiqueta del campo teléfono",
      type: "string",
    }),
    defineField({
      name: "phonePlaceholder",
      title: "Placeholder del campo teléfono",
      type: "string",
    }),
    defineField({
      name: "messageLabel",
      title: "Etiqueta del campo mensaje",
      type: "string",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Placeholder del campo mensaje",
      type: "string",
    }),
    defineField({
      name: "submitButton",
      title: "Texto del botón enviar",
      type: "string",
    }),
    defineField({
      name: "privacy",
      title: "Texto de privacidad",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Formulario de contacto" };
    },
  },
});
