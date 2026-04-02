import { Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";

interface CheckoutConfirmacionProps {
  orderNumber?: string;
}

export default function CheckoutConfirmacion({
  orderNumber,
}: CheckoutConfirmacionProps) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h1 className="mb-2 font-bold text-2xl text-gray-900">
        ¡Pedido confirmado!
      </h1>
      {orderNumber && (
        <p className="mb-4 font-mono text-gray-600 text-lg">
          Nº de pedido: {orderNumber}
        </p>
      )}
      <p className="mb-2 text-gray-600">
        Gracias por tu compra. Recibirás un email de confirmación con los
        detalles de tu pedido.
      </p>
      <p className="mb-8 text-gray-500 text-sm">
        Si has seleccionado envío a domicilio, recibirás tu pedido en 3-5 días
        laborables. Si has elegido recogida en tienda, te avisaremos cuando esté
        disponible (normalmente en 24 horas).
      </p>
      <div className="flex justify-center gap-4">
        <Link
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          to="/"
        >
          Volver al inicio
        </Link>
        <Link
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          to="/tienda"
        >
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}
