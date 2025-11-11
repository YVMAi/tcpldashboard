import { MetricCard } from "./MetricCard";
import { Building2, Zap, Briefcase, Cloud } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/currency";

export const SummaryCards = () => {
  const { currencyUnit } = useCurrency();
  
  return (
    <div className="flex gap-3 mb-3 overflow-x-auto -mx-2 px-2 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory md:snap-none">
      <div className="min-w-[280px] md:min-w-0 snap-center">
        <MetricCard
          title="Portfolio MW"
          value="1,250 MW"
          subtitle="45 Plants"
          variance={12.5}
          icon={<Zap className="h-5 w-5" />}
        />
      </div>
      
      <div className="min-w-[280px] md:min-w-0 snap-center">
        <MetricCard
          title="Annual Billing (YTD)"
          value={formatCurrency(245, currencyUnit)}
          subtitle={`Expected: ${formatCurrency(220, currencyUnit)}`}
          variance={11.4}
          icon={<Building2 className="h-5 w-5" />}
        />
      </div>
      
      <div className="min-w-[280px] md:min-w-0 snap-center">
        <MetricCard
          title="Engineering & Advisory"
          value="28"
          subtitle="Eng: 22 | Adv: 6"
          variance={-5.2}
          icon={<Briefcase className="h-5 w-5" />}
        />
      </div>
      
      <div className="min-w-[280px] md:min-w-0 snap-center">
        <MetricCard
          title="SaaS GWP"
          value="3.2 GW"
          subtitle="142 Clients"
          variance={18.7}
          icon={<Cloud className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};
