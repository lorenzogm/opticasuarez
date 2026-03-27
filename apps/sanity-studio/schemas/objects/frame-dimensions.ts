import { defineField, defineType } from "sanity";

export const frameDimensions = defineType({
  name: "frameDimensions",
  title: "Dimensiones de montura",
  type: "object",
  fields: [
    defineField({
      name: "calibre",
      title: "Calibre (mm)",
      type: "number",
      description:
        "Ancho de cada lente en milímetros. Es el número más grande grabado en la patilla.",
    }),
    defineField({
      name: "puente",
      title: "Puente (mm)",
      type: "number",
      description:
        "Distancia entre las dos lentes a la altura de la nariz, en milímetros.",
    }),
    defineField({
      name: "varilla",
      title: "Varilla (mm)",
      type: "number",
      description:
        "Longitud de la patilla desde la bisagra hasta el extremo, en milímetros.",
    }),
  ],
});
