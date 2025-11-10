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
      title="Engineering & Advisory Services"
      icon={<Briefcase className="h-5 w-5" />}
      metrics={[
        { label: "Total Mandates", value: "28" },
        { label: "Engineering", value: "22" },
        { label: "Advisory", value: "6", highlight: true },
        { label: "Revenue (YTD)", value: "₹82 Cr" },
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-semibold mb-2 text-foreground">Active Mandates</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="text-xs">
                    <TableHead>Mandate</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engineeringData.map((row, idx) => (
                    <TableRow key={idx} className="text-xs">
                      <TableCell className="font-medium py-2">{row.mandate}</TableCell>
                      <TableCell className="py-2">{row.client}</TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <Progress value={row.completion} className="h-1.5 w-16" />
                          <span className="text-[10px] text-muted-foreground">{row.completion}%</span>
                        </div>
                      </TableCell>
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
