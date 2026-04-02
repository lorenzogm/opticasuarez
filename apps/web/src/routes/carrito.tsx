import { createFileRoute } from "@tanstack/react-router";
import CartPage from "~/components/cart/cart-page";
import { fetchSiteSettings } from "~/lib/server-fns";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Carrito - Óptica Suárez" },
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
  component: RouteComponent,
});

function RouteComponent() {
  return <CartPage />;
}
