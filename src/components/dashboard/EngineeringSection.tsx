import { ExpandableSection } from "./ExpandableSection";
import { Ruler } from "lucide-react";
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
  { month: "Apr", revenue: 0.9 },
  { month: "May", revenue: 1.0 },
  { month: "Jun", revenue: 1.1 },
  { month: "Jul", revenue: 1.2 },
  { month: "Aug", revenue: 1.0 },
  { month: "Sep", revenue: 1.3 },
  { month: "Oct", revenue: 1.4 },
  { month: "Nov", revenue: 1.3 },
  { month: "Dec", revenue: 1.5 },
  { month: "Jan", revenue: 1.6 },
  { month: "Feb", revenue: 1.7 },
  { month: "Mar", revenue: 1.5 },
];

const engineeringData = [
  {
    client: "Sterling & Wilson",
    type: "Tech DD",
    status: "Active",
    manpower: 8,
    expected: 3.2,
    actual: 3.0,
  },
  {
    client: "Vikram Solar",
    type: "LIE Mandates",
    status: "Active",
    manpower: 6,
    expected: 2.4,
    actual: 2.5,
  },
  {
    client: "Waaree Energies",
    type: "AM Engineering",
    status: "Completed",
    manpower: 5,
    expected: 1.8,
    actual: 1.9,
  },
  {
    client: "First Solar",
    type: "Design Engineering",
    status: "Active",
    manpower: 7,
    expected: 2.8,
    actual: 2.6,
  },
  {
    client: "Canadian Solar",
    type: "Tech DD",
    status: "Active",
    manpower: 6,
    expected: 2.2,
    actual: 2.4,
  },
];

export const EngineeringSection = () => {
  const { currencyUnit } = useCurrency();

  return (
    <ExpandableSection
      title="Engineering Advisory"
      icon={<Ruler className="h-5 w-5" />}
      defaultExpanded={true}
      metrics={[
        { label: "Total Mandates", value: "22" },
        { label: "Completed", value: "8" },
        { label: "Running", value: "14" },
        { label: "Revenue", value: formatCurrency(12.4, currencyUnit) },
        { label: "Manpower", value: "38" },
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

        {/* Mandate Performance Table */}
        <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="font-semibold text-[#001F3F]">Client Name</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Mandate Type</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Status</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">Manpower</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Expected Revenue</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Actual Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engineeringData.map((item, index) => (
                <TableRow key={index} className="hover:bg-[#F0FDF4]">
                  <TableCell className="font-medium text-[#001F3F]">{item.client}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-[#E0E7FF] text-[#6366F1] border-[#6366F1]">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        item.status === "Active"
                          ? "bg-[#DCFCE7] text-[rgb(0,168,107)] border-[rgb(0,168,107)]"
                          : "bg-[#F3F4F6] text-[#6B7280] border-[#9CA3AF]"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#444444]">{item.manpower}</TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(item.expected, currencyUnit)}
                  </TableCell>
                  <TableCell className="text-right text-[#001F3F] font-semibold">
                    {formatCurrency(item.actual, currencyUnit)}
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
