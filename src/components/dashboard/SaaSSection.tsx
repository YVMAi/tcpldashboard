import { ExpandableSection } from "./ExpandableSection";
import { Cloud } from "lucide-react";
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
          <h3 className="text-sm font-semibold mb-3 text-primary">Product-wise Revenue</h3>
          <div className="overflow-x-auto rounded-lg border border-border/50 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold text-[13px] text-typography-primary">Product</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">AMS GWp</TableHead>
                  <TableHead className="font-semibold text-[13px] text-typography-primary">AMS Clients</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">SaaS GWp</TableHead>
                  <TableHead className="font-semibold text-[13px] text-typography-primary">SaaS Clients</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Expected {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Actual {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right font-semibold text-[13px] text-typography-primary">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saasProducts.map((row, idx) => {
                  const variance = ((row.actual - row.expected) / row.expected * 100).toFixed(1);
                  return (
                    <TableRow key={idx} className="hover:bg-muted/20 transition-colors border-b border-border/30">
                      <TableCell className="font-medium py-3.5 text-[13px] text-typography-primary">{row.product}</TableCell>
                      <TableCell className="text-right py-3.5 text-[13px] font-medium text-typography-primary">{row.amsGWp}</TableCell>
                      <TableCell className="py-3.5 text-muted-foreground text-[12px]">{row.amsClients}</TableCell>
                      <TableCell className="text-right py-3.5 text-[13px] font-medium text-typography-primary">{row.saasGWp}</TableCell>
                      <TableCell className="py-3.5 text-muted-foreground text-[12px]">{row.saasClients}</TableCell>
                      <TableCell className="text-right py-3.5 text-[13px] text-typography-secondary">{formatCurrency(row.expected, currencyUnit)}</TableCell>
                      <TableCell className="text-right py-3.5 text-[13px] font-medium text-typography-primary">{formatCurrency(row.actual, currencyUnit)}</TableCell>
                      <TableCell className={`text-right font-semibold py-3.5 text-[13px] ${parseFloat(variance) > 0 ? 'text-success' : 'text-destructive'}`}>
                        {parseFloat(variance) > 0 ? '+' : ''}{variance}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 p-4 bg-card shadow-sm">
          <h3 className="text-sm font-semibold mb-3 text-primary">Monthly Billing Trend (FY26)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--typography-secondary))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--typography-secondary))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '13px', color: 'hsl(var(--typography-secondary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="billing" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2.5} 
                name={`Billing ${formatCurrencyLabel(currencyUnit)}`}
                dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ExpandableSection>
  );
};
