import { createContext, useContext, useState, ReactNode } from "react";

type CurrencyUnit = "cr" | "lakhs";

interface CurrencyContextType {
  currencyUnit: CurrencyUnit;
  setCurrencyUnit: (unit: CurrencyUnit) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currencyUnit, setCurrencyUnit] = useState<CurrencyUnit>("cr");

  return (
    <CurrencyContext.Provider value={{ currencyUnit, setCurrencyUnit }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
