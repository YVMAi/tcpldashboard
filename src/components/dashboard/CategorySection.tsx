import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CategorySectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CategorySection = ({ title, children, defaultOpen = true }: CategorySectionProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="space-y-4">
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-center justify-between bg-muted/50 border-l-4 border-accent px-5 py-4 rounded-lg hover:bg-muted transition-all duration-200 shadow-sm">
          <h2 className="text-[17px] font-semibold text-primary tracking-tight uppercase">
            {title}
          </h2>
          <ChevronDown className="h-5 w-5 text-accent transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
