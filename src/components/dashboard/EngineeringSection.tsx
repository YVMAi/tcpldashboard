import { ExpandableSection } from "./ExpandableSection";
import { Briefcase } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const engineeringData = [
  { mandate: "Solar EPC - 50MW", client: "Client X", completion: 85, revenue: 125, status: "In Progress" },
  { mandate: "Grid Connection Study", client: "Client Y", completion: 100, revenue: 45, status: "Completed" },
  { mandate: "Feasibility Analysis", client: "Client Z", completion: 60, revenue: 32, status: "In Progress" },
  { mandate: "Design & Engineering", client: "Client W", completion: 40, revenue: 78, status: "In Progress" },
];

const pieData = [
  { name: "Completed", value: 18 },
  { name: "In Progress", value: 10 },
];

const COLORS = ['hsl(var(--accent))', 'hsl(var(--chart-3))'];

export const EngineeringSection = () => {
  return (
    <ExpandableSection
      title="Engineering Services"
      icon={<Briefcase className="h-5 w-5" />}
      metrics={[
        { label: "Total Mandates", value: "28" },
        { label: "Completed", value: "18", highlight: true },
        { label: "Manpower", value: "42" },
        { label: "Revenue (YTD)", value: "₹82 Cr" },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground">Active Mandates</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mandate</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engineeringData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{row.mandate}</TableCell>
                      <TableCell>{row.client}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={row.completion} className="h-2 w-20" />
                          <span className="text-xs text-muted-foreground">{row.completion}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground">Mandate Completion Status</h3>
            <ResponsiveContainer width="100%" height={250}>
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
