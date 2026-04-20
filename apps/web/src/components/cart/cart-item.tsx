import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "~/lib/cart";
import { useCart } from "~/lib/cart";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-6">
      <Link
        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
        params={{ slug: item.slug }}
        to="/tienda/$slug"
      >
        <img
          alt={item.name}
          className="h-full w-full object-cover object-center"
          height={96}
          src={item.image}
          width={96}
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              className="font-medium text-gray-900 hover:text-blue-600"
              params={{ slug: item.slug }}
              to="/tienda/$slug"
            >
              {item.name}
            </Link>
            {item.brand && (
              <p className="mt-0.5 text-gray-500 text-sm">{item.brand}</p>
            )}
            {item.color && (
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.color.hex }}
                />
                <span className="text-gray-500 text-xs">{item.color.name}</span>
              </div>
            )}
          </div>
          <p className="font-semibold text-gray-900">
            {(item.price * item.quantity).toFixed(2)}€
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <button
              aria-label="Reducir cantidad"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              disabled={item.quantity <= 1}
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.quantity - 1,
                  item.color?.name
                )
              }
              type="button"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              aria-label="Aumentar cantidad"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              disabled={item.quantity >= 10}
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.quantity + 1,
                  item.color?.name
                )
              }
              type="button"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            aria-label={`Eliminar ${item.name} del carrito`}
            className="text-gray-400 hover:text-red-500"
            onClick={() => removeItem(item.productId, item.color?.name)}
            type="button"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
