import { ExpandableSection } from "./ExpandableSection";
import { Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const amsData = [
  { client: "Client A", type: "AMS", plants: 8, capacity: 250, expected: 245, actual: 268, variance: 9.4, manpower: 12, status: "on-track" },
  { client: "Client C", type: "AMS", plants: 12, capacity: 380, expected: 320, actual: 335, variance: 4.7, manpower: 15, status: "on-track" },
  { client: "Client B", type: "O&M", plants: 5, capacity: 180, expected: 180, actual: 165, variance: -8.3, manpower: 8, status: "behind" },
  { client: "Client D", type: "O&M", plants: 6, capacity: 220, expected: 195, actual: 182, variance: -6.7, manpower: 10, status: "behind" },
];

export const AMSSection = () => {
  return (
    <ExpandableSection
      title="AMS & O&M"
      icon={<Zap className="h-5 w-5" />}
      metrics={[
        { label: "Capacity", value: "1,250 MWp" },
        { label: "Expected Revenue", value: "₹940Cr" },
        { label: "Actual Revenue", value: "₹950Cr", highlight: true },
        { label: "Variance", value: "+1.1%" },
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
                  <TableHead className="text-center">Plants</TableHead>
                  <TableHead className="text-right">Capacity (MW)</TableHead>
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
                    <TableCell className="text-center py-2">{row.plants}</TableCell>
                    <TableCell className="text-right py-2">{row.capacity}</TableCell>
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
      </div>
    </ExpandableSection>
  );
};
