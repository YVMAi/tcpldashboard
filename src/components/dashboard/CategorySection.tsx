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
    <Collapsible defaultOpen={defaultOpen} className="space-y-3">
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-accent px-4 py-3 rounded-lg hover:from-primary/10 transition-all duration-200">
          <h2 className="text-base font-semibold text-primary tracking-tight">
            {title}
          </h2>
          <ChevronDown className="h-4 w-4 text-accent transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
