import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const submitProductInquiry = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      productName: string;
      productSlug: string;
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!(data.name?.trim() && data.phone?.trim())) {
        throw new Error("Nombre y teléfono son obligatorios");
      }
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error("Email no válido");
      }
      return {
        productName: data.productName.trim().slice(0, 300),
        productSlug: data.productSlug.trim().slice(0, 300),
        name: data.name.trim().slice(0, 200),
        email: (data.email || "").trim().slice(0, 200),
        phone: data.phone.trim().slice(0, 30),
        message: (data.message || "").trim().slice(0, 2000),
      };
    }
  )
  .handler(async ({ data }) => {
    const emailContent = `
Nueva consulta sobre producto en Óptica Suárez

Producto: ${data.productName}
Enlace: https://opticasuarezjaen.es/tienda/${data.productSlug}

Datos del cliente:
- Nombre: ${data.name}
- Teléfono: ${data.phone}
${data.email ? `- Email: ${data.email}` : ""}
${data.message ? `\nMensaje:\n${data.message}` : ""}

Consulta realizada el: ${new Date().toLocaleString("es-ES")}
		`;

    if (!resend) {
      return { success: true };
    }

    try {
      await resend.emails.send({
        from: "Óptica Suárez <no-reply@opticasuarezjaen.es>",
        to: ["optica@lorenzogm.com"],
        subject: `Consulta producto: ${data.productName}`,
        text: emailContent.trim(),
      });

      if (data.email) {
        await resend.emails.send({
          from: "Óptica Suárez <no-reply@opticasuarezjaen.es>",
          to: [data.email],
          subject: `Tu consulta sobre ${data.productName} — Óptica Suárez`,
          text: `
Hola ${data.name},

Hemos recibido tu consulta sobre "${data.productName}". Nos pondremos en contacto contigo lo antes posible.

Si tienes alguna pregunta adicional, no dudes en llamarnos:
- Óptica Suárez Bulevar: 953 27 00 00
- Óptica Suárez Centro: 953 22 00 00

¡Gracias por tu interés!

Óptica Suárez
					`.trim(),
        });
      }

      return { success: true };
    } catch {
      return {
        success: false,
        error: "Ha ocurrido un error al enviar la consulta.",
      };
    }
  });
