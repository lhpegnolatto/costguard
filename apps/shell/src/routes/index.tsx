import { RemoteErrorBoundary } from "@/components/remote-slot/error-boundary";
import { createFileRoute } from "@tanstack/react-router";

import AnalyticsApp from "analytics/app";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <RemoteErrorBoundary preventRetry>
      <AnalyticsApp />
    </RemoteErrorBoundary>
  );
}
