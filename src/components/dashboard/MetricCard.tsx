import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DualGaugeChart } from "./DualGaugeChart";

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
    <Card className="p-3 hover:shadow-md transition-all duration-200 bg-white rounded-lg border border-[#E5E7EB]">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[11px] font-semibold text-[#001F3F] uppercase tracking-wide">{title}</h3>
        <div className="text-[#001F3F] opacity-60">
          {icon}
        </div>
      </div>
      
      <div className="space-y-2">
        {/* Primary Metric */}
        <div>
          <p className="text-2xl font-bold text-[#001F3F] leading-none">
            {primaryValue}
          </p>
          <p className="text-[10px] text-[#444444] mt-0.5">
            {primarySubtext}
          </p>
        </div>

        {/* Dual Speedometer with Revenue YTD and Receivables */}
        <div className="flex justify-center py-2">
          {(() => {
            const revenueMetric = secondaryMetrics[0] || { label: "Revenue YTD", value: "₹0.00Cr" };
            const receivableMetric = secondaryMetrics[1] || { label: "Receivables", value: "₹0.00Cr" };
            
            const revenueValue = parseFloat(revenueMetric.value.replace(/[₹,CrL]/g, '')) || 0;
            const receivableValue = parseFloat(receivableMetric.value.replace(/[₹,CrL]/g, '')) || 0;
            
            return (
              <DualGaugeChart
                revenueValue={revenueValue}
                revenueLabel={revenueMetric.value}
                receivableValue={receivableValue}
                receivableLabel={receivableMetric.value}
                revenueMax={100}
                receivableMax={20}
                size={130}
              />
            );
          })()}
        </div>
        
        {/* Other Metrics Below */}
        {secondaryMetrics.length > 2 && (
          <div className="space-y-0.5 pt-2 border-t border-[#E5E7EB]">
            {secondaryMetrics.slice(2).map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-[10px] text-[#444444]">{metric.label}:</span>
                <span className="text-xs font-semibold text-[#001F3F]">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* YoY Comparison */}
        <div className={cn(
          "flex items-center gap-1 pt-1.5 border-t border-[#E5E7EB]",
          isPositive ? "text-[rgb(0,168,107)]" : "text-[#E63946]"
        )}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span className="text-[10px] font-medium">
            {Math.abs(variance)}% {isPositive ? 'higher' : 'lower'} than FY25
          </span>
        </div>
      </div>
    </Card>
  );
};
