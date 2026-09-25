"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CartLine, Currency, Product } from "@/lib/types";
import { formatPrice } from "@/lib/currency";
import { buildWhatsAppCheckoutUrl } from "@/lib/whatsapp";

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  products: Product[];
  currency: Currency;
  onClose: () => void;
  onRemove: (index: number) => void;
}

export default function CartDrawer({
  open,
  lines,
  products,
  currency,
  onClose,
  onRemove,
}: CartDrawerProps) {
  const total = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId);
    return sum + (product ? product.priceBaseEUR * line.quantity : 0);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-void-elevated border-l border-white/10 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] tracking-ultra uppercase text-silver-brushed">
                Tu Bolso
              </h3>
              <button onClick={onClose} className="text-silver-muted hover:text-white text-xs">
                Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-5">
              {lines.length === 0 && (
                <p className="text-silver-muted text-sm">Tu bolso está vacío.</p>
              )}
              {lines.map((line, i) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <p className="text-sm text-white">{product.name}</p>
                      <p className="text-xs text-silver-muted">
                        {line.size ? `Talla ${line.size} · ` : ""}x{line.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-silver-brushed">
                        {formatPrice(product.priceBaseEUR * line.quantity, currency)}
                      </span>
                      <button
                        onClick={() => onRemove(i)}
                        className="text-silver-muted hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {lines.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between mb-4">
                  <span className="text-xs tracking-ultra uppercase text-silver-brushed">
                    Total
                  </span>
                  <span className="text-white font-heading">
                    {formatPrice(total, currency)}
                  </span>
                </div>
                <a
                  href={buildWhatsAppCheckoutUrl(lines, products, currency)}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-3 rounded-full bg-white text-void text-[10px] tracking-ultra uppercase hover:bg-prism-turquoise transition-colors"
                >
                  Finalizar por WhatsApp Concierge
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
