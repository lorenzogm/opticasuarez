import { defineField, defineType } from "sanity";

export const productColor = defineType({
  name: "productColor",
  title: "Color del producto",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del color",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hex",
      title: "Código hexadecimal",
      type: "string",
      description: 'Código de color en formato hexadecimal, ej: "#FF0000"',
      validation: (rule) => rule.regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    defineField({
      name: "image",
      title: "Imagen del producto en este color",
      type: "image",
      options: { hotspot: true },
      description: "Opcional — imagen del producto en esta variante de color",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "hex" },
  },
});
