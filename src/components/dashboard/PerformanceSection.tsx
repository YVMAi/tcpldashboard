import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Zap, ClipboardCheck } from "lucide-react";

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

const complianceData = [
  { client: "Client A", reports: 96, meetings: 92, siteVisits: 100, remarks: "Full compliance" },
  { client: "Client B", reports: 88, meetings: 80, siteVisits: 92, remarks: "Missed 2 meetings" },
  { client: "Client C", reports: 100, meetings: 95, siteVisits: 95, remarks: "Excellent compliance" },
  { client: "Client D", reports: 92, meetings: 85, siteVisits: 98, remarks: "1 late report" },
];

export const PerformanceSection = () => {
  const getSeverityBadge = (severity: string) => {
    const config = {
      low: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
      medium: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
      high: { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20' }
    };
    const style = config[severity as keyof typeof config] || config.low;
    return `${style.bg} ${style.text} ${style.border} border`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-5 shadow-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-warning/10">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <h2 className="text-base font-semibold text-primary">HSE Incidents</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold text-[13px] text-typography-primary">Client</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Plant</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Details</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hseIncidents.map((incident, idx) => (
                <TableRow key={idx} className="hover:bg-muted/20 transition-colors border-b border-border/30">
                  <TableCell className="font-medium py-3.5 text-[13px] text-typography-primary">{incident.client}</TableCell>
                  <TableCell className="py-3.5 text-[13px] text-typography-secondary">{incident.plant}</TableCell>
                  <TableCell className="py-3.5 text-[13px] text-typography-secondary">{incident.details}</TableCell>
                  <TableCell className="py-3.5">
                    <Badge className={`${getSeverityBadge(incident.severity)} text-[11px] font-medium px-2.5 py-1`}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-5 shadow-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-accent/10">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-base font-semibold text-primary">Generation Performance (MTD)</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold text-[13px] text-typography-primary">Client</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">MTD Generation (%)</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generationData.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-muted/20 transition-colors border-b border-border/30">
                  <TableCell className="font-medium py-3.5 text-[13px] text-typography-primary">{row.client}</TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={row.mtdGeneration} 
                        className={`h-2 w-32 ${row.mtdGeneration < 80 ? '[&>div]:bg-destructive' : row.mtdGeneration < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                      />
                      <span className={`font-semibold text-[13px] min-w-[45px] ${row.mtdGeneration < 80 ? 'text-destructive' : row.mtdGeneration < 90 ? 'text-warning' : 'text-success'}`}>
                        {row.mtdGeneration}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-typography-secondary py-3.5 text-[13px]">{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-5 shadow-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-success/10">
            <ClipboardCheck className="h-5 w-5 text-success" />
          </div>
          <h2 className="text-base font-semibold text-primary">Compliance Metrics</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold text-[13px] text-typography-primary">Client</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Reports Submitted (%)</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Meetings Attended (%)</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Site Visits (%)</TableHead>
                <TableHead className="font-semibold text-[13px] text-typography-primary">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceData.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-muted/20 transition-colors border-b border-border/30">
                  <TableCell className="font-medium py-3.5 text-[13px] text-typography-primary">{row.client}</TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={row.reports} 
                        className={`h-2 w-20 ${row.reports < 80 ? '[&>div]:bg-destructive' : row.reports < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                      />
                      <span className={`font-semibold text-[13px] min-w-[40px] ${row.reports < 80 ? 'text-destructive' : row.reports < 90 ? 'text-warning' : 'text-success'}`}>
                        {row.reports}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={row.meetings} 
                        className={`h-2 w-20 ${row.meetings < 80 ? '[&>div]:bg-destructive' : row.meetings < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                      />
                      <span className={`font-semibold text-[13px] min-w-[40px] ${row.meetings < 80 ? 'text-destructive' : row.meetings < 90 ? 'text-warning' : 'text-success'}`}>
                        {row.meetings}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={row.siteVisits} 
                        className={`h-2 w-20 ${row.siteVisits < 80 ? '[&>div]:bg-destructive' : row.siteVisits < 90 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                      />
                      <span className={`font-semibold text-[13px] min-w-[40px] ${row.siteVisits < 80 ? 'text-destructive' : row.siteVisits < 90 ? 'text-warning' : 'text-success'}`}>
                        {row.siteVisits}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-typography-secondary py-3.5 text-[13px]">{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
