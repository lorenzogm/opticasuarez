import { createServerFn } from "@tanstack/react-start";
import { getRedsysFormData } from "~/lib/redsys";
import { sanityCreate } from "~/lib/sanity";

interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  color?: { name: string; hex: string };
  brand?: string;
}

interface CustomerData {
  nombre: string;
  email: string;
  telefono: string;
  nif: string;
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
}

type ShippingMethod = "delivery" | "pickup-bulevar" | "pickup-centro";

interface CreateOrderInput {
  items: OrderItem[];
  customer: CustomerData;
  shippingMethod: ShippingMethod;
}

interface CreateOrderResult {
  success: boolean;
  orderNumber?: string;
  error?: string;
  redsysFormData?: {
    url: string;
    fields: Record<string, string>;
  };
}

const shippingCosts: Record<ShippingMethod, number> = {
  delivery: 5.5,
  "pickup-bulevar": 0,
  "pickup-centro": 0,
};

function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `OS-${dateStr}-${rand}`;
}

function validateInput(data: CreateOrderInput): string | null {
  if (!data.items || data.items.length === 0) {
    return "El carrito está vacío";
  }
  const c = data.customer;
  if (!c.nombre?.trim()) return "El nombre es obligatorio";
  if (!c.email?.trim()) return "El email es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return "Email no válido";
  if (!c.telefono?.trim()) return "El teléfono es obligatorio";
  if (!c.direccion?.trim()) return "La dirección es obligatoria";
  if (!c.codigoPostal?.trim()) return "El código postal es obligatorio";
  if (!c.ciudad?.trim()) return "La ciudad es obligatoria";
  if (!c.provincia?.trim()) return "La provincia es obligatoria";
  if (
    !["delivery", "pickup-bulevar", "pickup-centro"].includes(
      data.shippingMethod
    )
  ) {
    return "Método de envío no válido";
  }
  return null;
}

function sanitizeCustomer(c: CustomerData): CustomerData {
  return {
    nombre: c.nombre.trim().slice(0, 200),
    email: c.email.trim().slice(0, 200),
    telefono: c.telefono.trim().slice(0, 30),
    nif: (c.nif || "").trim().slice(0, 20),
    direccion: c.direccion.trim().slice(0, 300),
    codigoPostal: c.codigoPostal.trim().slice(0, 10),
    ciudad: c.ciudad.trim().slice(0, 100),
    provincia: c.provincia.trim().slice(0, 100),
  };
}

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: CreateOrderInput) => {
    const error = validateInput(data);
    if (error) throw new Error(error);
    return {
      items: data.items.map((item) => ({
        productId: item.productId.trim().slice(0, 100),
        name: item.name.trim().slice(0, 300),
        slug: item.slug.trim().slice(0, 300),
        price: Math.max(0, item.price),
        quantity: Math.min(Math.max(1, item.quantity), 10),
        image: item.image.trim().slice(0, 500),
        color: item.color
          ? {
              name: item.color.name.trim().slice(0, 50),
              hex: item.color.hex.trim().slice(0, 10),
            }
          : undefined,
        brand: item.brand?.trim().slice(0, 100),
      })),
      customer: sanitizeCustomer(data.customer),
      shippingMethod: data.shippingMethod,
    };
  })
  .handler(async ({ data }): Promise<CreateOrderResult> => {
    const orderNumber = generateOrderNumber();
    const shippingCost = shippingCosts[data.shippingMethod];
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal + shippingCost;

    try {
      await sanityCreate({
        _type: "order",
        orderNumber,
        status: "pending",
        items: data.items,
        customer: data.customer,
        shipping: {
          method: data.shippingMethod,
          cost: shippingCost,
        },
        totals: {
          subtotal,
          shipping: shippingCost,
          total,
        },
      });
    } catch {
      return {
        success: false,
        error: "Error al crear el pedido. Inténtalo de nuevo.",
      };
    }

    // Generate Redsys form data if payment credentials are configured
    const redsysMerchantCode = process.env.REDSYS_MERCHANT_CODE;
    const redsysSecretKey = process.env.REDSYS_SECRET_KEY;
    const redsysTerminal = process.env.REDSYS_TERMINAL || "1";
    const redsysUrl =
      process.env.REDSYS_URL ||
      "https://sis-t.redsys.es:25443/sis/realizarPago";

    if (redsysMerchantCode && redsysSecretKey) {
      const baseUrl = process.env.SITE_URL || "https://opticasuarezjaen.es";
      const formData = getRedsysFormData({
        orderNumber,
        amount: total,
        merchantCode: redsysMerchantCode,
        terminal: redsysTerminal,
        secretKey: redsysSecretKey,
        redsysUrl,
        merchantUrl: `${baseUrl}/api/redsys-notification`,
        okUrl: `${baseUrl}/checkout/confirmacion?pedido=${encodeURIComponent(orderNumber)}`,
        koUrl: `${baseUrl}/checkout/error?pedido=${encodeURIComponent(orderNumber)}`,
      });

      return {
        success: true,
        orderNumber,
        redsysFormData: {
          url: formData.url,
          fields: formData.fields as unknown as Record<string, string>,
        },
      };
    }

    // Redsys not configured — go directly to confirmation
    return {
      success: true,
      orderNumber,
    };
  });
