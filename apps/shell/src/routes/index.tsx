import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { RemoteSlot } from "@/components/remote-slot";

const AnalyticsApp = lazy(() => import("analytics/app"));

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <RemoteSlot>
      <AnalyticsApp />
    </RemoteSlot>
  );
}
