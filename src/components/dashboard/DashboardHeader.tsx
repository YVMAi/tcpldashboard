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
    <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-md mb-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold mb-0.5">TCPL Executive Summary FY26</h1>
          <p className="text-xs opacity-90">Last Updated: {currentDate}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="fy26">
            <SelectTrigger className="w-[120px] h-8 text-xs bg-card text-card-foreground">
              <SelectValue placeholder="Financial Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fy26">FY 2026</SelectItem>
              <SelectItem value="fy25">FY 2025</SelectItem>
              <SelectItem value="fy24">FY 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-8 text-xs bg-card text-card-foreground">
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

          <div className="flex gap-1.5">
            <Button variant="secondary" size="sm" className="gap-1.5 h-8 px-2.5 text-xs">
              <FileDown className="h-3.5 w-3.5" />
              PDF
            </Button>
            <Button variant="secondary" size="sm" className="gap-1.5 h-8 px-2.5 text-xs">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Excel
            </Button>
            <Button variant="secondary" size="sm" className="gap-1.5 h-8 px-2.5 text-xs">
              <Image className="h-3.5 w-3.5" />
              Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
