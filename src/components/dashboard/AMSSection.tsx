import { ExpandableSection } from "./ExpandableSection";
import { Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const amsData = [
  { client: "Client A", type: "AMS", expected: 245, actual: 268, variance: 9.4, manpower: 12, status: "on-track" },
  { client: "Client B", type: "O&M", expected: 180, actual: 165, variance: -8.3, manpower: 8, status: "behind" },
  { client: "Client C", type: "AMS", expected: 320, actual: 335, variance: 4.7, manpower: 15, status: "on-track" },
  { client: "Client D", type: "O&M", expected: 195, actual: 182, variance: -6.7, manpower: 10, status: "behind" },
];

const chartData = [
  { name: "Client A", Expected: 245, Actual: 268 },
  { name: "Client B", Expected: 180, Actual: 165 },
  { name: "Client C", Expected: 320, Actual: 335 },
  { name: "Client D", Expected: 195, Actual: 182 },
];

export const AMSSection = () => {
  return (
    <ExpandableSection
      title="AMS & O&M"
      icon={<Zap className="h-5 w-5" />}
      metrics={[
        { label: "Capacity", value: "1,250 MWp", highlight: true },
        { label: "No. of Plants", value: "45" },
        { label: "Manpower", value: "285" },
        { label: "Billing Variance", value: "+8.2%", highlight: true },
      ]}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold mb-2 text-foreground">Contract Performance</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Expected (₹L)</TableHead>
                  <TableHead className="text-right">Actual (₹L)</TableHead>
                  <TableHead className="text-right">Variance %</TableHead>
                  <TableHead className="text-center">Manpower</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amsData.map((row, idx) => (
                  <TableRow key={idx} className="text-xs">
                    <TableCell className="font-medium py-2">{row.client}</TableCell>
                    <TableCell className="py-2">
                      <Badge variant={row.type === 'AMS' ? 'default' : 'secondary'}>
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-2">₹{row.expected}L</TableCell>
                    <TableCell className="text-right py-2">₹{row.actual}L</TableCell>
                    <TableCell className={`text-right font-medium py-2 ${row.variance > 0 ? 'text-success' : 'text-destructive'}`}>
                      {row.variance > 0 ? '+' : ''}{row.variance}%
                    </TableCell>
                    <TableCell className="text-center py-2">{row.manpower}</TableCell>
                    <TableCell className="text-center py-2">
                      <Badge variant={row.status === 'on-track' ? 'default' : 'destructive'}>
                        {row.status === 'on-track' ? 'On Track' : 'Behind'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold mb-2 text-foreground">Expected vs Actual Billing</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Expected" fill="hsl(var(--primary))" />
              <Bar dataKey="Actual" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ExpandableSection>
  );
};
