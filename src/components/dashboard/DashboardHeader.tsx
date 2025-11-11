import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

export const DashboardHeader = () => {
  const { currencyUnit, setCurrencyUnit } = useCurrency();
  const currentDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="bg-muted border-b border-border p-6 rounded-t-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-primary mb-1 tracking-tight">TCPL Executive Summary FY26</h1>
          <p className="text-[13px] text-typography-secondary font-medium">Last Updated: {currentDate}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue="fy26">
            <SelectTrigger className="w-[140px] h-10 text-[13px] border-accent/30 bg-white hover:border-accent transition-colors shadow-sm">
              <SelectValue placeholder="Financial Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
              <SelectItem value="fy26" className="text-[13px]">FY 2026</SelectItem>
              <SelectItem value="fy25" className="text-[13px]">FY 2025</SelectItem>
              <SelectItem value="fy24" className="text-[13px]">FY 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currencyUnit} onValueChange={(value) => setCurrencyUnit(value as "cr" | "lakhs")}>
            <SelectTrigger className="w-[140px] h-10 text-[13px] border-accent/30 bg-white hover:border-accent transition-colors shadow-sm">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
              <SelectItem value="cr" className="text-[13px]">INR Cr</SelectItem>
              <SelectItem value="lakhs" className="text-[13px]">INR Lakhs</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 h-10 px-5 text-[13px] font-medium border-accent/30 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all shadow-sm"
            >
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 h-10 px-5 text-[13px] font-medium border-accent/30 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all shadow-sm"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
