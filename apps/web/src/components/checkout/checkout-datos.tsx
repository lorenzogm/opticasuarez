import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ProgressIndicator from "~/components/checkout/progress-indicator";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  nif: string;
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  codigoPostal?: string;
  ciudad?: string;
  provincia?: string;
}

const CHECKOUT_STORAGE_KEY = "opticasuarez_checkout";

function loadCheckoutData(): Partial<FormData> {
  try {
    const raw = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<FormData>;
  } catch {
    return {};
  }
}

function saveCheckoutData(data: FormData): void {
  localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(data));
}

export default function CheckoutDatos() {
  const navigate = useNavigate();
  const saved = loadCheckoutData();

  const [form, setForm] = useState<FormData>({
    nombre: saved.nombre ?? "",
    email: saved.email ?? "",
    telefono: saved.telefono ?? "",
    nif: saved.nif ?? "",
    direccion: saved.direccion ?? "",
    codigoPostal: saved.codigoPostal ?? "",
    ciudad: saved.ciudad ?? "",
    provincia: saved.provincia ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.email.trim()) e.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email no válido";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    if (!form.direccion.trim()) e.direccion = "La dirección es obligatoria";
    if (!form.codigoPostal.trim())
      e.codigoPostal = "El código postal es obligatorio";
    if (!form.ciudad.trim()) e.ciudad = "La ciudad es obligatoria";
    if (!form.provincia.trim()) e.provincia = "La provincia es obligatoria";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    saveCheckoutData(form);
    navigate({ to: "/checkout/envio" });
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ProgressIndicator currentStep={1} />
      <h1 className="mb-6 font-bold text-2xl text-gray-900">
        Datos de envío
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="nombre"
          >
            Nombre completo *
          </label>
          <input
            className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.nombre ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            id="nombre"
            onChange={(e) => handleChange("nombre", e.target.value)}
            type="text"
            value={form.nombre}
          />
          {errors.nombre && (
            <p className="mt-1 text-red-600 text-xs">{errors.nombre}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.email ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              id="email"
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              value={form.email}
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-xs">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="telefono"
            >
              Teléfono *
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.telefono ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              id="telefono"
              onChange={(e) => handleChange("telefono", e.target.value)}
              type="tel"
              value={form.telefono}
            />
            {errors.telefono && (
              <p className="mt-1 text-red-600 text-xs">{errors.telefono}</p>
            )}
          </div>
        </div>

        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="nif"
          >
            NIF / CIF (opcional)
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="nif"
            onChange={(e) => handleChange("nif", e.target.value)}
            type="text"
            value={form.nif}
          />
        </div>

        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="direccion"
          >
            Dirección *
          </label>
          <input
            className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.direccion ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            id="direccion"
            onChange={(e) => handleChange("direccion", e.target.value)}
            placeholder="Calle, número, piso, puerta"
            type="text"
            value={form.direccion}
          />
          {errors.direccion && (
            <p className="mt-1 text-red-600 text-xs">{errors.direccion}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="codigoPostal"
            >
              Código postal *
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.codigoPostal ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              id="codigoPostal"
              maxLength={5}
              onChange={(e) => handleChange("codigoPostal", e.target.value)}
              type="text"
              value={form.codigoPostal}
            />
            {errors.codigoPostal && (
              <p className="mt-1 text-red-600 text-xs">
                {errors.codigoPostal}
              </p>
            )}
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="ciudad"
            >
              Ciudad *
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.ciudad ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              id="ciudad"
              onChange={(e) => handleChange("ciudad", e.target.value)}
              type="text"
              value={form.ciudad}
            />
            {errors.ciudad && (
              <p className="mt-1 text-red-600 text-xs">{errors.ciudad}</p>
            )}
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="provincia"
            >
              Provincia *
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors.provincia ? "border-red-400" : "border-gray-300"} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              id="provincia"
              onChange={(e) => handleChange("provincia", e.target.value)}
              type="text"
              value={form.provincia}
            />
            {errors.provincia && (
              <p className="mt-1 text-red-600 text-xs">{errors.provincia}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link className="text-blue-600 text-sm hover:underline" to="/carrito">
            ← Volver al carrito
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
