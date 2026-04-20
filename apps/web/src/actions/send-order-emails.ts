import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  color?: { name: string };
  brand?: string;
}

interface OrderData {
  orderNumber: string;
  items: OrderItem[];
  customer: {
    nombre: string;
    email: string;
    telefono: string;
    nif?: string;
    direccion: string;
    codigoPostal: string;
    ciudad: string;
    provincia: string;
  };
  shipping: {
    method: string;
    cost: number;
  };
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
  redsysAuthCode?: string;
}

const shippingLabels: Record<string, string> = {
  delivery: "Envío a domicilio (GLS)",
  "pickup-bulevar": "Recogida en Óptica Suárez Bulevar",
  "pickup-centro": "Recogida en Óptica Suárez Centro",
};

function formatItems(items: OrderItem[]): string {
  return items
    .map((item) => {
      const color = item.color?.name ? ` (${item.color.name})` : "";
      return `- ${item.name}${color} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)}€`;
    })
    .join("\n");
}

function getDeliveryEstimate(method: string): string {
  if (method === "delivery") return "3-5 días laborables";
  return "Disponible en 24h";
}

function buildCustomerEmail(order: OrderData): string {
  const isPickup = order.shipping.method.startsWith("pickup");

  return `
¡Gracias por tu compra en Óptica Suárez!

Hola ${order.customer.nombre},

Tu pedido ha sido confirmado. Aquí tienes los detalles:

Número de pedido: ${order.orderNumber}

Artículos:
${formatItems(order.items)}

Subtotal: ${order.totals.subtotal.toFixed(2)}€
Envío: ${order.totals.shipping === 0 ? "Gratis" : `${order.totals.shipping.toFixed(2)}€`}
Total: ${order.totals.total.toFixed(2)}€

Método de envío: ${shippingLabels[order.shipping.method] || order.shipping.method}
${
  isPickup
    ? "Puedes recoger tu pedido en la tienda."
    : `Dirección de envío: ${order.customer.direccion}, ${order.customer.codigoPostal} ${order.customer.ciudad}, ${order.customer.provincia}`
}
Entrega estimada: ${getDeliveryEstimate(order.shipping.method)}

Si tienes alguna pregunta sobre tu pedido, contáctanos:
- Teléfono: 953 22 00 00
- Email: bulevar@opticasuarezjaen.es

¡Gracias por confiar en Óptica Suárez!

Óptica Suárez
`.trim();
}

function buildStoreEmail(order: OrderData): string {
  return `
Nuevo pedido recibido

Número de pedido: ${order.orderNumber}
Fecha: ${new Date().toLocaleString("es-ES")}
${order.redsysAuthCode ? `Código autorización Redsys: ${order.redsysAuthCode}` : ""}

Artículos:
${formatItems(order.items)}

Subtotal: ${order.totals.subtotal.toFixed(2)}€
Envío: ${order.totals.shipping === 0 ? "Gratis" : `${order.totals.shipping.toFixed(2)}€`}
Total: ${order.totals.total.toFixed(2)}€

Método de envío: ${shippingLabels[order.shipping.method] || order.shipping.method}

Datos del cliente:
- Nombre: ${order.customer.nombre}
- Email: ${order.customer.email}
- Teléfono: ${order.customer.telefono}
${order.customer.nif ? `- NIF: ${order.customer.nif}` : ""}
- Dirección: ${order.customer.direccion}, ${order.customer.codigoPostal} ${order.customer.ciudad}, ${order.customer.provincia}
`.trim();
}

export async function sendOrderEmails(order: OrderData): Promise<void> {
  if (!resend) {
    return;
  }

  try {
    await resend.emails.send({
      from: "Óptica Suárez <no-reply@opticasuarezjaen.es>",
      to: [order.customer.email],
      subject: `Pedido confirmado — #${order.orderNumber} | Óptica Suárez`,
      text: buildCustomerEmail(order),
    });
  } catch (err) {
    console.error(
      `[send-order-emails] Failed to send customer email for ${order.orderNumber}:`,
      err
    );
  }

  try {
    await resend.emails.send({
      from: "Óptica Suárez <no-reply@opticasuarezjaen.es>",
      to: ["optica@lorenzogm.com"],
      subject: `Nuevo pedido #${order.orderNumber}`,
      text: buildStoreEmail(order),
    });
  } catch (err) {
    console.error(
      `[send-order-emails] Failed to send store email for ${order.orderNumber}:`,
      err
    );
  }
}
