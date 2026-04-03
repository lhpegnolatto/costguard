import * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import finopsData from "@/mocks/finops.json";

const chartConfig = {
  spend: {
    label: "Actual spend",
    color: "var(--chart-1)",
  },
  forecast: {
    label: "Forecast",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const currencyCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function FinOpsSpendChart() {
  const [weeks, setWeeks] = React.useState("12");

  const filteredData = React.useMemo(() => {
    const n = Number.parseInt(weeks, 10);
    const slice = finopsData.spendTrend.slice(-n);
    return slice;
  }, [weeks]);

  return (
    <Card className="@container/card mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Spend vs forecast</CardTitle>
        <CardDescription>
          Weekly actuals compared to rolling forecast
        </CardDescription>
        <CardAction>
          <Select value={weeks} onValueChange={setWeeks}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">Last 4 weeks</SelectItem>
              <SelectItem value="8">Last 8 weeks</SelectItem>
              <SelectItem value="12">Last 12 weeks</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <ComposedChart data={filteredData} margin={{ left: 8, right: 8 }}>
            <defs>
              <linearGradient id="fillSpendFinops" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={56}
              tickFormatter={(v) =>
                currencyCompact.format(typeof v === "number" ? v : Number(v))
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value as string).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="spend"
              type="monotone"
              fill="url(#fillSpendFinops)"
              stroke="var(--color-spend)"
              strokeWidth={2}
            />
            <Line
              dataKey="forecast"
              type="monotone"
              stroke="var(--color-forecast)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
