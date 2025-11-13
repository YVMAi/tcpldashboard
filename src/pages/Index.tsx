import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AMSSection } from "@/components/dashboard/AMSSection";
import { OMSection } from "@/components/dashboard/OMSection";
import { EngineeringSection } from "@/components/dashboard/EngineeringSection";
import { FinancialAdvisorySection } from "@/components/dashboard/FinancialAdvisorySection";
import { SaaSSection } from "@/components/dashboard/SaaSSection";
import { PerformanceSection } from "@/components/dashboard/PerformanceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-2 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-3">
        <DashboardHeader />
        <SummaryCards />
        
        <div className="space-y-3">
          <AMSSection />
          <OMSection />
          <EngineeringSection />
          <FinancialAdvisorySection />
          <SaaSSection />
        </div>

        <PerformanceSection />
      </div>
    </div>
  );
};

export default Index;
