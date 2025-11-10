import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet, Image } from "lucide-react";

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">TCPL Executive Summary FY26</h1>
          <p className="text-sm opacity-90">Last Updated On: {currentDate}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue="fy26">
            <SelectTrigger className="w-[140px] bg-card text-card-foreground">
              <SelectValue placeholder="Financial Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fy26">FY 2026</SelectItem>
              <SelectItem value="fy25">FY 2025</SelectItem>
              <SelectItem value="fy24">FY 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-card text-card-foreground">
              <SelectValue placeholder="Business Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Units</SelectItem>
              <SelectItem value="ams">AMS & O&M</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="advisory">Advisory</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Image className="h-4 w-4" />
              Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
