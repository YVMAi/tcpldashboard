type CurrencyUnit = "cr" | "lakhs";

export const formatCurrency = (valueInCr: number, unit: CurrencyUnit): string => {
  if (unit === "lakhs") {
    const valueInLakhs = valueInCr * 100;
    return `₹${valueInLakhs.toFixed(2)}L`;
  }
  return `₹${valueInCr.toFixed(2)}Cr`;
};

export const formatCurrencyLabel = (unit: CurrencyUnit): string => {
  return unit === "lakhs" ? "(₹L)" : "(₹Cr)";
};
