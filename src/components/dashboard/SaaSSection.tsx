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
          <h3 className="text-xs font-semibold mb-2 text-foreground">Product-wise Revenue</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">AMS GWp</TableHead>
                  <TableHead>AMS Clients</TableHead>
                  <TableHead className="text-right">SaaS GWp</TableHead>
                  <TableHead>SaaS Clients</TableHead>
                  <TableHead className="text-right">Expected {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right">Actual {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right">Variance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saasProducts.map((row, idx) => {
                  const variance = ((row.actual - row.expected) / row.expected * 100).toFixed(1);
                  return (
                    <TableRow key={idx} className="text-xs">
                      <TableCell className="font-medium py-2">{row.product}</TableCell>
                      <TableCell className="text-right py-2">{row.amsGWp}</TableCell>
                      <TableCell className="py-2 text-muted-foreground text-[10px]">{row.amsClients}</TableCell>
                      <TableCell className="text-right py-2">{row.saasGWp}</TableCell>
                      <TableCell className="py-2 text-muted-foreground text-[10px]">{row.saasClients}</TableCell>
                      <TableCell className="text-right py-2">{formatCurrency(row.expected, currencyUnit)}</TableCell>
                      <TableCell className="text-right py-2">{formatCurrency(row.actual, currencyUnit)}</TableCell>
                      <TableCell className={`text-right font-medium py-2 ${parseFloat(variance) > 0 ? 'text-success' : 'text-destructive'}`}>
                        {parseFloat(variance) > 0 ? '+' : ''}{variance}%
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
