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
    <Card className="p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-border/50 bg-card">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[13px] font-medium text-muted-foreground tracking-tight">{title}</h3>
        {icon && (
          <div className="text-accent/70 p-1.5 rounded-md bg-accent/5">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-1.5">
        <p className="text-[20px] font-semibold text-accent leading-none tracking-tight">{value}</p>
        {subtitle && <p className="text-[12px] text-muted-foreground leading-relaxed">{subtitle}</p>}
        
        {variance !== undefined && (
          <div className={cn("flex items-center gap-1 text-[13px] font-medium pt-0.5", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(variance)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};
