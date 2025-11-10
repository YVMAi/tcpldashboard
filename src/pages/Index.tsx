import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AMSSection } from "@/components/dashboard/AMSSection";
import { EngineeringSection } from "@/components/dashboard/EngineeringSection";
import { SaaSSection } from "@/components/dashboard/SaaSSection";
import { PerformanceSection } from "@/components/dashboard/PerformanceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        <SummaryCards />
        
        <div className="space-y-4">
          <AMSSection />
          <EngineeringSection />
          <SaaSSection />
        </div>

        <PerformanceSection />
      </div>
    </div>
  );
};

export default Index;
