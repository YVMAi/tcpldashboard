import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variance?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const MetricCard = ({ title, value, subtitle, variance, icon, trend }: MetricCardProps) => {
  const getTrendIcon = () => {
    if (variance === undefined) return null;
    
    if (variance > 0) return <TrendingUp className="h-3.5 w-3.5" />;
    if (variance < 0) return <TrendingDown className="h-3.5 w-3.5" />;
    return <Minus className="h-3.5 w-3.5" />;
  };

  const getTrendColor = () => {
    if (variance === undefined) return "";
    if (variance > 0) return "text-success";
    if (variance < 0) return "text-destructive";
    return "text-warning";
  };

  return (
    <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/40 bg-card shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[13px] font-medium text-typography-secondary tracking-tight uppercase">{title}</h3>
        {icon && (
          <div className="text-accent p-2 rounded-lg bg-accent/10">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-[24px] font-semibold text-accent leading-none tracking-tight">{value}</p>
        {subtitle && <p className="text-[12px] text-typography-secondary leading-relaxed">{subtitle}</p>}
        
        {variance !== undefined && (
          <div className={cn("flex items-center gap-1.5 text-[13px] font-semibold pt-1", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(variance)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};
