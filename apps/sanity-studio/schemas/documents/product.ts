import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.min(1).max(4),
      description: "Entre 1 y 4 imágenes del producto",
    }),
    defineField({
      name: "price",
      title: "Precio (€)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "salePrice",
      title: "Precio de oferta (€)",
      type: "number",
      description:
        "Opcional — si tiene valor, el producto aparece como artículo de Outlet con precio tachado",
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
          },
          lists: [
            { title: "Lista", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "specs",
      title: "Especificaciones",
      type: "object",
      fields: [
        defineField({
          name: "material",
          title: "Material",
          type: "string",
        }),
        defineField({
          name: "gender",
          title: "Género",
          type: "string",
          options: {
            list: [
              { title: "Hombre", value: "hombre" },
              { title: "Mujer", value: "mujer" },
              { title: "Unisex", value: "unisex" },
              { title: "Infantil", value: "infantil" },
            ],
          },
        }),
        defineField({
          name: "frameDimensions",
          title: "Dimensiones de montura",
          type: "frameDimensions",
        }),
      ],
    }),
    defineField({
      name: "colors",
      title: "Colores disponibles",
      type: "array",
      of: [{ type: "productColor" }],
    }),
    defineField({
      name: "availability",
      title: "Disponibilidad",
      type: "string",
      options: {
        list: [
          { title: "Disponible", value: "disponible" },
          { title: "Bajo pedido", value: "bajo-pedido" },
          { title: "Agotado", value: "agotado" },
        ],
      },
      initialValue: "disponible",
      description: "Relevante para monturas y gafas de sol",
    }),
    defineField({
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Producto destacado",
      type: "boolean",
      initialValue: false,
      description:
        "Marcar para mostrar en la sección de destacados de la homepage",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Nombre (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Precio (menor a mayor)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} €` : "",
        media,
      };
    },
  },
});
