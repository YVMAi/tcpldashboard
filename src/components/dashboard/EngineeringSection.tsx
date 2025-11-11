import { ExpandableSection } from "./ExpandableSection";
import { Briefcase } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/currency";
import { TrendingUp, TrendingDown } from "lucide-react";

const engineeringData = [
  { client: "Client X", mandateType: "Engineering", status: "Active", manpower: 12, expectedRevenue: 125, actualRevenue: 106 },
  { client: "Client Y", mandateType: "Advisory", status: "Completed", manpower: 5, expectedRevenue: 45, actualRevenue: 45 },
  { client: "Client Z", mandateType: "Engineering", status: "Active", manpower: 8, expectedRevenue: 32, actualRevenue: 19 },
  { client: "Client W", mandateType: "Engineering", status: "Active", manpower: 15, expectedRevenue: 78, actualRevenue: 31 },
  { client: "Client A", mandateType: "Advisory", status: "Active", manpower: 3, expectedRevenue: 28, actualRevenue: 22 },
  { client: "Client B", mandateType: "Engineering", status: "Completed", manpower: 10, expectedRevenue: 65, actualRevenue: 68 },
];


export const EngineeringSection = () => {
  const { currencyUnit } = useCurrency();
  
  return (
    <ExpandableSection
      title="Engineering & Advisory Services"
      icon={<Briefcase className="h-5 w-5" />}
      metrics={[
        { label: "Total Mandates", value: "28" },
        { label: "Engineering", value: "22" },
        { label: "Advisory", value: "6", highlight: true },
        { label: "Revenue (YTD)", value: formatCurrency(82, currencyUnit) },
      ]}
    >
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Client Mandates Overview</h3>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-xs">Client Name</TableHead>
                <TableHead className="font-semibold text-xs">Type</TableHead>
                <TableHead className="font-semibold text-xs">Status</TableHead>
                <TableHead className="font-semibold text-xs text-right">Manpower</TableHead>
                <TableHead className="font-semibold text-xs text-right">Expected</TableHead>
                <TableHead className="font-semibold text-xs text-right">Actual</TableHead>
                <TableHead className="font-semibold text-xs text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engineeringData.map((row, idx) => {
                const variance = ((row.actualRevenue - row.expectedRevenue) / row.expectedRevenue * 100);
                return (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium py-3 text-xs">{row.client}</TableCell>
                    <TableCell className="py-3 text-xs">
                      <Badge variant={row.mandateType === "Engineering" ? "default" : "secondary"} className="text-[10px] font-medium">
                        {row.mandateType}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-xs">
                      <Badge 
                        variant={row.status === "Active" ? "outline" : "secondary"}
                        className={row.status === "Active" ? "border-accent text-accent" : ""}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-right font-medium">{row.manpower}</TableCell>
                    <TableCell className="py-3 text-xs text-right text-muted-foreground">{formatCurrency(row.expectedRevenue, currencyUnit)}</TableCell>
                    <TableCell className="py-3 text-xs text-right font-medium">{formatCurrency(row.actualRevenue, currencyUnit)}</TableCell>
                    <TableCell className="py-3 text-xs text-right">
                      <div className={`flex items-center justify-end gap-1 font-medium ${variance >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {variance >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{variance >= 0 ? '+' : ''}{variance.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </ExpandableSection>
  );
};
