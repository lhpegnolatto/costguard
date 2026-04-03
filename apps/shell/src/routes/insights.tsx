import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { RemoteSlot } from "@/components/remote-slot";

const CrashedRemoteApp = lazy(() => import("insights/crashed"));
const InsightsApp = lazy(() => import("insights/app"));

export const Route = createFileRoute("/insights")({
  component: Index,
});

function Index() {
  return (
    <>
      <RemoteSlot>
        <CrashedRemoteApp />
      </RemoteSlot>
      <RemoteSlot>
        <InsightsApp />
      </RemoteSlot>
    </>
  );
}
