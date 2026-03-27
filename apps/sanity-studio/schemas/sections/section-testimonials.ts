import { defineField, defineType } from "sanity";

export const sectionTestimonials = defineType({
  name: "sectionTestimonials",
  title: "Testimonios",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
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
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Testimonios" };
    },
  },
});
