import { ExpandableSection } from "./ExpandableSection";
import { Briefcase } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
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

const pieData = [
  { name: "Completed", value: 18 },
  { name: "In Progress", value: 10 },
];

const COLORS = ['hsl(var(--accent))', 'hsl(var(--chart-3))'];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-3 text-primary">Client Mandates Overview</h3>
            <div className="overflow-x-auto rounded-lg border border-border/50 bg-card shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold text-[13px] text-typography-primary">Client Name</TableHead>
                    <TableHead className="font-semibold text-[13px] text-typography-primary">Type</TableHead>
                    <TableHead className="font-semibold text-[13px] text-typography-primary">Status</TableHead>
                    <TableHead className="font-semibold text-[13px] text-right text-typography-primary">Manpower</TableHead>
                    <TableHead className="font-semibold text-[13px] text-right text-typography-primary">Expected</TableHead>
                    <TableHead className="font-semibold text-[13px] text-right text-typography-primary">Actual</TableHead>
                    <TableHead className="font-semibold text-[13px] text-right text-typography-primary">Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engineeringData.map((row, idx) => {
                    const variance = ((row.actualRevenue - row.expectedRevenue) / row.expectedRevenue * 100);
                    return (
                      <TableRow key={idx} className="hover:bg-muted/20 transition-colors border-b border-border/30">
                        <TableCell className="font-medium py-3.5 text-[13px] text-typography-primary">{row.client}</TableCell>
                        <TableCell className="py-3.5">
                          <Badge 
                            variant={row.mandateType === "Engineering" ? "default" : "secondary"} 
                            className="text-[11px] font-medium px-2.5 py-0.5"
                          >
                            {row.mandateType}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge 
                            variant={row.status === "Active" ? "outline" : "secondary"}
                            className={`text-[11px] font-medium px-2.5 py-0.5 ${row.status === "Active" ? "border-accent text-accent bg-accent/5" : ""}`}
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5 text-[13px] text-right font-medium text-typography-secondary">{row.manpower}</TableCell>
                        <TableCell className="py-3.5 text-[13px] text-right text-typography-secondary">{formatCurrency(row.expectedRevenue, currencyUnit)}</TableCell>
                        <TableCell className="py-3.5 text-[13px] text-right font-medium text-typography-primary">{formatCurrency(row.actualRevenue, currencyUnit)}</TableCell>
                        <TableCell className="py-3.5 text-[13px] text-right">
                          <div className={`flex items-center justify-end gap-1 font-semibold ${variance >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {variance >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
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

          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold mb-3 text-primary">Mandate Completion Status</h3>
            <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
};
