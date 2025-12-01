import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  valueLabel: string;
  size?: number;
}

export const GaugeChart = ({ 
  value, 
  max, 
  label, 
  valueLabel,
  size = 80 
}: GaugeChartProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - 10) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on percentage
  const getColor = () => {
    if (percentage < 50) return "#E63946";
    if (percentage < 75) return "#FFB547";
    return "rgb(0,168,107)";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size / 2 + 10 }}>
        <svg
          width={size}
          height={size / 2 + 10}
          viewBox={`0 0 ${size} ${size / 2 + 10}`}
          className="transform"
        >
          {/* Background arc */}
          <path
            d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Center value */}
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-sm font-bold text-[#001F3F]">
            {valueLabel}
          </span>
        </div>
      </div>
      
      {/* Label */}
      <span className="text-[10px] text-[#444444] text-center">
        {label}
      </span>
    </div>
  );
};
