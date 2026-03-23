import { defineField, defineType } from "sanity";

export const planVeoPage = defineType({
  name: "planVeoPage",
  title: "Página Plan VEO",
  type: "document",
  fields: [
    defineField({
      name: "mainTitle",
      title: "Título principal",
      type: "string",
    }),
    defineField({
      name: "hero",
      title: "Héroe",
      type: "heroBlock",
    }),
    defineField({
      name: "introduction",
      title: "Introducción",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "content",
          title: "Contenido",
          type: "text",
          rows: 5,
        }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Beneficios",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "items",
          title: "Beneficios",
          type: "array",
          of: [{ type: "serviceItem" }],
        }),
      ],
    }),
    defineField({
      name: "requirements",
      title: "Requisitos",
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
          name: "items",
          title: "Requisitos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Título", type: "string" }),
                defineField({
                  name: "description",
                  title: "Descripción",
                  type: "text",
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "Cómo funciona",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "steps",
          title: "Pasos",
          type: "array",
          of: [{ type: "processStep" }],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "Preguntas frecuentes",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Preguntas",
          type: "array",
          of: [{ type: "faqItem" }],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Llamada a la acción",
      type: "bookAppointmentBlock",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Plan VEO" };
    },
  },
});
