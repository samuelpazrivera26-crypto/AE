import { Currency } from "./types";

export const exchangeRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  COP: 4450,
};

export const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  COP: "$",
};

export function formatPrice(eurAmount: number, currency: Currency): string {
  const amount = eurAmount * exchangeRates[currency];
  const symbol = currencySymbols[currency];
  const rounded =
    currency === "COP" ? Math.round(amount).toLocaleString("es-CO") : amount.toFixed(0);
  return `${symbol}${rounded}`;
}
