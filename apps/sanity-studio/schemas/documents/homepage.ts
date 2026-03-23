import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Página de inicio",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Héroe",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "string",
        }),
        defineField({ name: "cta", title: "Texto del botón", type: "string" }),
      ],
    }),
    defineField({
      name: "servicesGrid",
      title: "Cuadrícula de servicios",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Servicios",
          type: "array",
          of: [{ type: "serviceGridItem" }],
        }),
      ],
    }),
    defineField({
      name: "videoAbout",
      title: "Vídeo sobre nosotros",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "videoId",
          title: "ID de vídeo de YouTube",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Redes sociales",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "handle", title: "Usuario", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "handle", title: "Usuario", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "specialists",
      title: "Especialistas",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "news",
      title: "Noticias",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "buttonText",
          title: "Texto del botón",
          type: "string",
        }),
        defineField({ name: "url", title: "Enlace", type: "string" }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Ubicaciones",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Ubicaciones",
          type: "array",
          of: [{ type: "reference", to: [{ type: "location" }] }],
        }),
      ],
    }),
    defineField({
      name: "partners",
      title: "Marcas asociadas",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Marcas",
          type: "array",
          of: [{ type: "partnerItem" }],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Lista de servicios",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Servicios",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Título", type: "string" }),
                defineField({
                  name: "description",
                  title: "Descripción",
                  type: "text",
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "Sobre nosotros",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "experience",
          title: "Experiencia",
          type: "string",
        }),
        defineField({ name: "clients", title: "Clientes", type: "string" }),
      ],
    }),
    defineField({
      name: "brands",
      title: "Marcas",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "items",
          title: "Marcas",
          type: "array",
          of: [{ type: "partnerItem" }],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonios",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({
          name: "items",
          title: "Testimonios",
          type: "array",
          of: [{ type: "testimonialItem" }],
        }),
      ],
    }),
    defineField({
      name: "bookAppointment",
      title: "Reservar cita",
      type: "bookAppointmentBlock",
    }),
    defineField({
      name: "contact",
      title: "Contacto",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "phone", title: "Teléfono", type: "string" }),
        defineField({ name: "email", title: "Correo", type: "string" }),
        defineField({ name: "address", title: "Dirección", type: "string" }),
        defineField({ name: "hours", title: "Horario", type: "string" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página de inicio" };
    },
  },
});
