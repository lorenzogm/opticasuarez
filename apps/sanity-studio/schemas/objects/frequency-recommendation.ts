import { defineField, defineType } from "sanity";

export const frequencyRecommendation = defineType({
  name: "frequencyRecommendation",
  title: "Recomendación de frecuencia",
  type: "object",
  fields: [
    defineField({
      name: "age",
      title: "Edad",
      type: "string",
    }),
    defineField({
      name: "frequency",
      title: "Frecuencia",
      type: "string",
    }),
    defineField({
      name: "reason",
      title: "Motivo",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "age", subtitle: "frequency" },
  },
});
