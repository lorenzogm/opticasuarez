import { defineField, defineType } from "sanity";

export const bookAppointmentBlock = defineType({
  name: "bookAppointmentBlock",
  title: "Bloque de reserva de cita",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttonText",
      title: "Texto del botón",
      type: "string",
    }),
    defineField({
      name: "whatsappMessage",
      title: "Mensaje de WhatsApp",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "Enlace del botón",
      type: "string",
    }),
  ],
});
