import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Zap, ClipboardCheck } from "lucide-react";

const hseIncidents = [
  { client: "Client A", plant: "Solar Park MP", details: "Minor equipment damage", severity: "low", type: "Equipment" },
  { client: "Client B", plant: "Wind Farm RJ", details: "Safety protocol violation", severity: "medium", type: "Safety" },
];

const generationData = [
  { client: "Client A", mtdGeneration: 95, remarks: "Excellent performance", performanceCategory: "Excellent (>90%)" },
  { client: "Client B", mtdGeneration: 78, remarks: "Weather impact", performanceCategory: "Below Target (<80%)" },
  { client: "Client C", mtdGeneration: 88, remarks: "Within target", performanceCategory: "Good (80-90%)" },
  { client: "Client D", mtdGeneration: 92, remarks: "Above target", performanceCategory: "Excellent (>90%)" },
];

const complianceData = [
  { client: "Client A", reports: 96, meetings: 92, siteVisits: 100, remarks: "Full compliance", complianceLevel: "Excellent (>90%)" },
  { client: "Client B", reports: 88, meetings: 80, siteVisits: 92, remarks: "Missed 2 meetings", complianceLevel: "Good (80-90%)" },
  { client: "Client C", reports: 100, meetings: 95, siteVisits: 95, remarks: "Excellent compliance", complianceLevel: "Excellent (>90%)" },
  { client: "Client D", reports: 92, meetings: 85, siteVisits: 98, remarks: "1 late report", complianceLevel: "Good (80-90%)" },
];

export const PerformanceSection = () => {
  return (
    <div className="space-y-3">
      <Card className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h2 className="text-base font-bold text-foreground">HSE Incidents</h2>
        </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="text-xs font-semibold">Client</TableHead>
                  <TableHead className="text-xs font-semibold">Plant</TableHead>
                  <TableHead className="text-xs font-semibold">Details</TableHead>
                  <TableHead className="text-xs font-semibold">Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(
                  hseIncidents.reduce((acc, incident) => {
                    if (!acc[incident.severity]) acc[incident.severity] = [];
                    acc[incident.severity].push(incident);
                    return acc;
                  }, {} as Record<string, typeof hseIncidents>)
                ).map(([severity, incidents]) => (
                  <>
                    <TableRow key={`group-${severity}`} className="bg-muted/30">
                      <TableCell colSpan={4} className="font-semibold text-xs py-2">
                        {severity.toUpperCase()} Severity ({incidents.length})
                      </TableCell>
                    </TableRow>
                    {incidents.map((incident, idx) => (
                      <TableRow key={`${severity}-${idx}`} className="text-xs hover:bg-accent/10 transition-colors">
                        <TableCell className="font-medium py-2">{incident.client}</TableCell>
                        <TableCell className="py-2">{incident.plant}</TableCell>
                        <TableCell className="py-2">{incident.details}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant={incident.severity === 'low' ? 'default' : incident.severity === 'medium' ? 'secondary' : 'destructive'}>
                            {incident.severity.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
      </Card>

      <Card className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-accent" />
          <h2 className="text-base font-bold text-foreground">Generation Performance (MTD)</h2>
        </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="text-xs font-semibold">Client</TableHead>
                  <TableHead className="text-xs font-semibold">MTD Generation (%)</TableHead>
                  <TableHead className="text-xs font-semibold">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(
                  generationData.reduce((acc, row) => {
                    if (!acc[row.performanceCategory]) acc[row.performanceCategory] = [];
                    acc[row.performanceCategory].push(row);
                    return acc;
                  }, {} as Record<string, typeof generationData>)
                ).sort((a, b) => b[0].localeCompare(a[0])).map(([category, rows]) => (
                  <>
                    <TableRow key={`group-${category}`} className="bg-muted/30">
                      <TableCell colSpan={3} className="font-semibold text-xs py-2">
                        {category} ({rows.length})
                      </TableCell>
                    </TableRow>
                    {rows.map((row, idx) => (
                      <TableRow key={`${category}-${idx}`} className="text-xs hover:bg-accent/10 transition-colors">
                        <TableCell className="font-medium py-2">{row.client}</TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={row.mtdGeneration} 
                              className={`h-1.5 w-24 ${row.mtdGeneration < 80 ? '[&>div]:bg-destructive' : row.mtdGeneration < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                            />
                            <span className={`font-medium text-[10px] ${row.mtdGeneration < 80 ? 'text-destructive' : row.mtdGeneration < 90 ? 'text-warning' : 'text-success'}`}>
                              {row.mtdGeneration}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground py-2">{row.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
      </Card>

      <Card className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardCheck className="h-4 w-4 text-success" />
          <h2 className="text-base font-bold text-foreground">Compliance Metrics</h2>
        </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="text-xs font-semibold">Client</TableHead>
                  <TableHead className="text-xs font-semibold">Reports Submitted (%)</TableHead>
                  <TableHead className="text-xs font-semibold">Meetings Attended (%)</TableHead>
                  <TableHead className="text-xs font-semibold">Site Visits (%)</TableHead>
                  <TableHead className="text-xs font-semibold">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(
                  complianceData.reduce((acc, row) => {
                    if (!acc[row.complianceLevel]) acc[row.complianceLevel] = [];
                    acc[row.complianceLevel].push(row);
                    return acc;
                  }, {} as Record<string, typeof complianceData>)
                ).sort((a, b) => b[0].localeCompare(a[0])).map(([level, rows]) => (
                  <>
                    <TableRow key={`group-${level}`} className="bg-muted/30">
                      <TableCell colSpan={5} className="font-semibold text-xs py-2">
                        {level} ({rows.length})
                      </TableCell>
                    </TableRow>
                    {rows.map((row, idx) => (
                      <TableRow key={`${level}-${idx}`} className="text-xs hover:bg-accent/10 transition-colors">
                        <TableCell className="font-medium py-2">{row.client}</TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={row.reports} 
                              className={`h-1.5 w-16 ${row.reports < 80 ? '[&>div]:bg-destructive' : row.reports < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                            />
                            <span className={`font-medium text-[10px] ${row.reports < 80 ? 'text-destructive' : row.reports < 90 ? 'text-warning' : 'text-success'}`}>
                              {row.reports}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={row.meetings} 
                              className={`h-1.5 w-16 ${row.meetings < 80 ? '[&>div]:bg-destructive' : row.meetings < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                            />
                            <span className={`font-medium text-[10px] ${row.meetings < 80 ? 'text-destructive' : row.meetings < 90 ? 'text-warning' : 'text-success'}`}>
                              {row.meetings}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={row.siteVisits} 
                              className={`h-1.5 w-16 ${row.siteVisits < 80 ? '[&>div]:bg-destructive' : row.siteVisits < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                            />
                            <span className={`font-medium text-[10px] ${row.siteVisits < 80 ? 'text-destructive' : row.siteVisits < 90 ? 'text-warning' : 'text-success'}`}>
                              {row.siteVisits}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground py-2">{row.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
      </Card>
    </div>
  );
};
