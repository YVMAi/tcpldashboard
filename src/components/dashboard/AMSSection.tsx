import { ExpandableSection } from "./ExpandableSection";
import { Building2 } from "lucide-react";
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
  { month: "Apr", revenue: 3.5 },
  { month: "May", revenue: 3.8 },
  { month: "Jun", revenue: 4.1 },
  { month: "Jul", revenue: 4.3 },
  { month: "Aug", revenue: 4.0 },
  { month: "Sep", revenue: 4.5 },
  { month: "Oct", revenue: 4.8 },
  { month: "Nov", revenue: 4.6 },
  { month: "Dec", revenue: 5.0 },
  { month: "Jan", revenue: 5.2 },
  { month: "Feb", revenue: 5.4 },
  { month: "Mar", revenue: 5.6 },
];

const contractData = [
  {
    client: "Hero Future Energies",
    capacity: "320 MW",
    plants: 8,
    manpower: 28,
    annualExpectedBilling: 152.4,
    invoiceRaised: 145.2,
    outstanding: 7.2,
    dueInDays: 15,
    status: "Active",
  },
  {
    client: "Greenko Group",
    capacity: "280 MW",
    plants: 7,
    manpower: 24,
    annualExpectedBilling: 134.2,
    invoiceRaised: 128.5,
    outstanding: 5.7,
    dueInDays: -5,
    status: "Active",
  },
  {
    client: "JSW Energy",
    capacity: "210 MW",
    plants: 5,
    manpower: 18,
    annualExpectedBilling: 98.5,
    invoiceRaised: 92.3,
    outstanding: 6.2,
    dueInDays: 8,
    status: "Active",
  },
  {
    client: "NTPC Renewable",
    capacity: "180 MW",
    plants: 4,
    manpower: 16,
    annualExpectedBilling: 86.7,
    invoiceRaised: 80.1,
    outstanding: 6.6,
    dueInDays: -12,
    status: "Active",
  },
  {
    client: "Acme Solar",
    capacity: "260 MW",
    plants: 7,
    manpower: 22,
    annualExpectedBilling: 124.8,
    invoiceRaised: 118.6,
    outstanding: 6.2,
    dueInDays: 22,
    status: "Active",
  },
];

export const AMSSection = () => {
  const { currencyUnit } = useCurrency();

  return (
    <ExpandableSection
      title="Asset Management"
      icon={<Building2 className="h-5 w-5" />}
      defaultExpanded={true}
      metrics={[
        { label: "No. of Plants", value: "31" },
        { label: "Capacity", value: "1,250 MW" },
        { label: "Expected Revenue", value: formatCurrency(596.6, currencyUnit) },
        { label: "Actual Revenue", value: formatCurrency(605.3, currencyUnit) },
        { label: "Manpower", value: "108" },
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

        {/* Contract Performance Table */}
        <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="font-semibold text-[#001F3F]">Client Name</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Capacity</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">No. of Plants</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Manpower</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Annual Expected Billing {formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Invoice Raised till Date {formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Outstanding {formatCurrency(1, currencyUnit).replace(/[\d.]/g, '')}</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Due in Days</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractData.map((contract, index) => (
                <TableRow key={index} className="hover:bg-[#F0FDF4]">
                  <TableCell className="font-medium text-[#001F3F]">{contract.client}</TableCell>
                  <TableCell className="text-[#444444]">{contract.capacity}</TableCell>
                  <TableCell className="text-[#444444]">{contract.plants}</TableCell>
                  <TableCell className="text-[#444444]">{contract.manpower}</TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(contract.annualExpectedBilling, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(contract.invoiceRaised, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(contract.outstanding, currencyUnit)}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${contract.dueInDays >= 0 ? 'text-[rgb(0,168,107)]' : 'text-[#E63946]'}`}>
                    {contract.dueInDays}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-[#DCFCE7] text-[rgb(0,168,107)] border-[rgb(0,168,107)]">
                      {contract.status}
                    </Badge>
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
