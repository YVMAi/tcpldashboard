import { ExpandableSection } from "./ExpandableSection";
import { Briefcase } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/currency";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-semibold mb-2 text-foreground">Client Mandates Overview</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="text-xs">
                    <TableHead>Client Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Manpower</TableHead>
                    <TableHead>Expected Rev</TableHead>
                    <TableHead>Actual Rev</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engineeringData.map((row, idx) => (
                    <TableRow key={idx} className="text-xs">
                      <TableCell className="font-medium py-2">{row.client}</TableCell>
                      <TableCell className="py-2">{row.mandateType}</TableCell>
                      <TableCell className="py-2">
                        <span className={row.status === "Active" ? "text-accent" : "text-muted-foreground"}>
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-2">{row.manpower}</TableCell>
                      <TableCell className="py-2">{formatCurrency(row.expectedRevenue, currencyUnit)}</TableCell>
                      <TableCell className="py-2">{formatCurrency(row.actualRevenue, currencyUnit)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-2 text-foreground">Mandate Completion Status</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
};
