import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import finopsData from "@/mocks/finops.json";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface Row {
  name: string;
  spendUsd: number;
  pctOfTotal: number;
  trend: string;
}

function TrendCell({ trend }: { trend: string }) {
  if (trend === "up") {
    return (
      <Badge variant="outline" className="gap-1 font-normal">
        <TrendingUpIcon className="size-3.5" />
        Up
      </Badge>
    );
  }
  if (trend === "down") {
    return (
      <Badge variant="outline" className="gap-1 font-normal">
        <TrendingDownIcon className="size-3.5" />
        Down
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1 font-normal">
      <MinusIcon className="size-3.5" />
      Flat
    </Badge>
  );
}

function AllocationTable({ rows }: { rows: Row[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Name</TableHead>
          <TableHead className="text-right">Spend</TableHead>
          <TableHead className="text-right">% of total</TableHead>
          <TableHead className="text-right">Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell className="text-right tabular-nums">
              {currency.format(row.spendUsd)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {row.pctOfTotal}%
            </TableCell>
            <TableCell className="text-right">
              <TrendCell trend={row.trend} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function FinOpsAllocationTable() {
  const byCategory = finopsData.allocationByCategory as Row[];
  const byService = finopsData.allocationByService as Row[];

  return (
    <Card className="mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Cost allocation</CardTitle>
        <CardDescription>
          Mock breakdown — replace with tagged billing exports when connected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="service">By service</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-0">
            <AllocationTable rows={byCategory} />
          </TabsContent>
          <TabsContent value="service" className="mt-0">
            <AllocationTable rows={byService} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
