import { defineField, defineType } from "sanity";

export const servicePage = defineType({
  name: "servicePage",
  title: "Página de servicio",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "mainTitle" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainTitle",
      title: "Título principal",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Imagen del héroe",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "intro",
      title: "Introducción",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: "itemsSectionTitle",
      title: "Título de la sección de elementos",
      type: "string",
    }),
    defineField({
      name: "itemsSectionSubtitle",
      title: "Subtítulo de la sección de elementos",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Elementos (servicios, tipos, condiciones)",
      type: "array",
      of: [{ type: "serviceItem" }],
    }),
    defineField({
      name: "process",
      title: "Proceso",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "steps",
          title: "Pasos",
          type: "array",
          of: [{ type: "processStep" }],
        }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Beneficios",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Beneficios",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "frequency",
      title: "Frecuencia recomendada",
      type: "object",
      fields: [
        defineField({
          name: "recommendations",
          title: "Recomendaciones",
          type: "array",
          of: [{ type: "frequencyRecommendation" }],
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
      name: "locations",
      title: "Ubicaciones",
      type: "array",
      of: [{ type: "reference", to: [{ type: "location" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "mainTitle", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
});
