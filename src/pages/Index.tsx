import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { AMSSection } from "@/components/dashboard/AMSSection";
import { EngineeringSection } from "@/components/dashboard/EngineeringSection";
import { SaaSSection } from "@/components/dashboard/SaaSSection";
import { PerformanceSection } from "@/components/dashboard/PerformanceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-3 md:p-5 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <DashboardHeader />
        <SummaryCards />
        
        <CategorySection title="Business Units">
          <AMSSection />
          <EngineeringSection />
          <SaaSSection />
        </CategorySection>

        <CategorySection title="Operational Performance">
          <PerformanceSection />
        </CategorySection>
      </div>
    </div>
  );
};

export default Index;
