import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Index from "./pages/Index";
import AMDashboard from "./pages/AMDashboard";
import OMTracker from "./pages/OMTracker";
import PLTracker from "./pages/PLTracker";
import HRTracker from "./pages/HRTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path="/am-dashboard" element={<DashboardLayout><AMDashboard /></DashboardLayout>} />
          <Route path="/om-tracker" element={<DashboardLayout><OMTracker /></DashboardLayout>} />
          <Route path="/pl-tracker" element={<DashboardLayout><PLTracker /></DashboardLayout>} />
          <Route path="/hr-tracker" element={<DashboardLayout><HRTracker /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
