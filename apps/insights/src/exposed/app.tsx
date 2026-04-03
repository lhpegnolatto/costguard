import { FinOpsAllocationTable } from "@/components/finops-allocation-table";
import { FinOpsKpiCards } from "@/components/finops-kpi-cards";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";

export default function App() {
  return (
    <TooltipProvider>
      <main className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <FinOpsKpiCards />

          <div className="flex flex-col gap-6">
            <FinOpsAllocationTable />
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
