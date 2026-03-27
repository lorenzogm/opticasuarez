import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cita")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
