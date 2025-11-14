import { ExpandableSection } from "./ExpandableSection";
import { Cloud, ChevronDown, ChevronRight } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const revenueData = [
  { month: "Apr", revenue: 0.15 },
  { month: "May", revenue: 0.17 },
  { month: "Jun", revenue: 0.19 },
  { month: "Jul", revenue: 0.21 },
  { month: "Aug", revenue: 0.19 },
  { month: "Sep", revenue: 0.23 },
  { month: "Oct", revenue: 0.25 },
  { month: "Nov", revenue: 0.24 },
  { month: "Dec", revenue: 0.27 },
  { month: "Jan", revenue: 0.29 },
  { month: "Feb", revenue: 0.31 },
  { month: "Mar", revenue: 0.30 },
];

const saasProducts = [
  { 
    product: "TruGreen Core", 
    amsGWp: 450, 
    amsClients: "Client A, B, C", 
    saasGWp: 520, 
    saasClients: "Client D, E", 
    annualExpectedBilling: 0.45, 
    invoiceRaised: 0.43, 
    outstanding: 0.02, 
    dueInDays: 15,
    clients: [
      { name: "Client A (AMS)", mw: 150, industry: "Solar Developer", annualExpectedBilling: 0.15, invoiceRaised: 0.14, outstanding: 0.01, dueInDays: 10, status: "Active" },
      { name: "Client B (AMS)", mw: 180, industry: "IPP", annualExpectedBilling: 0.18, invoiceRaised: 0.17, outstanding: 0.01, dueInDays: 15, status: "Active" },
      { name: "Client C (AMS)", mw: 120, industry: "RE Platform", annualExpectedBilling: 0.12, invoiceRaised: 0.12, outstanding: 0.00, dueInDays: 20, status: "Active" },
      { name: "Client D (SaaS)", mw: 280, industry: "Wind Developer", annualExpectedBilling: 0.28, invoiceRaised: 0.26, outstanding: 0.02, dueInDays: 18, status: "Active" },
      { name: "Client E (SaaS)", mw: 240, industry: "Hybrid Developer", annualExpectedBilling: 0.24, invoiceRaised: 0.24, outstanding: 0.00, dueInDays: 12, status: "Active" },
    ]
  },
  { 
    product: "Assure", 
    amsGWp: 380, 
    amsClients: "Client F, G", 
    saasGWp: 420, 
    saasClients: "Client H", 
    annualExpectedBilling: 0.38, 
    invoiceRaised: 0.35, 
    outstanding: 0.03, 
    dueInDays: -7,
    clients: [
      { name: "Client F (AMS)", mw: 200, industry: "Solar IPP", annualExpectedBilling: 0.20, invoiceRaised: 0.18, outstanding: 0.02, dueInDays: -7, status: "Active" },
      { name: "Client G (AMS)", mw: 180, industry: "RE Developer", annualExpectedBilling: 0.18, invoiceRaised: 0.17, outstanding: 0.01, dueInDays: 5, status: "Active" },
      { name: "Client H (SaaS)", mw: 420, industry: "Wind Platform", annualExpectedBilling: 0.42, invoiceRaised: 0.40, outstanding: 0.02, dueInDays: 8, status: "Active" },
    ]
  },
  { 
    product: "Nexus", 
    amsGWp: 520, 
    amsClients: "Client I, J, K", 
    saasGWp: 580, 
    saasClients: "Client L, M", 
    annualExpectedBilling: 0.52, 
    invoiceRaised: 0.50, 
    outstanding: 0.02, 
    dueInDays: 20,
    clients: [
      { name: "Client I (AMS)", mw: 180, industry: "Solar EPC", annualExpectedBilling: 0.18, invoiceRaised: 0.17, outstanding: 0.01, dueInDays: 15, status: "Active" },
      { name: "Client J (AMS)", mw: 200, industry: "Wind Developer", annualExpectedBilling: 0.20, invoiceRaised: 0.20, outstanding: 0.00, dueInDays: 20, status: "Active" },
      { name: "Client K (AMS)", mw: 140, industry: "Hybrid IPP", annualExpectedBilling: 0.14, invoiceRaised: 0.13, outstanding: 0.01, dueInDays: 18, status: "Active" },
      { name: "Client L (SaaS)", mw: 300, industry: "Solar Platform", annualExpectedBilling: 0.30, invoiceRaised: 0.29, outstanding: 0.01, dueInDays: 22, status: "Active" },
      { name: "Client M (SaaS)", mw: 280, industry: "RE Asset Owner", annualExpectedBilling: 0.28, invoiceRaised: 0.28, outstanding: 0.00, dueInDays: 25, status: "Active" },
    ]
  },
  { 
    product: "Flow", 
    amsGWp: 280, 
    amsClients: "Client N", 
    saasGWp: 310, 
    saasClients: "Client O, P", 
    annualExpectedBilling: 0.28, 
    invoiceRaised: 0.27, 
    outstanding: 0.01, 
    dueInDays: 10,
    clients: [
      { name: "Client N (AMS)", mw: 280, industry: "Solar Developer", annualExpectedBilling: 0.28, invoiceRaised: 0.27, outstanding: 0.01, dueInDays: 10, status: "Active" },
      { name: "Client O (SaaS)", mw: 160, industry: "Wind IPP", annualExpectedBilling: 0.16, invoiceRaised: 0.16, outstanding: 0.00, dueInDays: 12, status: "Active" },
      { name: "Client P (SaaS)", mw: 150, industry: "Solar EPC", annualExpectedBilling: 0.15, invoiceRaised: 0.14, outstanding: 0.01, dueInDays: 8, status: "Active" },
    ]
  },
  { 
    product: "Flow Lite", 
    amsGWp: 220, 
    amsClients: "Client Q, R", 
    saasGWp: 260, 
    saasClients: "Client S", 
    annualExpectedBilling: 0.22, 
    invoiceRaised: 0.21, 
    outstanding: 0.01, 
    dueInDays: -3,
    clients: [
      { name: "Client Q (AMS)", mw: 120, industry: "Small Solar", annualExpectedBilling: 0.12, invoiceRaised: 0.11, outstanding: 0.01, dueInDays: -3, status: "Active" },
      { name: "Client R (AMS)", mw: 100, industry: "Rooftop Solar", annualExpectedBilling: 0.10, invoiceRaised: 0.10, outstanding: 0.00, dueInDays: 5, status: "Active" },
      { name: "Client S (SaaS)", mw: 260, industry: "Solar Platform", annualExpectedBilling: 0.26, invoiceRaised: 0.25, outstanding: 0.01, dueInDays: 7, status: "Active" },
    ]
  },
  { 
    product: "Pulse", 
    amsGWp: 310, 
    amsClients: "Client T", 
    saasGWp: 340, 
    saasClients: "Client U, V", 
    annualExpectedBilling: 0.31, 
    invoiceRaised: 0.30, 
    outstanding: 0.01, 
    dueInDays: 18,
    clients: [
      { name: "Client T (AMS)", mw: 310, industry: "Wind Developer", annualExpectedBilling: 0.31, invoiceRaised: 0.30, outstanding: 0.01, dueInDays: 18, status: "Active" },
      { name: "Client U (SaaS)", mw: 180, industry: "Solar IPP", annualExpectedBilling: 0.18, invoiceRaised: 0.18, outstanding: 0.00, dueInDays: 20, status: "Active" },
      { name: "Client V (SaaS)", mw: 160, industry: "Hybrid Platform", annualExpectedBilling: 0.16, invoiceRaised: 0.15, outstanding: 0.01, dueInDays: 15, status: "Active" },
    ]
  },
  { 
    product: "Horizon", 
    amsGWp: 190, 
    amsClients: "Client W, X", 
    saasGWp: 220, 
    saasClients: "Client Y", 
    annualExpectedBilling: 0.19, 
    invoiceRaised: 0.18, 
    outstanding: 0.01, 
    dueInDays: 5,
    clients: [
      { name: "Client W (AMS)", mw: 100, industry: "Solar EPC", annualExpectedBilling: 0.10, invoiceRaised: 0.09, outstanding: 0.01, dueInDays: 5, status: "Active" },
      { name: "Client X (AMS)", mw: 90, industry: "Wind Developer", annualExpectedBilling: 0.09, invoiceRaised: 0.09, outstanding: 0.00, dueInDays: 8, status: "Active" },
      { name: "Client Y (SaaS)", mw: 220, industry: "RE Platform", annualExpectedBilling: 0.22, invoiceRaised: 0.21, outstanding: 0.01, dueInDays: 10, status: "Active" },
    ]
  },
];

const pocData = [
  { product: "TruGreen Core", client: "Client Z", pocStartDate: "01/01/2025", pocEndDate: "31/03/2025", status: "Ongoing", reason: "", owner: "Rajesh Kumar", dueInDays: 45, outcome: "Under evaluation" },
  { product: "Assure", client: "Client AA", pocStartDate: "15/12/2024", pocEndDate: "15/02/2025", status: "Converted", reason: "", owner: "Priya Sharma", dueInDays: -30, outcome: "Successfully converted to paid plan" },
  { product: "Nexus", client: "Client BB", pocStartDate: "01/11/2024", pocEndDate: "31/01/2025", status: "Ongoing", reason: "", owner: "Amit Verma", dueInDays: 15, outcome: "Positive feedback received" },
  { product: "Flow", client: "Client CC", pocStartDate: "10/10/2024", pocEndDate: "10/12/2024", status: "Dropped", reason: "Budget constraints on client side", owner: "Sneha Patel", dueInDays: -66, outcome: "Client facing funding issues" },
  { product: "Flow Lite", client: "Client DD", pocStartDate: "20/01/2025", pocEndDate: "20/03/2025", status: "Ongoing", reason: "", owner: "Vikram Singh", dueInDays: 33, outcome: "Initial setup completed" },
  { product: "Pulse", client: "Client EE", pocStartDate: "05/09/2024", pocEndDate: "05/11/2024", status: "Dropped", reason: "Technical integration challenges", owner: "Neha Gupta", dueInDays: -101, outcome: "Incompatible legacy systems" },
  { product: "Horizon", client: "Client FF", pocStartDate: "15/11/2024", pocEndDate: "15/01/2025", status: "Converted", reason: "", owner: "Rohit Malhotra", dueInDays: -30, outcome: "Converted with 3-year contract" },
  { product: "TruGreen Core", client: "Client GG", pocStartDate: "01/02/2025", pocEndDate: "01/04/2025", status: "Ongoing", reason: "", owner: "Kavita Reddy", dueInDays: 50, outcome: "Demo completed successfully" },
  { product: "Nexus", client: "Client HH", pocStartDate: "10/01/2025", pocEndDate: "10/02/2025", status: "Ongoing", reason: "", owner: "Arun Krishnan", dueInDays: 5, outcome: "Data migration in progress" },
];

export const SaaSSection = () => {
  const { currencyUnit } = useCurrency();
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());

  const toggleProduct = (index: number) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProducts(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Ongoing") {
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{status}</Badge>;
    } else if (status === "Converted") {
      return <Badge className="bg-[rgb(0,168,107)] hover:bg-[rgb(0,150,95)] text-white">{status}</Badge>;
    } else {
      return <Badge className="bg-[#E63946] hover:bg-[#d32f3c] text-white">{status}</Badge>;
    }
  };

  return (
    <ExpandableSection
      title="SaaS Products"
      icon={<Cloud className="h-5 w-5" />}
      defaultExpanded={true}
      metrics={[
        { label: "SaaS GWP", value: "3.2 GW", highlight: true },
        { label: "AMS GWP", value: "2.35 GW" },
        { label: "Expected Revenue", value: formatCurrency(1.98, currencyUnit) },
        { label: "Actual Revenue", value: formatCurrency(2.14, currencyUnit), highlight: true },
      ]}
    >
      <div className="space-y-4">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
          <h4 className="text-sm font-semibold text-[#001F3F] mb-3">Month-on-Month Revenue Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#444444' }}
                stroke="#E5E7EB"
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#444444' }}
                stroke="#E5E7EB"
                label={{ value: `Revenue ${formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}`, angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#444444' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [formatCurrency(value, currencyUnit), 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="rgb(0,168,107)" 
                strokeWidth={2}
                dot={{ fill: 'rgb(0,168,107)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product-wise SaaS Performance Table with Client Breakdown */}
        <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="font-semibold text-[#001F3F] w-8"></TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Product</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">AMS GWp</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">AMS Clients</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">SaaS GWp</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">SaaS Clients</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Annual Expected Billing</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Invoice Raised till Date</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Outstanding</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Due in Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saasProducts.map((product, index) => {
                const isExpanded = expandedProducts.has(index);
                return (
                  <>
                    <TableRow key={index} className="hover:bg-[#F0FDF4] cursor-pointer" onClick={() => toggleProduct(index)}>
                      <TableCell>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-[#444444]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#444444]" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-[#001F3F]">{product.product}</TableCell>
                      <TableCell className="text-right text-[#444444]">{product.amsGWp} MW</TableCell>
                      <TableCell className="text-[#444444] text-xs">{product.amsClients}</TableCell>
                      <TableCell className="text-right text-[#444444]">{product.saasGWp} MW</TableCell>
                      <TableCell className="text-[#444444] text-xs">{product.saasClients}</TableCell>
                      <TableCell className="text-right text-[#001F3F] font-semibold">
                        {formatCurrency(product.annualExpectedBilling, currencyUnit)}
                      </TableCell>
                      <TableCell className="text-right text-[#001F3F] font-semibold">
                        {formatCurrency(product.invoiceRaised, currencyUnit)}
                      </TableCell>
                      <TableCell className="text-right text-[#001F3F] font-semibold">
                        {formatCurrency(product.outstanding, currencyUnit)}
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${product.dueInDays >= 0 ? 'text-[rgb(0,168,107)]' : 'text-[#E63946]'}`}>
                        {product.dueInDays >= 0 ? `${product.dueInDays}` : `${product.dueInDays}`}
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow key={`${index}-expanded`}>
                        <TableCell colSpan={10} className="bg-[#F4F5F7] p-0">
                          <div className="p-4">
                            <h5 className="text-sm font-semibold text-[#001F3F] mb-2">Client-Level Breakdown</h5>
                            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-white hover:bg-white">
                                    <TableHead className="font-medium text-[#001F3F] text-xs">Client Name</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs text-right">MW</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs">Industry</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs text-right">Annual Expected Billing</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs text-right">Invoice Raised</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs text-right">Outstanding</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs text-right">Due in Days</TableHead>
                                    <TableHead className="font-medium text-[#001F3F] text-xs">Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {product.clients.map((client, clientIndex) => (
                                    <TableRow key={clientIndex} className="hover:bg-[#F9FAFB]">
                                      <TableCell className="text-[#001F3F] text-sm">{client.name}</TableCell>
                                      <TableCell className="text-right text-[#444444] text-sm">{client.mw} MW</TableCell>
                                      <TableCell className="text-[#444444] text-sm">{client.industry}</TableCell>
                                      <TableCell className="text-right text-[#001F3F] font-medium text-sm">
                                        {formatCurrency(client.annualExpectedBilling, currencyUnit)}
                                      </TableCell>
                                      <TableCell className="text-right text-[#001F3F] font-medium text-sm">
                                        {formatCurrency(client.invoiceRaised, currencyUnit)}
                                      </TableCell>
                                      <TableCell className="text-right text-[#001F3F] font-medium text-sm">
                                        {formatCurrency(client.outstanding, currencyUnit)}
                                      </TableCell>
                                      <TableCell className={`text-right font-semibold text-sm ${client.dueInDays >= 0 ? 'text-[rgb(0,168,107)]' : 'text-[#E63946]'}`}>
                                        {client.dueInDays >= 0 ? `${client.dueInDays}` : `${client.dueInDays}`}
                                      </TableCell>
                                      <TableCell className="text-sm">
                                        <Badge variant="outline" className="text-[rgb(0,168,107)] border-[rgb(0,168,107)]">{client.status}</Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* POC Tracker Section */}
        <div className="mt-6 rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
          <div className="bg-[#F9FAFB] px-4 py-3 border-b border-[#E5E7EB]">
            <h4 className="text-sm font-semibold text-[#001F3F]">SaaS POC Tracker</h4>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-white hover:bg-white">
                <TableHead className="font-semibold text-[#001F3F]">Product</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Client</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">POC Start Date</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">POC End Date</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Status</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Reason (if Dropped)</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Owner</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Due in Days</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">POC Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pocData
                .sort((a, b) => {
                  // Sort overdue POCs to top
                  if (a.dueInDays < 0 && b.dueInDays >= 0) return -1;
                  if (a.dueInDays >= 0 && b.dueInDays < 0) return 1;
                  return a.dueInDays - b.dueInDays;
                })
                .map((poc, index) => (
                  <TableRow key={index} className="hover:bg-[#F0FDF4]">
                    <TableCell className="font-medium text-[#001F3F]">{poc.product}</TableCell>
                    <TableCell className="text-[#444444]">{poc.client}</TableCell>
                    <TableCell className="text-[#444444]">{poc.pocStartDate}</TableCell>
                    <TableCell className="text-[#444444]">{poc.pocEndDate}</TableCell>
                    <TableCell>{getStatusBadge(poc.status)}</TableCell>
                    <TableCell className="text-[#444444] text-sm">{poc.reason || "—"}</TableCell>
                    <TableCell className="text-[#444444]">{poc.owner}</TableCell>
                    <TableCell className={`text-right font-semibold ${poc.dueInDays >= 0 ? 'text-[rgb(0,168,107)]' : 'text-[#E63946]'}`}>
                      {poc.dueInDays >= 0 ? `${poc.dueInDays}` : `${poc.dueInDays}`}
                    </TableCell>
                    <TableCell className="text-[#444444] text-sm">{poc.outcome}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ExpandableSection>
  );
};
