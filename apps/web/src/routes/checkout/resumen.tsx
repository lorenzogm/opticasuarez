import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import CheckoutResumen from "~/components/checkout/checkout-resumen";
import { useCart } from "~/lib/cart";

export const Route = createFileRoute("/checkout/resumen")({
  head: () => ({
    meta: [
      { title: "Resumen del pedido - Checkout | Óptica Suárez" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResumenRoute,
});

function ResumenRoute() {
  const { items } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/carrito" });
    }
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  return <CheckoutResumen />;
}
