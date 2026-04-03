import { lazy, Suspense } from "react";

const AnalyticsApp = lazy(() => import("analytics/app"));

export function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
      <h1 className="text-3xl font-bold underline">shell</h1>
      <Suspense
        fallback={
          <p className="text-sm text-zinc-500">Loading analytics app...</p>
        }
      >
        <AnalyticsApp />
      </Suspense>
    </main>
  );
}
