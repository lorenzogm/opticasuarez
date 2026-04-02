import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Pedido",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Número de pedido",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Pendiente", value: "pending" },
          { title: "Pagado", value: "paid" },
          { title: "Fallido", value: "failed" },
          { title: "Cancelado", value: "cancelled" },
        ],
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Artículos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", title: "ID Producto", type: "string" },
            { name: "name", title: "Nombre", type: "string" },
            { name: "slug", title: "Slug", type: "string" },
            { name: "price", title: "Precio", type: "number" },
            { name: "quantity", title: "Cantidad", type: "number" },
            { name: "image", title: "Imagen", type: "string" },
            {
              name: "color",
              title: "Color",
              type: "object",
              fields: [
                { name: "name", title: "Nombre", type: "string" },
                { name: "hex", title: "Hex", type: "string" },
              ],
            },
            { name: "brand", title: "Marca", type: "string" },
          ],
          preview: {
            select: { title: "name", subtitle: "quantity" },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: `x${subtitle}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "customer",
      title: "Cliente",
      type: "object",
      fields: [
        { name: "nombre", title: "Nombre", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "telefono", title: "Teléfono", type: "string" },
        { name: "nif", title: "NIF", type: "string" },
        { name: "direccion", title: "Dirección", type: "string" },
        { name: "codigoPostal", title: "Código Postal", type: "string" },
        { name: "ciudad", title: "Ciudad", type: "string" },
        { name: "provincia", title: "Provincia", type: "string" },
      ],
    }),
    defineField({
      name: "shipping",
      title: "Envío",
      type: "object",
      fields: [
        {
          name: "method",
          title: "Método",
          type: "string",
          options: {
            list: [
              { title: "Envío a domicilio", value: "delivery" },
              { title: "Recogida Bulevar", value: "pickup-bulevar" },
              { title: "Recogida Centro", value: "pickup-centro" },
            ],
          },
        },
        { name: "cost", title: "Coste", type: "number" },
      ],
    }),
    defineField({
      name: "totals",
      title: "Totales",
      type: "object",
      fields: [
        { name: "subtotal", title: "Subtotal", type: "number" },
        { name: "shipping", title: "Envío", type: "number" },
        { name: "total", title: "Total", type: "number" },
      ],
    }),
    defineField({
      name: "redsysData",
      title: "Datos Redsys",
      type: "object",
      fields: [
        { name: "authCode", title: "Código autorización", type: "string" },
        { name: "responseCode", title: "Código respuesta", type: "string" },
        { name: "date", title: "Fecha pago", type: "datetime" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "orderNumber",
      subtitle: "status",
      customer: "customer.nombre",
    },
    prepare: ({ title, subtitle, customer }) => ({
      title: `${title}`,
      subtitle: `${subtitle} — ${customer || "Sin nombre"}`,
    }),
  },
  orderings: [
    {
      title: "Fecha (más reciente)",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
