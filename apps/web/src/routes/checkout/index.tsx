import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import CheckoutDatos from "~/components/checkout/checkout-datos";
import { useCart } from "~/lib/cart";

export const Route = createFileRoute("/checkout/")({
  head: () => ({
    meta: [
      { title: "Datos de envío - Checkout | Óptica Suárez" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutIndex,
});

function CheckoutIndex() {
  const { items } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/carrito" });
    }
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  return <CheckoutDatos />;
}
