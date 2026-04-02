import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

interface CheckoutErrorProps {
  orderNumber?: string;
}

export default function CheckoutError({ orderNumber }: CheckoutErrorProps) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
      <h1 className="mb-2 font-bold text-2xl text-gray-900">
        Error en el pago
      </h1>
      {orderNumber && (
        <p className="mb-4 font-mono text-gray-600 text-sm">
          Pedido: {orderNumber}
        </p>
      )}
      <p className="mb-8 text-gray-600">
        No hemos podido procesar tu pago. No se ha realizado ningún cargo. Por
        favor, inténtalo de nuevo o contacta con nosotros.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          to="/carrito"
        >
          Volver al carrito
        </Link>
        <a
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          href="mailto:bulevar@opticasuarezjaen.es"
        >
          Contactar
        </a>
      </div>
    </main>
  );
}
