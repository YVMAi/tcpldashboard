import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  primaryValue: string;
  primarySubtext: string;
  secondaryMetrics: { label: string; value: string }[];
  variance: number;
  icon: React.ReactNode;
}

export const MetricCard = ({ 
  title, 
  primaryValue, 
  primarySubtext, 
  secondaryMetrics, 
  variance, 
  icon 
}: MetricCardProps) => {
  const isPositive = variance > 0;
  
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-[#F4F5F7] rounded-xl border-0">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#001F3F]">{title}</h3>
        <div className="text-[#001F3F] opacity-70">
          {icon}
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Primary Metric */}
        <div>
          <p className="text-3xl font-bold text-[#001F3F] leading-tight">
            {primaryValue}
          </p>
          <p className="text-xs text-[#444444] mt-1">
            {primarySubtext}
          </p>
        </div>

        {/* Secondary Metrics */}
        <div className="space-y-1.5">
          {secondaryMetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-[#444444]">{metric.label}:</span>
              <span className="text-sm font-semibold text-[#001F3F]">{metric.value}</span>
            </div>
          ))}
        </div>

        {/* YoY Comparison */}
        <div className={cn(
          "flex items-center gap-1.5 pt-2 border-t border-[#001F3F]/10",
          isPositive ? "text-[rgb(0,168,107)]" : "text-[#E63946]"
        )}>
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span className="text-xs font-medium">
            {Math.abs(variance)}% {isPositive ? 'higher' : 'lower'} than FY25
          </span>
        </div>
      </div>
    </Card>
  );
};
