import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import CartItem from "~/components/cart/cart-item";
import CartSummary from "~/components/cart/cart-summary";
import { useCart } from "~/lib/cart";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <h1 className="mb-2 font-bold text-2xl text-gray-900">
          Tu carrito está vacío
        </h1>
        <p className="mb-8 text-gray-500">
          Explora nuestra tienda y encuentra lo que necesitas.
        </p>
        <Link
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          to="/tienda"
        >
          Ir a la tienda
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 font-bold text-2xl text-gray-900">Tu carrito</h1>
      <div className="gap-8 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {items.map((item) => (
              <CartItem
                item={item}
                key={`${item.productId}-${item.color?.name ?? "default"}`}
              />
            ))}
          </div>
          <div className="mt-6">
            <Link
              className="text-blue-600 text-sm hover:underline"
              to="/tienda"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <CartSummary />
        </div>
      </div>
    </main>
  );
}
