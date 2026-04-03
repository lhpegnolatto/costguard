import { AppLayout } from "@/components/app-layout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <AppLayout>
    <Outlet />
    <TanStackRouterDevtools />
  </AppLayout>
);

export const Route = createRootRoute({ component: RootLayout });
