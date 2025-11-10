import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";

const hseIncidents = [
  { client: "Client A", plant: "Solar Park MP", details: "Minor equipment damage", severity: "low" },
  { client: "Client B", plant: "Wind Farm RJ", details: "Safety protocol violation", severity: "medium" },
];

const generationData = [
  { client: "Client A", mtdGeneration: 95, remarks: "Excellent performance" },
  { client: "Client B", mtdGeneration: 78, remarks: "Weather impact" },
  { client: "Client C", mtdGeneration: 88, remarks: "Within target" },
  { client: "Client D", mtdGeneration: 92, remarks: "Above target" },
];

const complianceMetrics = [
  { metric: "Reports Submitted", value: 94 },
  { metric: "Meetings Attended", value: 88 },
  { metric: "Site Visits", value: 96 },
];

export const PerformanceSection = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h2 className="text-xl font-bold text-foreground">HSE Incidents</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Plant</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hseIncidents.map((incident, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{incident.client}</TableCell>
                  <TableCell>{incident.plant}</TableCell>
                  <TableCell>{incident.details}</TableCell>
                  <TableCell>
                    <Badge variant={incident.severity === 'low' ? 'default' : incident.severity === 'medium' ? 'secondary' : 'destructive'}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Generation Performance (MTD)</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>MTD Generation (%)</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generationData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{row.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={row.mtdGeneration} 
                        className={`h-2 w-32 ${row.mtdGeneration < 80 ? '[&>div]:bg-destructive' : row.mtdGeneration < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                      />
                      <span className={`font-medium ${row.mtdGeneration < 80 ? 'text-destructive' : row.mtdGeneration < 90 ? 'text-warning' : 'text-success'}`}>
                        {row.mtdGeneration}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Compliance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {complianceMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{metric.metric}</span>
                <span className="text-sm font-bold text-accent">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-3" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
