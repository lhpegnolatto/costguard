import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const AnalyticsApp = lazy(() => import("analytics/app"));

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-zinc-500">Loading analytics app..</p>
      }
    >
      <AnalyticsApp />
    </Suspense>
  );
}
