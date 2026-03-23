import { defineField, defineType } from "sanity";

export const socialMediaLink = defineType({
  name: "socialMediaLink",
  title: "Enlace de red social",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
          { title: "X (Twitter)", value: "twitter" },
          { title: "LinkedIn", value: "linkedin" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "handle",
      title: "Nombre de usuario",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "handle" },
  },
});
