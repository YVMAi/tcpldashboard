import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExpandableSectionProps {
  title: string;
  icon?: React.ReactNode;
  metrics: Array<{ label: string; value: string | number; highlight?: boolean }>;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ExpandableSection = ({
  title,
  icon,
  metrics,
  children,
  defaultExpanded = false
}: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="overflow-hidden shadow-sm border-border/50">
      <div className="bg-primary/5 border-b border-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-md bg-accent/10 text-accent">
                {icon}
              </div>
            )}
            <h2 className="text-base font-semibold text-primary tracking-tight">{title}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:bg-primary/10 hover:text-primary h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="p-5 bg-card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <p className="text-[12px] text-muted-foreground font-medium">{metric.label}</p>
              <p className={cn(
                "text-[18px] font-semibold tracking-tight",
                metric.highlight ? "text-accent" : "text-typography-primary"
              )}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {isExpanded && children && (
          <div className="mt-4 pt-4 border-t border-border/50">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
};
