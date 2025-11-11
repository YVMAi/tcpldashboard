import { useState } from "react";
import { ExpandableSection } from "./ExpandableSection";
import { Zap, ArrowUpDown } from "lucide-react";
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
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isGrouped, setIsGrouped] = useState(false);

  const sortedData = [...amsData].sort((a, b) => {
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

  // Group by type
  const groupedData = isGrouped ? sortedData.reduce((acc, row) => {
    if (!acc[row.type]) acc[row.type] = [];
    acc[row.type].push(row);
    return acc;
  }, {} as Record<string, typeof amsData>) : { 'All': sortedData };
  
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
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-foreground">Contract Performance</h3>
            <button
              onClick={() => setIsGrouped(!isGrouped)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-sm touch-manipulation"
            >
              {isGrouped ? 'Ungroup' : 'Group by Type'}
            </button>
          </div>
          <div className="overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="cursor-pointer" onClick={() => handleSort('client')}>
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      Client <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Type</TableHead>
                  <TableHead className="text-center text-xs font-semibold cursor-pointer" onClick={() => handleSort('plants')}>
                    <div className="flex items-center justify-center gap-1">
                      Plants <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('capacity')}>
                    <div className="flex items-center justify-end gap-1">
                      Capacity (MW) <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('expected')}>
                    <div className="flex items-center justify-end gap-1">
                      Expected {formatCurrencyLabel(currencyUnit)} <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('actual')}>
                    <div className="flex items-center justify-end gap-1">
                      Actual {formatCurrencyLabel(currencyUnit)} <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('variance')}>
                    <div className="flex items-center justify-end gap-1">
                      Variance % <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold cursor-pointer" onClick={() => handleSort('manpower')}>
                    <div className="flex items-center justify-center gap-1">
                      Manpower <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedData).map(([type, rows]) => (
                  <>
                    {isGrouped && type !== 'All' && (
                      <TableRow key={`group-${type}`} className="bg-muted/30">
                        <TableCell colSpan={9} className="font-semibold text-xs py-2">
                          {type} ({rows.length})
                        </TableCell>
                      </TableRow>
                    )}
                    {rows.map((row, idx) => (
                      <TableRow key={`${type}-${idx}`} className="text-xs hover:bg-accent/10 transition-colors">
                        <TableCell className="font-medium py-2">{row.client}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant={row.type === 'AMS' ? 'default' : 'secondary'}>
                            {row.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center py-2">{row.plants}</TableCell>
                        <TableCell className="text-right py-2">{row.capacity}</TableCell>
                        <TableCell className="text-right py-2">{formatCurrency(row.expected, currencyUnit)}</TableCell>
                        <TableCell className="text-right py-2">{formatCurrency(row.actual, currencyUnit)}</TableCell>
                        <TableCell className={`text-right font-medium py-2 ${row.variance > 0 ? 'text-success' : 'text-destructive'}`}>
                          {row.variance > 0 ? '+' : ''}{row.variance.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-center py-2">{row.manpower}</TableCell>
                        <TableCell className="text-center py-2">
                          <Badge variant={row.status === 'on-track' ? 'default' : 'destructive'}>
                            {row.status === 'on-track' ? 'On Track' : 'Behind'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
};
