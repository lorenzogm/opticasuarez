import { describe, expect, it } from "vitest";

// Test the validation and sanitization logic from create-order.ts
// The validator is inlined in createServerFn, so we replicate the exact rules

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

function validateInput(data: Partial<CreateOrderInput>): string | null {
  if (!data.items || data.items.length === 0) {
    return "El carrito está vacío";
  }
  const c = data.customer;
  if (!c?.nombre?.trim()) return "El nombre es obligatorio";
  if (!c.email?.trim()) return "El email es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return "Email no válido";
  if (!c.telefono?.trim()) return "El teléfono es obligatorio";
  if (!c.direccion?.trim()) return "La dirección es obligatoria";
  if (!c.codigoPostal?.trim()) return "El código postal es obligatorio";
  if (!c.ciudad?.trim()) return "La ciudad es obligatoria";
  if (!c.provincia?.trim()) return "La provincia es obligatoria";
  if (
    !["delivery", "pickup-bulevar", "pickup-centro"].includes(
      data.shippingMethod as string
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

const validCustomer: CustomerData = {
  nombre: "María López",
  email: "maria@example.com",
  telefono: "612345678",
  nif: "12345678A",
  direccion: "Calle Mayor 1",
  codigoPostal: "23001",
  ciudad: "Jaén",
  provincia: "Jaén",
};

const validItem: OrderItem = {
  productId: "prod-1",
  name: "Ray-Ban Aviator",
  slug: "ray-ban-aviator",
  price: 150,
  quantity: 1,
  image: "https://cdn.sanity.io/images/img.jpg",
};

const validInput: CreateOrderInput = {
  items: [validItem],
  customer: validCustomer,
  shippingMethod: "delivery",
};

describe("Create Order Validation", () => {
  it("accepts valid input", () => {
    expect(validateInput(validInput)).toBeNull();
  });

  it("rejects empty items array", () => {
    expect(validateInput({ ...validInput, items: [] })).toBe(
      "El carrito está vacío"
    );
  });

  it("rejects missing customer name", () => {
    expect(
      validateInput({
        ...validInput,
        customer: { ...validCustomer, nombre: "" },
      })
    ).toBe("El nombre es obligatorio");
  });

  it("rejects missing email", () => {
    expect(
      validateInput({
        ...validInput,
        customer: { ...validCustomer, email: "" },
      })
    ).toBe("El email es obligatorio");
  });

  it("rejects invalid email", () => {
    expect(
      validateInput({
        ...validInput,
        customer: { ...validCustomer, email: "not-an-email" },
      })
    ).toBe("Email no válido");
  });

  it("rejects missing phone", () => {
    expect(
      validateInput({
        ...validInput,
        customer: { ...validCustomer, telefono: "" },
      })
    ).toBe("El teléfono es obligatorio");
  });

  it("rejects missing address", () => {
    expect(
      validateInput({
        ...validInput,
        customer: { ...validCustomer, direccion: "" },
      })
    ).toBe("La dirección es obligatoria");
  });

  it("rejects invalid shipping method", () => {
    expect(
      validateInput({
        ...validInput,
        shippingMethod: "invalid" as ShippingMethod,
      })
    ).toBe("Método de envío no válido");
  });

  it("accepts all valid shipping methods", () => {
    for (const method of [
      "delivery",
      "pickup-bulevar",
      "pickup-centro",
    ] as ShippingMethod[]) {
      expect(
        validateInput({ ...validInput, shippingMethod: method })
      ).toBeNull();
    }
  });
});

describe("Customer Sanitization", () => {
  it("trims whitespace", () => {
    const result = sanitizeCustomer({
      ...validCustomer,
      nombre: "  María López  ",
    });
    expect(result.nombre).toBe("María López");
  });

  it("limits field lengths", () => {
    const longName = "A".repeat(500);
    const result = sanitizeCustomer({ ...validCustomer, nombre: longName });
    expect(result.nombre.length).toBe(200);
  });

  it("handles empty NIF", () => {
    const result = sanitizeCustomer({ ...validCustomer, nif: "" });
    expect(result.nif).toBe("");
  });
});

describe("Order Number Generation", () => {
  it("generates order number with correct format", () => {
    const orderNumber = generateOrderNumber();
    expect(orderNumber).toMatch(/^OS-\d{8}-\d{4}$/);
  });

  it("generates unique order numbers", () => {
    const numbers = new Set<string>();
    for (let i = 0; i < 100; i++) {
      numbers.add(generateOrderNumber());
    }
    // With 4-digit random, collisions are unlikely in 100 iterations
    expect(numbers.size).toBeGreaterThan(90);
  });
});
