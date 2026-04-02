import { createFileRoute } from "@tanstack/react-router";
import CheckoutConfirmacion from "~/components/checkout/checkout-confirmacion";
import { fetchSiteSettings } from "~/lib/server-fns";

interface ConfirmacionSearch {
  pedido?: string;
}

export const Route = createFileRoute("/checkout/confirmacion")({
  validateSearch: (search: Record<string, unknown>): ConfirmacionSearch => ({
    pedido: typeof search.pedido === "string" ? search.pedido : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pedido confirmado | Óptica Suárez" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => {
    const { settings } = await fetchSiteSettings();
    if (!settings?.featureFlags?.ecommerce) {
      throw new Error("Page not found");
    }
    return null;
  },
  component: ConfirmacionRoute,
});

function ConfirmacionRoute() {
  const { pedido } = Route.useSearch();
  return <CheckoutConfirmacion orderNumber={pedido} />;
}
