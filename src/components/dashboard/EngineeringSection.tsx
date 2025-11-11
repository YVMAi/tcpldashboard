import { useState } from "react";
import { ExpandableSection } from "./ExpandableSection";
import { Briefcase, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency, formatCurrencyLabel } from "@/lib/currency";

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
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedData = [...engineeringData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aVal = a[sortConfig.key as keyof typeof a];
    const bVal = b[sortConfig.key as keyof typeof b];
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
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
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="cursor-pointer" onClick={() => handleSort('client')}>
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    Client Name <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold">Type</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('manpower')}>
                  <div className="flex items-center justify-end gap-1">
                    Manpower <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('expectedRevenue')}>
                  <div className="flex items-center justify-end gap-1">
                    Expected {formatCurrencyLabel(currencyUnit)} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('actualRevenue')}>
                  <div className="flex items-center justify-end gap-1">
                    Actual {formatCurrencyLabel(currencyUnit)} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right text-xs font-semibold">Variance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, idx) => {
                const variance = ((row.actualRevenue - row.expectedRevenue) / row.expectedRevenue * 100);
                return (
                  <TableRow key={idx} className="hover:bg-accent/10 transition-colors">
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
                        <span>{variance >= 0 ? '+' : ''}{variance.toFixed(2)}%</span>
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
