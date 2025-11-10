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
    <Card className="overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-accent">{icon}</div>}
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 bg-card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className={cn(
                "text-lg font-semibold",
                metric.highlight ? "text-accent" : "text-foreground"
              )}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {isExpanded && children && (
          <div className="mt-4 pt-4 border-t border-border">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
};
