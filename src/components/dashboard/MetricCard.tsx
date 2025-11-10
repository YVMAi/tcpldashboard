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
    
    if (variance > 0) return <TrendingUp className="h-3 w-3" />;
    if (variance < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (variance === undefined) return "";
    if (variance > 0) return "text-success";
    if (variance < 0) return "text-destructive";
    return "text-warning";
  };

  return (
    <Card className="p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      <div className="space-y-0.5">
        <p className="text-xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
        
        {variance !== undefined && (
          <div className={cn("flex items-center gap-0.5 text-xs font-medium", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(variance)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};
