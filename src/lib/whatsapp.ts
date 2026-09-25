import { CartLine, Currency, Product } from "./types";
import { formatPrice } from "./currency";

const CONCIERGE_NUMBER = "00000000000"; // TODO: reemplazar por el número real del Concierge

export function buildWhatsAppCheckoutUrl(
  lines: CartLine[],
  products: Product[],
  currency: Currency
): string {
  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      const sizeLabel = line.size ? ` (Talla ${line.size})` : "";
      const price = formatPrice(product.priceBaseEUR * line.quantity, currency);
      return `• ${product.name}${sizeLabel} x${line.quantity} — ${price}`;
    })
    .filter(Boolean)
    .join("\n");

  const total = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId);
    return sum + (product ? product.priceBaseEUR * line.quantity : 0);
  }, 0);

  const message = [
    "ARIDA ERIUS — Solicitud de compra",
    "",
    items,
    "",
    `Total (${currency}): ${formatPrice(total, currency)}`,
  ].join("\n");

  return `https://wa.me/${CONCIERGE_NUMBER}?text=${encodeURIComponent(message)}`;
}
