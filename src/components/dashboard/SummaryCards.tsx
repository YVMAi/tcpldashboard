import { MetricCard } from "./MetricCard";
import { Building2, Zap, Briefcase, Cloud } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/currency";

export const SummaryCards = () => {
  const { currencyUnit } = useCurrency();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
      <MetricCard
        title="Portfolio MW"
        value="1,250 MW"
        subtitle="45 Plants"
        variance={12.5}
        icon={<Zap className="h-5 w-5" />}
      />
      
      <MetricCard
        title="Annual Billing (YTD)"
        value={formatCurrency(245, currencyUnit)}
        subtitle={`Expected: ${formatCurrency(220, currencyUnit)}`}
        variance={11.4}
        icon={<Building2 className="h-5 w-5" />}
      />
      
      <MetricCard
        title="Engineering & Advisory"
        value="28"
        subtitle="Eng: 22 | Adv: 6"
        variance={-5.2}
        icon={<Briefcase className="h-5 w-5" />}
      />
      
      <MetricCard
        title="SaaS GWP"
        value="3.2 GW"
        subtitle="142 Clients"
        variance={18.7}
        icon={<Cloud className="h-5 w-5" />}
      />
    </div>
  );
};
