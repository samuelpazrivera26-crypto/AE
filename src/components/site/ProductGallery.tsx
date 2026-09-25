"use client";

import { Product, Currency } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGalleryProps {
  products: Product[];
  currency: Currency;
  onSelect: (product: Product) => void;
}

// Offsets deterministas (no random en cada render) para que cada prenda
// "orbite" en una posición ligeramente distinta y rompa la cuadrícula.
const LAYOUT_OFFSETS = [
  { x: 0, y: 0, rotate: -4 },
  { x: 24, y: 40, rotate: 3 },
  { x: -18, y: -10, rotate: -2 },
  { x: 10, y: 26, rotate: 5 },
  { x: -28, y: 8, rotate: -6 },
  { x: 16, y: -18, rotate: 2 },
];

export default function ProductGallery({
  products,
  currency,
  onSelect,
}: ProductGalleryProps) {
  // Las tres condiciones (visible / próximo drop / agotado) se muestran
  // siempre; el estado se refleja visualmente en ProductCard.
  const visible = products;

  return (
    <section className="relative py-40 px-6 md:px-16">
      <div className="text-center mb-24">
        <span className="text-[10px] tracking-ultra uppercase text-prism-turquoise">
          Capítulo 01 // Archivo
        </span>
        <h2 className="font-heading text-3xl md:text-5xl mt-3 text-gradient-silver uppercase">
          Piezas en Gravedad Cero
        </h2>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-x-10 gap-y-24 max-w-6xl mx-auto">
        {visible.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            currency={currency}
            offset={LAYOUT_OFFSETS[i % LAYOUT_OFFSETS.length]}
            onSelect={onSelect}
          />
        ))}
        {visible.length === 0 && (
          <p className="text-silver-muted text-sm">
            No hay piezas activas en este momento. Vuelve pronto.
          </p>
        )}
      </div>
    </section>
  );
}
