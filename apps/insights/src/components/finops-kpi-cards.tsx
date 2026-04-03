import {
  LandmarkIcon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import finopsData from "@/mocks/finops.json";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function FinOpsKpiCards() {
  const { kpis } = finopsData;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>MTD cloud spend</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currency.format(kpis.mtdSpendUsd)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />+{kpis.mtdSpendChangePct}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Versus prior month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Blended across linked accounts and regions
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Budget variance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis.budgetVariancePct > 0 ? "+" : ""}
            {kpis.budgetVariancePct}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon />
              On track
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Below plan for the period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Compared to finance-approved monthly budget
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Idle / waste estimate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currency.format(kpis.wasteEstimateUsd)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <PiggyBankIcon />
              Recoverable
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Rightsizing and unattached volumes
          </div>
          <div className="text-muted-foreground">
            Heuristic from utilization and orphan scans
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Commitment coverage</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis.commitmentCoveragePct}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <LandmarkIcon />
              RIs and savings plans
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Of eligible on-demand spend covered
          </div>
          <div className="text-muted-foreground">
            Expand coverage to improve effective discount
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
