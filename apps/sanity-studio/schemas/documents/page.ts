import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Página",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "path",
      title: "Ruta (URL)",
      type: "slug",
      description: 'La ruta de la página, p.ej. "/" para inicio, "/contacto"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Secciones",
      type: "array",
      of: [
        { type: "sectionHero" },
        { type: "sectionCards" },
        { type: "sectionFeatures" },
        { type: "sectionText" },
        { type: "sectionAccordion" },
        { type: "sectionTeaser" },
        { type: "sectionTestimonials" },
        { type: "sectionTimeline" },
        { type: "sectionSocialMedia" },
        { type: "sectionLocations" },
        { type: "sectionProcessSteps" },
        { type: "sectionList" },
        { type: "sectionStats" },
        { type: "sectionCTA" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "path.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || "/" };
    },
  },
});
