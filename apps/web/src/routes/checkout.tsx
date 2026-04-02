import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fetchSiteSettings } from "~/lib/server-fns";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
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
  return <Outlet />;
}
