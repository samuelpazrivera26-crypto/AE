"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Product, Currency } from "@/lib/types";
import { formatPrice } from "@/lib/currency";

interface ProductViewerProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, size: string | null) => void;
}

export default function ProductViewer({
  product,
  currency,
  onClose,
  onAddToCart,
}: ProductViewerProps) {
  const [size, setSize] = useState<string | null>(null);

  return (
    <AnimatePresence onExitComplete={() => setSize(null)}>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-lg px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl grid md:grid-cols-2 gap-10 bg-void-elevated/80 border border-white/10 rounded-xl p-8 md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-silver-muted hover:text-white text-xs tracking-ultra uppercase"
            >
              Cerrar
            </button>

            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[9px] tracking-ultra uppercase text-prism-turquoise">
                {product.tag}
              </span>
              <h3 className="font-heading text-2xl md:text-3xl mt-2 text-white uppercase">
                {product.name}
              </h3>
              <p className="text-sm text-silver-brushed mt-4 leading-relaxed">
                {product.description}
              </p>
              <p className="font-heading text-xl mt-6 text-white">
                {formatPrice(product.priceBaseEUR, currency)}
              </p>

              {product.hasSizes && (
                <div className="flex gap-2 mt-6">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-10 h-10 rounded-full border text-xs transition-colors ${
                        size === s
                          ? "border-prism-turquoise text-prism-turquoise"
                          : "border-white/20 text-silver-brushed hover:border-white/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <button
                disabled={product.hasSizes && !size}
                onClick={() => onAddToCart(product, size)}
                className="mt-8 py-3 rounded-full border border-white/25 text-[10px] tracking-ultra uppercase text-white hover:bg-white hover:text-void transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {product.hasSizes && !size ? "Selecciona una talla" : "Añadir al Bolso"}
              </button>

              <p className="text-[10px] text-silver-muted mt-3">
                {product.stock > 0 ? `${product.stock} unidades disponibles` : "Sin stock"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
