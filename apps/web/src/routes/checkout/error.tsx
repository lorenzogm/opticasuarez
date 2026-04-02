import { createFileRoute } from "@tanstack/react-router";
import CheckoutError from "~/components/checkout/checkout-error";
import { fetchSiteSettings } from "~/lib/server-fns";

interface ErrorSearch {
  pedido?: string;
}

export const Route = createFileRoute("/checkout/error")({
  validateSearch: (search: Record<string, unknown>): ErrorSearch => ({
    pedido: typeof search.pedido === "string" ? search.pedido : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Error en el pago | Óptica Suárez" },
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
  component: ErrorRoute,
});

function ErrorRoute() {
  const { pedido } = Route.useSearch();
  return <CheckoutError orderNumber={pedido} />;
}
