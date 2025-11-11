import { useState } from "react";
import { ExpandableSection } from "./ExpandableSection";
import { Zap, ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency, formatCurrencyLabel } from "@/lib/currency";

const amsData = [
  { client: "Client A", type: "AMS", plants: 8, capacity: 250, expected: 2.45, actual: 2.68, variance: 9.4, status: "on-track" },
  { client: "Client C", type: "AMS", plants: 12, capacity: 380, expected: 3.20, actual: 3.35, variance: 4.7, status: "on-track" },
  { client: "Client B", type: "O&M", plants: 5, capacity: 180, expected: 1.80, actual: 1.65, variance: -8.3, status: "behind" },
  { client: "Client D", type: "O&M", plants: 6, capacity: 220, expected: 1.95, actual: 1.82, variance: -6.7, status: "behind" },
];

const manpowerData = [
  { client: "Client A", type: "AMS", shared: 5, dedicated: 7, total: 12, capacity: 250 },
  { client: "Client C", type: "AMS", shared: 6, dedicated: 9, total: 15, capacity: 380 },
  { client: "Client B", type: "O&M", shared: 3, dedicated: 5, total: 8, capacity: 180 },
  { client: "Client D", type: "O&M", shared: 4, dedicated: 6, total: 10, capacity: 220 },
];

export const AMSSection = () => {
  const { currencyUnit } = useCurrency();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isGrouped, setIsGrouped] = useState(false);
  const [isManpowerGrouped, setIsManpowerGrouped] = useState(false);
  const [manpowerSortConfig, setManpowerSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

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

  const sortedManpowerData = [...manpowerData].sort((a, b) => {
    if (!manpowerSortConfig) return 0;
    
    const aVal = manpowerSortConfig.key === 'manpowerPerMW' 
      ? a.total / a.capacity 
      : a[manpowerSortConfig.key as keyof typeof a];
    const bVal = manpowerSortConfig.key === 'manpowerPerMW' 
      ? b.total / b.capacity 
      : b[manpowerSortConfig.key as keyof typeof b];
    
    if (aVal < bVal) return manpowerSortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return manpowerSortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleManpowerSort = (key: string) => {
    setManpowerSortConfig(prev => ({
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
  
  const groupedManpowerData = isManpowerGrouped ? sortedManpowerData.reduce((acc, row) => {
    if (!acc[row.type]) acc[row.type] = [];
    acc[row.type].push(row);
    return acc;
  }, {} as Record<string, typeof manpowerData>) : { 'All': sortedManpowerData };
  
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
                  <TableHead className="text-center text-xs font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedData).map(([type, rows]) => (
                  <>
                    {isGrouped && type !== 'All' && (
                      <TableRow key={`group-${type}`} className="bg-muted/30">
                        <TableCell colSpan={8} className="font-semibold text-xs py-2">
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-foreground">Manpower Breakdown</h3>
            <button
              onClick={() => setIsManpowerGrouped(!isManpowerGrouped)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-sm touch-manipulation"
            >
              {isManpowerGrouped ? 'Ungroup' : 'Group by Type'}
            </button>
          </div>
          <div className="overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="cursor-pointer" onClick={() => handleManpowerSort('client')}>
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      Client <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Type</TableHead>
                  <TableHead className="text-center text-xs font-semibold cursor-pointer" onClick={() => handleManpowerSort('shared')}>
                    <div className="flex items-center justify-center gap-1">
                      Shared <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold cursor-pointer" onClick={() => handleManpowerSort('dedicated')}>
                    <div className="flex items-center justify-center gap-1">
                      Dedicated <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold cursor-pointer" onClick={() => handleManpowerSort('total')}>
                    <div className="flex items-center justify-center gap-1">
                      Total <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold cursor-pointer" onClick={() => handleManpowerSort('manpowerPerMW')}>
                    <div className="flex items-center justify-center gap-1">
                      Manpower per MW <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedManpowerData).map(([type, rows]) => (
                  <>
                    {isManpowerGrouped && type !== 'All' && (
                      <TableRow key={`manpower-group-${type}`} className="bg-muted/30">
                        <TableCell colSpan={6} className="font-semibold text-xs py-2">
                          {type} ({rows.length})
                        </TableCell>
                      </TableRow>
                    )}
                    {rows.map((row, idx) => (
                      <TableRow key={`manpower-${type}-${idx}`} className="text-xs hover:bg-accent/10 transition-colors">
                        <TableCell className="font-medium py-2">{row.client}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant={row.type === 'AMS' ? 'default' : 'secondary'}>
                            {row.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center py-2">{row.shared}</TableCell>
                        <TableCell className="text-center py-2">{row.dedicated}</TableCell>
                        <TableCell className="text-center py-2">{row.total}</TableCell>
                        <TableCell className="text-center py-2">{(row.total / row.capacity).toFixed(2)}</TableCell>
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
