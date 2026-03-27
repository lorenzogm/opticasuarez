import { useState } from "react";
import { submitProductInquiry } from "~/actions/submit-product-inquiry";

interface ProductInquiryFormProps {
  productName: string;
  productSlug: string;
}

export default function ProductInquiryForm({
  productName,
  productSlug,
}: ProductInquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await submitProductInquiry({
        data: { productName, productSlug, name, email, phone, message },
      });
      if (result.success) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">¡Consulta enviada!</p>
        <p className="mt-1 text-green-700 text-sm">
          Nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold text-gray-900">
        Consultar sobre este producto
      </h3>

      <div>
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="inquiry-name"
        >
          Nombre *
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          id="inquiry-name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          value={name}
        />
      </div>

      <div>
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="inquiry-phone"
        >
          Teléfono *
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          id="inquiry-phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          required
          type="tel"
          value={phone}
        />
      </div>

      <div>
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="inquiry-email"
        >
          Email
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          id="inquiry-email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
        />
      </div>

      <div>
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="inquiry-message"
        >
          Mensaje
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          id="inquiry-message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          value={message}
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Ha ocurrido un error. Inténtalo de nuevo.
        </p>
      )}

      <button
        className="w-full rounded-lg bg-blue-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-800 disabled:opacity-50"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
