type CurrencyUnit = "cr" | "lakhs";

export const formatCurrency = (valueInCr: number, unit: CurrencyUnit): string => {
  if (unit === "lakhs") {
    const valueInLakhs = valueInCr * 100;
    return `₹${valueInLakhs}L`;
  }
  return `₹${valueInCr}Cr`;
};

export const formatCurrencyLabel = (unit: CurrencyUnit): string => {
  return unit === "lakhs" ? "(₹L)" : "(₹Cr)";
};
