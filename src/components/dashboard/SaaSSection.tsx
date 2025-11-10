import { ExpandableSection } from "./ExpandableSection";
import { Cloud } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency, formatCurrencyLabel } from "@/lib/currency";

const saasProducts = [
  { product: "TruGenie", expected: 0.45, actual: 0.52, clients: 38 },
  { product: "TruGreen", expected: 0.38, actual: 0.35, clients: 28 },
  { product: "TruOps", expected: 0.52, actual: 0.58, clients: 45 },
  { product: "TruCovenant", expected: 0.28, actual: 0.31, clients: 22 },
  { product: "TruFlow", expected: 0.35, actual: 0.38, clients: 24 },
];

const monthlyData = [
  { month: "Apr", TruGenie: 8, TruGreen: 6, TruOps: 9, TruCovenant: 5, TruFlow: 6 },
  { month: "May", TruGenie: 9, TruGreen: 7, TruOps: 10, TruCovenant: 5, TruFlow: 7 },
  { month: "Jun", TruGenie: 10, TruGreen: 6, TruOps: 11, TruCovenant: 6, TruFlow: 7 },
  { month: "Jul", TruGenie: 11, TruGreen: 8, TruOps: 12, TruCovenant: 6, TruFlow: 8 },
  { month: "Aug", TruGenie: 14, TruGreen: 8, TruOps: 16, TruCovenant: 9, TruFlow: 10 },
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
                  <TableHead className="text-right">Expected {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right">Actual {formatCurrencyLabel(currencyUnit)}</TableHead>
                  <TableHead className="text-right">Variance %</TableHead>
                  <TableHead className="text-center">Clients</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saasProducts.map((row, idx) => {
                  const variance = ((row.actual - row.expected) / row.expected * 100).toFixed(1);
                  return (
                    <TableRow key={idx} className="text-xs">
                      <TableCell className="font-medium py-2">{row.product}</TableCell>
                      <TableCell className="text-right py-2">{formatCurrency(row.expected, currencyUnit)}</TableCell>
                      <TableCell className="text-right py-2">{formatCurrency(row.actual, currencyUnit)}</TableCell>
                      <TableCell className={`text-right font-medium py-2 ${parseFloat(variance) > 0 ? 'text-success' : 'text-destructive'}`}>
                        {parseFloat(variance) > 0 ? '+' : ''}{variance}%
                      </TableCell>
                      <TableCell className="text-center py-2">{row.clients}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold mb-2 text-foreground">Monthly Billing Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="TruGenie" stroke="hsl(var(--accent))" strokeWidth={2} />
              <Line type="monotone" dataKey="TruGreen" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Line type="monotone" dataKey="TruOps" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="TruCovenant" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              <Line type="monotone" dataKey="TruFlow" stroke="hsl(var(--chart-4))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ExpandableSection>
  );
};
