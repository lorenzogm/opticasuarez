import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import CheckoutEnvio from "~/components/checkout/checkout-envio";
import { useCart } from "~/lib/cart";

export const Route = createFileRoute("/checkout/envio")({
  head: () => ({
    meta: [
      { title: "Método de envío - Checkout | Óptica Suárez" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnvioRoute,
});

function EnvioRoute() {
  const { items } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/carrito" });
    }
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  return <CheckoutEnvio />;
}
