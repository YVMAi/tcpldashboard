import { ExpandableSection } from "./ExpandableSection";
import { Briefcase } from "lucide-react";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Apr", revenue: 0.5 },
  { month: "May", revenue: 0.6 },
  { month: "Jun", revenue: 0.7 },
  { month: "Jul", revenue: 0.8 },
  { month: "Aug", revenue: 0.7 },
  { month: "Sep", revenue: 0.9 },
  { month: "Oct", revenue: 1.0 },
  { month: "Nov", revenue: 0.9 },
  { month: "Dec", revenue: 1.1 },
  { month: "Jan", revenue: 1.2 },
  { month: "Feb", revenue: 1.3 },
  { month: "Mar", revenue: 1.2 },
];

const mandateData = [
  {
    client: "Mahindra Susten",
    dealType: "Debt Financing",
    dealValue: 1.8,
    status: "Active",
    manpower: 3,
    annualExpectedBilling: 1.8,
    invoiceRaised: 1.7,
    outstanding: 0.1,
    dueInDays: 12,
  },
  {
    client: "Fourth Partner Energy",
    dealType: "Series B Fundraise",
    dealValue: 2.2,
    status: "Active",
    manpower: 4,
    annualExpectedBilling: 2.2,
    invoiceRaised: 2.0,
    outstanding: 0.2,
    dueInDays: -5,
  },
  {
    client: "Cleantech Solar",
    dealType: "Project Finance",
    dealValue: 1.5,
    status: "Completed",
    manpower: 2,
    annualExpectedBilling: 1.5,
    invoiceRaised: 1.5,
    outstanding: 0.0,
    dueInDays: 30,
  },
  {
    client: "Oriana Power",
    dealType: "M&A Advisory",
    dealValue: 1.8,
    status: "Active",
    manpower: 3,
    annualExpectedBilling: 1.8,
    invoiceRaised: 1.6,
    outstanding: 0.2,
    dueInDays: 8,
  },
  {
    client: "Ampin Energy",
    dealType: "Growth Capital",
    dealValue: 1.5,
    status: "Active",
    manpower: 2,
    annualExpectedBilling: 1.5,
    invoiceRaised: 1.4,
    outstanding: 0.1,
    dueInDays: -10,
  },
];

export const FinancialAdvisorySection = () => {
  const { currencyUnit } = useCurrency();

  return (
    <ExpandableSection
      title="Financial Advisory"
      icon={<Briefcase className="h-5 w-5" />}
      defaultExpanded={true}
      metrics={[
        { label: "Total Deals", value: "6" },
        { label: "Active Deals", value: "4" },
        { label: "Total Deal Value", value: formatCurrency(8.8, currencyUnit) },
        { label: "Actual Billing", value: formatCurrency(7.9, currencyUnit) },
        { label: "Manpower", value: "14" },
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

        {/* Deal Performance Table */}
        <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="font-semibold text-[#001F3F]">Client Name</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Deal Type</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Deal Value</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Status</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Manpower</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Annual Expected Billing {formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Invoice Raised till Date {formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Outstanding {formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Due in Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mandateData.map((mandate, index) => (
                <TableRow key={index} className="hover:bg-[#F0FDF4]">
                  <TableCell className="font-medium text-[#001F3F]">{mandate.client}</TableCell>
                  <TableCell className="text-[#444444]">{mandate.dealType}</TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(mandate.dealValue, currencyUnit)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        mandate.status === "Active"
                          ? "bg-[#DCFCE7] text-[rgb(0,168,107)] border-[rgb(0,168,107)]"
                          : "bg-[#E0E7FF] text-[#6366F1] border-[#6366F1]"
                      }
                    >
                      {mandate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#444444]">{mandate.manpower}</TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(mandate.annualExpectedBilling, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(mandate.invoiceRaised, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(mandate.outstanding, currencyUnit)}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${mandate.dueInDays >= 0 ? 'text-[rgb(0,168,107)]' : 'text-[#E63946]'}`}>
                    {mandate.dueInDays}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ExpandableSection>
  );
};
