import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título SEO",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción SEO",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "keywords",
      title: "Palabras clave",
      type: "string",
      description: "Separadas por comas",
    }),
    defineField({
      name: "ogImage",
      title: "Imagen para redes sociales",
      type: "image",
    }),
    defineField({
      name: "canonicalUrl",
      title: "URL canónica",
      type: "url",
    }),
    defineField({
      name: "robots",
      title: "Robots",
      type: "string",
      initialValue: "index, follow",
    }),
  ],
});
