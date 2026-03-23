import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cita")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
