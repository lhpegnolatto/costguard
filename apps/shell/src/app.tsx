import { lazy, Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";

const AnalyticsApp = lazy(() =>
  import("analytics/app").catch((err) => {
    // #region agent log
    void fetch(
      "http://127.0.0.1:7315/ingest/ca186edb-0957-4280-9e24-9825d1991a4c",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "778950",
        },
        body: JSON.stringify({
          sessionId: "778950",
          location: "app.tsx:lazy-analytics",
          message: "analytics/app import failed",
          hypothesisId: "H5",
          data: {
            name: err instanceof Error ? err.name : "unknown",
            message: err instanceof Error ? err.message : String(err),
          },
          timestamp: Date.now(),
        }),
      },
    ).catch(() => {});
    // #endregion
    throw err;
  }),
);

export function App() {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <Suspense
              fallback={
                <p className="text-sm text-zinc-500">Loading analytics app..</p>
              }
            >
              <AnalyticsApp />
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
