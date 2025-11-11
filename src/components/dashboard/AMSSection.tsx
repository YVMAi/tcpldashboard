import { ExpandableSection } from "./ExpandableSection";
import { Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency, formatCurrencyLabel } from "@/lib/currency";

const amsData = [
  { client: "Client A", type: "AMS", plants: 8, capacity: 250, expected: 2.45, actual: 2.68, variance: 9.4, manpower: 12, status: "on-track" },
  { client: "Client C", type: "AMS", plants: 12, capacity: 380, expected: 3.20, actual: 3.35, variance: 4.7, manpower: 15, status: "on-track" },
  { client: "Client B", type: "O&M", plants: 5, capacity: 180, expected: 1.80, actual: 1.65, variance: -8.3, manpower: 8, status: "behind" },
  { client: "Client D", type: "O&M", plants: 6, capacity: 220, expected: 1.95, actual: 1.82, variance: -6.7, manpower: 10, status: "behind" },
];

export const AMSSection = () => {
  const { currencyUnit } = useCurrency();
  
  return (
    <ExpandableSection
      title="AMS & O&M"
      icon={<Zap className="h-5 w-5" />}
      metrics={[
        { label: "No. of Plants", value: "31" },
        { label: "Expected Revenue", value: formatCurrency(940, currencyUnit) },
        { label: "Actual Revenue", value: formatCurrency(950, currencyUnit), highlight: true },
        { label: "Manpower", value: "45" },
      ]}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3 text-primary">Contract Performance</h3>
          <div className="overflow-x-auto rounded-lg border border-border/50 bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold text-[13px] text-typography-primary">Client</TableHead>
                  <TableHead className="font-semibold text-[13px] text-typography-primary">Type</TableHead>
                  <TableHead className="text-center font-semibold text-[13px] text-typography-primary">Plants</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Capacity (MW)</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Expected {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Actual {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Variance</TableHead>
                  <TableHead className="text-center font-semibold text-[13px] text-typography-primary">Manpower</TableHead>
                  <TableHead className="text-center font-semibold text-[13px] text-typography-primary">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amsData.map((row, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/20 transition-colors border-b border-border/30">
                    <TableCell className="font-medium py-3.5 text-[13px] text-typography-primary">{row.client}</TableCell>
                    <TableCell className="py-3.5">
                      <Badge 
                        variant={row.type === 'AMS' ? 'default' : 'secondary'}
                        className="text-[11px] font-medium px-2.5 py-0.5"
                      >
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-3.5 text-[13px] text-typography-secondary">{row.plants}</TableCell>
                    <TableCell className="text-right py-3.5 text-[13px] font-medium text-typography-primary">{row.capacity}</TableCell>
                    <TableCell className="text-right py-3.5 text-[13px] text-typography-secondary">{formatCurrency(row.expected, currencyUnit)}</TableCell>
                    <TableCell className="text-right py-3.5 text-[13px] font-medium text-typography-primary">{formatCurrency(row.actual, currencyUnit)}</TableCell>
                    <TableCell className={`text-right font-semibold py-3.5 text-[13px] ${row.variance > 0 ? 'text-success' : 'text-destructive'}`}>
                      {row.variance > 0 ? '+' : ''}{row.variance}%
                    </TableCell>
                    <TableCell className="text-center py-3.5 text-[13px] text-typography-secondary">{row.manpower}</TableCell>
                    <TableCell className="text-center py-3.5">
                      <Badge 
                        variant={row.status === 'on-track' ? 'default' : 'destructive'}
                        className="text-[11px] font-medium px-2.5 py-0.5"
                      >
                        {row.status === 'on-track' ? 'On Track' : 'Behind'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
};
