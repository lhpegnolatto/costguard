import { createFileRoute } from "@tanstack/react-router";
import { createLazyRemote } from "@/components/remote-slot";

const CrashedRemoteApp = createLazyRemote(
  () => import("costguard_insights/crashed"),
);
const InsightsApp = createLazyRemote(() => import("costguard_insights/app"));

export const Route = createFileRoute("/insights")({
  component: Index,
});

function Index() {
  return (
    <>
      <CrashedRemoteApp />
      <InsightsApp />
    </>
  );
}
