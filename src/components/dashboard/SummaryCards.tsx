import { MetricCard } from "./MetricCard";
import { Building2, Settings, Ruler, Briefcase, Cloud } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/currency";

export const SummaryCards = () => {
  const { currencyUnit } = useCurrency();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
      <MetricCard
        title="Asset Management"
        primaryValue="1,250 MW"
        primarySubtext="Under Management"
        secondaryMetrics={[
          { label: "Expected Revenue", value: formatCurrency(45.6, currencyUnit) },
          { label: "Actual Revenue", value: formatCurrency(42.3, currencyUnit) }
        ]}
        variance={10.8}
        icon={<Building2 className="h-5 w-5" />}
      />
      
      <MetricCard
        title="O&M Operations"
        primaryValue="950 MW"
        primarySubtext="Across 35 Plants"
        secondaryMetrics={[
          { label: "Manpower", value: "120" },
          { label: "Revenue", value: formatCurrency(38.7, currencyUnit) }
        ]}
        variance={8.2}
        icon={<Settings className="h-5 w-5" />}
      />
      
      <MetricCard
        title="Engineering Advisory"
        primaryValue="22 Mandates"
        primarySubtext="8 Completed | 14 Running"
        secondaryMetrics={[
          { label: "Revenue", value: formatCurrency(12.4, currencyUnit) }
        ]}
        variance={-5.2}
        icon={<Ruler className="h-5 w-5" />}
      />
      
      <MetricCard
        title="Financial Advisory"
        primaryValue="6 Deals"
        primarySubtext={`${formatCurrency(8.8, currencyUnit)} Total Value`}
        secondaryMetrics={[
          { label: "Actual Billing", value: formatCurrency(7.9, currencyUnit) }
        ]}
        variance={3.4}
        icon={<Briefcase className="h-5 w-5" />}
      />
      
      <MetricCard
        title="SaaS Solutions"
        primaryValue="3.2 GW"
        primarySubtext="142 Clients"
        secondaryMetrics={[
          { label: "Revenue", value: formatCurrency(9.7, currencyUnit) }
        ]}
        variance={18.7}
        icon={<Cloud className="h-5 w-5" />}
      />
    </div>
  );
};
