import { useState } from "react";
import { ExpandableSection } from "./ExpandableSection";
import { Cloud, ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency, formatCurrencyLabel } from "@/lib/currency";

const saasProducts = [
  { product: "TruGreen Core", amsGWp: 450, amsClients: "Client A, B, C", saasGWp: 520, saasClients: "Client D, E", expected: 0.45, actual: 0.52 },
  { product: "Assure", amsGWp: 380, amsClients: "Client F, G", saasGWp: 420, saasClients: "Client H", expected: 0.38, actual: 0.35 },
  { product: "Nexus", amsGWp: 520, amsClients: "Client I, J, K", saasGWp: 580, saasClients: "Client L, M", expected: 0.52, actual: 0.58 },
  { product: "Flow", amsGWp: 280, amsClients: "Client N", saasGWp: 310, saasClients: "Client O, P", expected: 0.28, actual: 0.31 },
  { product: "Flow Lite", amsGWp: 220, amsClients: "Client Q, R", saasGWp: 260, saasClients: "Client S", expected: 0.22, actual: 0.24 },
  { product: "Pulse", amsGWp: 310, amsClients: "Client T", saasGWp: 340, saasClients: "Client U, V", expected: 0.31, actual: 0.34 },
  { product: "Horizon", amsGWp: 190, amsClients: "Client W, X", saasGWp: 220, saasClients: "Client Y", expected: 0.19, actual: 0.21 },
];

const monthlyData = [
  { month: "Apr", billing: 34 },
  { month: "May", billing: 38 },
  { month: "Jun", billing: 40 },
  { month: "Jul", billing: 43 },
  { month: "Aug", billing: 47 },
  { month: "Sep", billing: 51 },
  { month: "Oct", billing: 54 },
];

export const SaaSSection = () => {
  const { currencyUnit } = useCurrency();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedData = [...saasProducts].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aVal = a[sortConfig.key as keyof typeof a];
    const bVal = b[sortConfig.key as keyof typeof b];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
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
      title="SaaS Products"
      icon={<Cloud className="h-5 w-5" />}
      metrics={[
        { label: "SaaS GWP", value: "3.2 GW", highlight: true },
        { label: "AMS Clients Using SaaS", value: "142" },
        { label: "Expected Revenue", value: formatCurrency(1.98, currencyUnit) },
        { label: "Actual Revenue", value: formatCurrency(2.14, currencyUnit), highlight: true },
      ]}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold mb-2 text-foreground">Product-wise Revenue</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="cursor-pointer" onClick={() => handleSort('product')}>
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      Product <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('amsGWp')}>
                    <div className="flex items-center justify-end gap-1">
                      AMS GWp <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-semibold">AMS Clients</TableHead>
                  <TableHead className="text-right text-xs font-semibold cursor-pointer" onClick={() => handleSort('saasGWp')}>
                    <div className="flex items-center justify-end gap-1">
                      SaaS GWp <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-semibold">SaaS Clients</TableHead>
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
                  <TableHead className="text-right text-xs font-semibold">Variance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((row, idx) => {
                  const variance = ((row.actual - row.expected) / row.expected * 100);
                  return (
                    <TableRow key={idx} className="text-xs hover:bg-accent/10 transition-colors">
                      <TableCell className="font-medium py-2">{row.product}</TableCell>
                      <TableCell className="text-right py-2">{row.amsGWp}</TableCell>
                      <TableCell className="py-2 text-muted-foreground text-[10px]">{row.amsClients}</TableCell>
                      <TableCell className="text-right py-2">{row.saasGWp}</TableCell>
                      <TableCell className="py-2 text-muted-foreground text-[10px]">{row.saasClients}</TableCell>
                      <TableCell className="text-right py-2">{formatCurrency(row.expected, currencyUnit)}</TableCell>
                      <TableCell className="text-right py-2">{formatCurrency(row.actual, currencyUnit)}</TableCell>
                      <TableCell className={`text-right font-medium py-2 ${variance > 0 ? 'text-success' : 'text-destructive'}`}>
                        {variance > 0 ? '+' : ''}{variance.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold mb-2 text-foreground">Monthly Billing Trend (FY26)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="billing" stroke="hsl(var(--primary))" strokeWidth={2} name={`Billing ${formatCurrencyLabel(currencyUnit)}`} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ExpandableSection>
  );
};
