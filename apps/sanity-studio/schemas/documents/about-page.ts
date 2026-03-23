import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Quiénes somos",
  type: "document",
  fields: [
    defineField({
      name: "mainTitle",
      title: "Título principal",
      type: "string",
    }),
    defineField({
      name: "history",
      title: "Historia",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "timeline",
          title: "Cronología",
          type: "array",
          of: [{ type: "timelineEntry" }],
        }),
      ],
    }),
    defineField({
      name: "team",
      title: "Equipo",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "members",
          title: "Miembros",
          type: "array",
          of: [{ type: "reference", to: [{ type: "teamMember" }] }],
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
          name: "moreReviewsLink",
          title: "Enlace a más reseñas",
          type: "url",
        }),
        defineField({
          name: "items",
          title: "Testimonios",
          type: "array",
          of: [{ type: "testimonialItem" }],
        }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Ubicaciones",
      type: "array",
      of: [{ type: "reference", to: [{ type: "location" }] }],
    }),
    defineField({
      name: "socialMedia",
      title: "Redes sociales",
      type: "array",
      of: [{ type: "socialMediaLink" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Quiénes somos" };
    },
  },
});
