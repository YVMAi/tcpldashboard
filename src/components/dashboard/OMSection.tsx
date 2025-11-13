import { ExpandableSection } from "./ExpandableSection";
import { Settings } from "lucide-react";
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
  { month: "Apr", revenue: 2.8 },
  { month: "May", revenue: 3.1 },
  { month: "Jun", revenue: 3.3 },
  { month: "Jul", revenue: 3.6 },
  { month: "Aug", revenue: 3.4 },
  { month: "Sep", revenue: 3.8 },
  { month: "Oct", revenue: 4.2 },
  { month: "Nov", revenue: 4.0 },
  { month: "Dec", revenue: 4.3 },
  { month: "Jan", revenue: 4.5 },
  { month: "Feb", revenue: 4.7 },
  { month: "Mar", revenue: 4.9 },
];

const contractData = [
  {
    client: "ReNew Power",
    capacity: "180 MW",
    plants: 4,
    manpower: 15,
    expectedRevenue: 85.5,
    actualRevenue: 88.2,
    variance: 3.2,
    status: "Active",
  },
  {
    client: "Tata Power",
    capacity: "220 MW",
    plants: 6,
    manpower: 22,
    expectedRevenue: 105.8,
    actualRevenue: 102.4,
    variance: -3.2,
    status: "Active",
  },
  {
    client: "Adani Green",
    capacity: "150 MW",
    plants: 3,
    manpower: 12,
    expectedRevenue: 72.3,
    actualRevenue: 75.6,
    variance: 4.6,
    status: "Active",
  },
  {
    client: "Azure Power",
    capacity: "140 MW",
    plants: 5,
    manpower: 18,
    expectedRevenue: 68.9,
    actualRevenue: 67.2,
    variance: -2.5,
    status: "Active",
  },
  {
    client: "Avaada Energy",
    capacity: "260 MW",
    plants: 7,
    manpower: 28,
    expectedRevenue: 128.7,
    actualRevenue: 131.5,
    variance: 2.2,
    status: "Active",
  },
];

export const OMSection = () => {
  const { currencyUnit } = useCurrency();

  return (
    <ExpandableSection
      title="O&M Operations"
      icon={<Settings className="h-5 w-5" />}
      defaultExpanded={true}
      metrics={[
        { label: "No. of Plants", value: "25" },
        { label: "Capacity", value: "950 MW" },
        { label: "Expected Revenue", value: formatCurrency(461.2, currencyUnit) },
        { label: "Actual Revenue", value: formatCurrency(464.9, currencyUnit) },
        { label: "Manpower", value: "95" },
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
                <TableHead className="font-semibold text-[#001F3F] text-right">Expected Revenue</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Actual Revenue</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Variance %</TableHead>
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
                    {formatCurrency(contract.expectedRevenue, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(contract.actualRevenue, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={contract.variance >= 0 ? "text-[rgb(0,168,107)] font-semibold" : "text-[#E63946] font-semibold"}>
                      {contract.variance >= 0 ? "+" : ""}{contract.variance}%
                    </span>
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
