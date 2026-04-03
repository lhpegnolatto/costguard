import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { RemoteSlot } from "@/components/remote-slot";

const InsightsApp = lazy(() => import("insights/app"));

export const Route = createFileRoute("/insights")({
  component: Index,
});

function Index() {
  return (
    <RemoteSlot>
      <InsightsApp />
    </RemoteSlot>
  );
}
