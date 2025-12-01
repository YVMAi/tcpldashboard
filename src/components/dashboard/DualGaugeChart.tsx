interface DualGaugeChartProps {
  revenueValue: number;
  revenueLabel: string;
  receivableValue: number;
  receivableLabel: string;
  revenueMax?: number;
  receivableMax?: number;
  size?: number;
}

export const DualGaugeChart = ({ 
  revenueValue,
  revenueLabel,
  receivableValue,
  receivableLabel,
  revenueMax = 100,
  receivableMax = 20,
  size = 120
}: DualGaugeChartProps) => {
  const revenuePercentage = Math.min((revenueValue / revenueMax) * 100, 100);
  const receivablePercentage = Math.min((receivableValue / receivableMax) * 100, 100);
  
  const outerRadius = (size - 20) / 2;
  const innerRadius = outerRadius - 12;
  const circumference = Math.PI * outerRadius;
  const innerCircumference = Math.PI * innerRadius;
  
  const revenueOffset = circumference - (revenuePercentage / 100) * circumference;
  const receivableOffset = innerCircumference - (receivablePercentage / 100) * innerCircumference;
  
  const getColor = (percentage: number) => {
    if (percentage < 50) return "#E63946";
    if (percentage < 75) return "#FFB547";
    return "rgb(0,168,107)";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size / 2 + 15 }}>
        <svg
          width={size}
          height={size / 2 + 15}
          viewBox={`0 0 ${size} ${size / 2 + 15}`}
          className="transform"
        >
          {/* Outer arc background (Revenue) */}
          <path
            d={`M ${size / 2 - outerRadius} ${size / 2} A ${outerRadius} ${outerRadius} 0 0 1 ${size / 2 + outerRadius} ${size / 2}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Outer arc progress (Revenue) */}
          <path
            d={`M ${size / 2 - outerRadius} ${size / 2} A ${outerRadius} ${outerRadius} 0 0 1 ${size / 2 + outerRadius} ${size / 2}`}
            fill="none"
            stroke={getColor(revenuePercentage)}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={revenueOffset}
            className="transition-all duration-700"
          />
          
          {/* Inner arc background (Receivables) */}
          <path
            d={`M ${size / 2 - innerRadius} ${size / 2} A ${innerRadius} ${innerRadius} 0 0 1 ${size / 2 + innerRadius} ${size / 2}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Inner arc progress (Receivables) */}
          <path
            d={`M ${size / 2 - innerRadius} ${size / 2} A ${innerRadius} ${innerRadius} 0 0 1 ${size / 2 + innerRadius} ${size / 2}`}
            fill="none"
            stroke={getColor(receivablePercentage)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={innerCircumference}
            strokeDashoffset={receivableOffset}
            className="transition-all duration-700 delay-100"
          />
        </svg>
        
        {/* Center values */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-[#001F3F] leading-tight">
              {revenueLabel}
            </div>
            <div className="text-[10px] text-[#444444]">
              Revenue YTD
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 text-[9px]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getColor(revenuePercentage) }}></div>
          <span className="text-[#444444]">Revenue YTD</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getColor(receivablePercentage) }}></div>
          <span className="text-[#444444]">Receivables: {receivableLabel}</span>
        </div>
      </div>
    </div>
  );
};
