import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ProgressIndicator from "~/components/checkout/progress-indicator";
import { useCart } from "~/lib/cart";
import { createOrder } from "~/actions/create-order";

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

const CHECKOUT_STORAGE_KEY = "opticasuarez_checkout";
const SHIPPING_STORAGE_KEY = "opticasuarez_checkout_shipping";

const shippingLabels: Record<ShippingMethod, string> = {
  delivery: "Envío a domicilio (GLS)",
  "pickup-bulevar": "Recogida en Óptica Suárez Bulevar",
  "pickup-centro": "Recogida en Óptica Suárez Centro",
};

const shippingCosts: Record<ShippingMethod, number> = {
  delivery: 5.5,
  "pickup-bulevar": 0,
  "pickup-centro": 0,
};

function loadCustomerData(): CustomerData | null {
  try {
    const raw = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomerData) : null;
  } catch {
    return null;
  }
}

function loadShippingMethod(): ShippingMethod | null {
  try {
    const raw = localStorage.getItem(SHIPPING_STORAGE_KEY);
    if (
      raw === "delivery" ||
      raw === "pickup-bulevar" ||
      raw === "pickup-centro"
    ) {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export default function CheckoutResumen() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const customer = loadCustomerData();
  const shippingMethod = loadShippingMethod();

  if (!customer || !shippingMethod) {
    navigate({ to: "/checkout" });
    return null;
  }

  const shippingCost = shippingCosts[shippingMethod];
  const total = subtotal + shippingCost;

  async function handlePay() {
    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const result = await createOrder({
        data: {
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            color: item.color,
            brand: item.brand,
          })),
          customer: customer as CustomerData,
          shippingMethod: shippingMethod as ShippingMethod,
        },
      });

      if (result.success && result.redsysFormData) {
        // Clear cart and checkout data
        clearCart();
        localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        localStorage.removeItem(SHIPPING_STORAGE_KEY);

        // Submit form to Redsys (auto-redirect)
        const form = document.createElement("form");
        form.method = "POST";
        form.action = result.redsysFormData.url;
        for (const [key, value] of Object.entries(
          result.redsysFormData.fields
        )) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
      } else if (result.success && result.orderNumber) {
        // Redsys not configured — go directly to confirmation
        clearCart();
        localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        localStorage.removeItem(SHIPPING_STORAGE_KEY);
        navigate({
          to: "/checkout/confirmacion",
          search: { pedido: result.orderNumber },
        });
      } else {
        setError(
          result.error || "Error al procesar el pedido. Inténtalo de nuevo."
        );
      }
    } catch {
      setError("Error al procesar el pedido. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ProgressIndicator currentStep={3} />
      <h1 className="mb-6 font-bold text-2xl text-gray-900">
        Resumen del pedido
      </h1>

      {/* Items */}
      <section className="mb-6 rounded-lg border border-gray-200 p-4">
        <h2 className="mb-3 font-semibold text-gray-900">Artículos</h2>
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div
              className="flex items-center gap-3 py-3"
              key={`${item.productId}-${item.color?.name ?? "default"}`}
            >
              <img
                alt={item.name}
                className="h-14 w-14 rounded object-cover"
                height={56}
                src={item.image}
                width={56}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {item.name}
                </p>
                {item.color && (
                  <p className="text-gray-500 text-xs">{item.color.name}</p>
                )}
                <p className="text-gray-500 text-xs">x{item.quantity}</p>
              </div>
              <p className="font-medium text-gray-900 text-sm">
                {(item.price * item.quantity).toFixed(2)}€
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer data */}
      <section className="mb-6 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Datos del cliente</h2>
          <Link
            className="text-blue-600 text-xs hover:underline"
            to="/checkout"
          >
            Editar
          </Link>
        </div>
        <div className="mt-2 space-y-1 text-gray-600 text-sm">
          <p>{customer.nombre}</p>
          <p>{customer.email}</p>
          <p>{customer.telefono}</p>
          {customer.nif && <p>NIF: {customer.nif}</p>}
          <p>
            {customer.direccion}, {customer.codigoPostal} {customer.ciudad},{" "}
            {customer.provincia}
          </p>
        </div>
      </section>

      {/* Shipping */}
      <section className="mb-6 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Envío</h2>
          <Link
            className="text-blue-600 text-xs hover:underline"
            to="/checkout/envio"
          >
            Cambiar
          </Link>
        </div>
        <p className="mt-2 text-gray-600 text-sm">
          {shippingLabels[shippingMethod]}
        </p>
      </section>

      {/* Totals */}
      <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="text-gray-900">{subtotal.toFixed(2)}€</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Envío</dt>
            <dd className={shippingCost === 0 ? "text-green-600" : ""}>
              {shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2)}€`}
            </dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold text-base">
            <dt>Total</dt>
            <dd>{total.toFixed(2)}€</dd>
          </div>
        </dl>
      </section>

      {/* Terms */}
      <label className="mb-4 flex items-start gap-3">
        <input
          checked={termsAccepted}
          className="mt-1"
          onChange={(e) => {
            setTermsAccepted(e.target.checked);
            if (e.target.checked) setError("");
          }}
          type="checkbox"
        />
        <span className="text-gray-600 text-sm">
          Acepto los términos y condiciones de compra. Los datos de pago se
          procesarán de forma segura a través de Redsys.
        </span>
      </label>

      {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

      <div className="flex items-center justify-between">
        <Link
          className="text-blue-600 text-sm hover:underline"
          to="/checkout/envio"
        >
          ← Método de envío
        </Link>
        <button
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          onClick={handlePay}
          type="button"
        >
          {isSubmitting ? "Procesando..." : "Pagar con tarjeta"}
        </button>
      </div>
    </main>
  );
}
