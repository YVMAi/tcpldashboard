import { ExpandableSection } from "./ExpandableSection";
import { Cloud } from "lucide-react";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  { product: "TruGreen Core", amsGWp: 450, amsClients: "Client A, B, C", saasGWp: 520, saasClients: "Client D, E", annualExpectedBilling: 0.45, invoiceRaised: 0.43, outstanding: 0.02, dueInDays: 15 },
  { product: "Assure", amsGWp: 380, amsClients: "Client F, G", saasGWp: 420, saasClients: "Client H", annualExpectedBilling: 0.38, invoiceRaised: 0.35, outstanding: 0.03, dueInDays: -7 },
  { product: "Nexus", amsGWp: 520, amsClients: "Client I, J, K", saasGWp: 580, saasClients: "Client L, M", annualExpectedBilling: 0.52, invoiceRaised: 0.50, outstanding: 0.02, dueInDays: 20 },
  { product: "Flow", amsGWp: 280, amsClients: "Client N", saasGWp: 310, saasClients: "Client O, P", annualExpectedBilling: 0.28, invoiceRaised: 0.27, outstanding: 0.01, dueInDays: 10 },
  { product: "Flow Lite", amsGWp: 220, amsClients: "Client Q, R", saasGWp: 260, saasClients: "Client S", annualExpectedBilling: 0.22, invoiceRaised: 0.21, outstanding: 0.01, dueInDays: -3 },
  { product: "Pulse", amsGWp: 310, amsClients: "Client T", saasGWp: 340, saasClients: "Client U, V", annualExpectedBilling: 0.31, invoiceRaised: 0.30, outstanding: 0.01, dueInDays: 18 },
  { product: "Horizon", amsGWp: 190, amsClients: "Client W, X", saasGWp: 220, saasClients: "Client Y", annualExpectedBilling: 0.19, invoiceRaised: 0.18, outstanding: 0.01, dueInDays: 5 },
];

export const SaaSSection = () => {
  const { currencyUnit } = useCurrency();

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

        {/* Product-wise Revenue Table */}
        <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="font-semibold text-[#001F3F]">Product</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">AMS GWp</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">AMS Clients</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">SaaS GWp</TableHead>
                <TableHead className="font-semibold text-[#001F3F]">SaaS Clients</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Expected Revenue</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Actual Revenue</TableHead>
                <TableHead className="font-semibold text-[#001F3F] text-right">Variance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saasProducts.map((product, index) => {
                return (
                  <TableRow key={index} className="hover:bg-[#F0FDF4]">
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
                      {product.dueInDays}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </ExpandableSection>
  );
};
