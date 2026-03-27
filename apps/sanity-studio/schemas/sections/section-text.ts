import { defineArrayMember, defineField, defineType } from "sanity";

export const sectionText = defineType({
  name: "sectionText",
  title: "Texto",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Enlace",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Lista", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Imagen lateral",
      type: "image",
      options: { hotspot: true },
      description: "Imagen opcional junto al texto",
    }),
    defineField({
      name: "imagePosition",
      title: "Posición de la imagen",
      type: "string",
      options: {
        list: [
          { title: "Izquierda", value: "left" },
          { title: "Derecha", value: "right" },
        ],
      },
      initialValue: "right",
      hidden: ({ parent }) => !parent?.image,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Texto" };
    },
  },
});
