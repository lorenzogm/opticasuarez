import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ProgressIndicator from "~/components/checkout/progress-indicator";

type ShippingMethod = "delivery" | "pickup-bulevar" | "pickup-centro";

const CHECKOUT_STORAGE_KEY = "opticasuarez_checkout";
const SHIPPING_STORAGE_KEY = "opticasuarez_checkout_shipping";

const shippingOptions: Array<{
  value: ShippingMethod;
  label: string;
  description: string;
  price: number;
  priceLabel: string;
}> = [
  {
    value: "delivery",
    label: "Envío a domicilio (península)",
    description: "Entrega en 3-5 días laborables vía GLS",
    price: 5.5,
    priceLabel: "5,50€",
  },
  {
    value: "pickup-bulevar",
    label: "Recogida en Óptica Suárez Bulevar",
    description: "Av. de Andalucía, 3, 23006 Jaén",
    price: 0,
    priceLabel: "Gratis",
  },
  {
    value: "pickup-centro",
    label: "Recogida en Óptica Suárez Centro",
    description: "P.º de la Estación, 12, 23003 Jaén",
    price: 0,
    priceLabel: "Gratis",
  },
];

function loadShipping(): ShippingMethod | null {
  try {
    const raw = localStorage.getItem(SHIPPING_STORAGE_KEY);
    if (raw === "delivery" || raw === "pickup-bulevar" || raw === "pickup-centro") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export default function CheckoutEnvio() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ShippingMethod | null>(
    loadShipping()
  );
  const [showOutOfPeninsula, setShowOutOfPeninsula] = useState(false);
  const [error, setError] = useState("");

  // Check that step 1 data exists
  const hasCustomerData = !!localStorage.getItem(CHECKOUT_STORAGE_KEY);
  if (!hasCustomerData) {
    navigate({ to: "/checkout" });
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) {
      setError("Selecciona un método de envío");
      return;
    }
    localStorage.setItem(SHIPPING_STORAGE_KEY, selected);
    navigate({ to: "/checkout/resumen" });
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ProgressIndicator currentStep={2} />
      <h1 className="mb-6 font-bold text-2xl text-gray-900">
        Método de envío
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {shippingOptions.map((option) => (
          <label
            className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
              selected === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            key={option.value}
          >
            <input
              checked={selected === option.value}
              className="mt-1"
              name="shipping"
              onChange={() => {
                setSelected(option.value);
                setError("");
                setShowOutOfPeninsula(false);
              }}
              type="radio"
              value={option.value}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {option.label}
                </span>
                <span
                  className={`font-semibold text-sm ${option.price === 0 ? "text-green-600" : "text-gray-900"}`}
                >
                  {option.priceLabel}
                </span>
              </div>
              <p className="mt-0.5 text-gray-500 text-sm">
                {option.description}
              </p>
            </div>
          </label>
        ))}

        <div className="pt-2">
          <button
            className="text-gray-500 text-sm underline hover:text-gray-700"
            onClick={() => setShowOutOfPeninsula(!showOutOfPeninsula)}
            type="button"
          >
            ¿Envío fuera de la península?
          </button>
          {showOutOfPeninsula && (
            <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
              <p className="font-medium text-amber-800">
                Envío fuera de la península ibérica
              </p>
              <p className="mt-1 text-amber-700">
                Debemos consultar el precio de su envío. Por favor, contacte con
                nosotros en{" "}
                <a
                  className="font-medium underline"
                  href="mailto:bulevar@opticasuarezjaen.es"
                >
                  bulevar@opticasuarezjaen.es
                </a>{" "}
                o llame al{" "}
                <a className="font-medium underline" href="tel:+34953093062">
                  953 093 062
                </a>
                .
              </p>
            </div>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex items-center justify-between pt-4">
          <Link
            className="text-blue-600 text-sm hover:underline"
            to="/checkout"
          >
            ← Datos de envío
          </Link>
          <button
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </form>
    </main>
  );
}
