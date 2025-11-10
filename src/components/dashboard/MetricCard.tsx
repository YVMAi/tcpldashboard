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
    
    if (variance > 0) return <TrendingUp className="h-4 w-4" />;
    if (variance < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (variance === undefined) return "";
    if (variance > 0) return "text-success";
    if (variance < 0) return "text-destructive";
    return "text-warning";
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        
        {variance !== undefined && (
          <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(variance)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};
