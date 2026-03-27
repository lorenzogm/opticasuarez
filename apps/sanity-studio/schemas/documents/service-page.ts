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
      name: "heroDescription",
      title: "Descripción del héroe",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "introduction",
      title: "Introducción (contenido largo)",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "content",
          title: "Contenido",
          type: "text",
          rows: 5,
        }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "benefits",
          title: "Beneficios",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonios",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Testimonios",
          type: "array",
          of: [{ type: "testimonialItem" }],
        }),
      ],
    }),
    defineField({
      name: "visualTherapy",
      title: "Terapia visual deportiva",
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
          name: "skills",
          title: "Habilidades",
          type: "array",
          of: [
            {
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
                  rows: 2,
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "improvements",
          title: "Mejoras",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
            }),
            defineField({
              name: "items",
              title: "Elementos",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
        defineField({
          name: "images",
          title: "Imágenes",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "src",
                  title: "Imagen",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "alt",
                  title: "Alt",
                  type: "string",
                }),
                defineField({
                  name: "title",
                  title: "Título",
                  type: "string",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "ctaButton",
          title: "Botón CTA",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Texto",
              type: "string",
            }),
            defineField({ name: "url", title: "URL", type: "string" }),
            defineField({
              name: "message",
              title: "Mensaje",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "ageGroups",
      title: "Grupos de edad",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "subtitle",
          title: "Subtítulo",
          type: "string",
        }),
        defineField({
          name: "groups",
          title: "Grupos",
          type: "array",
          of: [
            {
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
                }),
                defineField({
                  name: "recommendations",
                  title: "Recomendaciones",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "warningSign",
      title: "Signos de alerta",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
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
          name: "signs",
          title: "Signos",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "science",
      title: "Estudios científicos",
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
          name: "studies",
          title: "Estudios",
          type: "array",
          of: [
            {
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
                  rows: 2,
                }),
                defineField({
                  name: "percentage",
                  title: "Porcentaje",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "candidates",
      title: "Candidatos ideales",
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
          name: "disclaimer",
          title: "Aviso legal",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "items",
          title: "Candidatos",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "whyChooseUs",
      title: "Por qué elegirnos",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Razones",
          type: "array",
          of: [
            {
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
                  rows: 2,
                }),
              ],
            },
          ],
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
    select: { title: "mainTitle", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
});
