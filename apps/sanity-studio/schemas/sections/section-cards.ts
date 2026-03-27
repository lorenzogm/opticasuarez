import { defineField, defineType } from "sanity";

export const sectionCards = defineType({
  name: "sectionCards",
  title: "Tarjetas",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
    }),
    defineField({
      name: "variant",
      title: "Variante de diseño",
      type: "string",
      options: {
        list: [
          { title: "3 columnas", value: "grid-3" },
          { title: "2 columnas", value: "grid-2" },
          { title: "4 columnas", value: "grid-4" },
          { title: "Cuadrado", value: "square" },
          { title: "Landscape", value: "landscape" },
        ],
      },
      initialValue: "grid-3",
    }),
    defineField({
      name: "items",
      title: "Tarjetas",
      type: "array",
      of: [{ type: "cardItem" }],
      description:
        "Cada tarjeta puede vincular contenido estructurado o usar campos manuales.",
    }),
  ],
  preview: {
    select: { title: "title", variant: "variant" },
    prepare({ title, variant }) {
      return {
        title: title || "Tarjetas",
        subtitle: variant || "grid-3",
      };
    },
  },
});
