import { defineField, defineType } from "sanity";

export const schedule = defineType({
  name: "schedule",
  title: "Horario",
  type: "object",
  fields: [
    defineField({
      name: "weekdays",
      title: "Días entre semana",
      type: "string",
    }),
    defineField({
      name: "weekdaysHours",
      title: "Horario entre semana",
      type: "string",
    }),
    defineField({
      name: "saturday",
      title: "Sábado",
      type: "string",
    }),
    defineField({
      name: "saturdayHours",
      title: "Horario del sábado",
      type: "string",
    }),
  ],
});
