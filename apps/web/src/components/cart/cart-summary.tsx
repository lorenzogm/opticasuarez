import { Link } from "@tanstack/react-router";
import { useCart } from "~/lib/cart";

export default function CartSummary() {
  const { subtotal, itemCount } = useCart();

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="font-semibold text-gray-900 text-lg">Resumen del pedido</h2>
      <dl className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <dt className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? "artículo" : "artículos"})
          </dt>
          <dd className="font-medium text-gray-900">{subtotal.toFixed(2)}€</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-gray-600">Envío</dt>
          <dd className="text-gray-500">Calculado en el siguiente paso</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 font-semibold text-base">
          <dt>Total estimado</dt>
          <dd>{subtotal.toFixed(2)}€</dd>
        </div>
      </dl>
      <Link
        className="mt-6 block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        to="/checkout"
      >
        Tramitar pedido
      </Link>
    </div>
  );
}
