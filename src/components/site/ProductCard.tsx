"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Product, Currency } from "@/lib/types";
import { formatPrice } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  offset: { x: number; y: number; rotate: number };
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  currency,
  offset,
  onSelect,
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  const isSoldOut = product.status === "soldout";
  const isUpcoming = product.status === "upcoming";

  return (
    <motion.div
      style={{ x: offset.x }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: offset.rotate }}
      className="relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => !isSoldOut && onSelect(product)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", rotate: offset.rotate }}
        className={`group relative w-[220px] md:w-[260px] aspect-[3/4] cursor-pointer select-none ${
          isSoldOut ? "opacity-40 grayscale cursor-not-allowed" : ""
        }`}
      >
        <div
          className="absolute inset-0 rounded-lg transition-shadow duration-500"
          style={{
            boxShadow: hovered
              ? "0 40px 80px -20px rgba(69,190,223,0.25), 0 0 60px rgba(212,212,220,0.08)"
              : "0 20px 40px -20px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="260px"
          />
        </div>

        {isUpcoming && (
          <span className="absolute top-2 left-2 text-[8px] tracking-ultra uppercase bg-prism-purple/20 text-prism-purple border border-prism-purple/40 rounded-full px-2 py-1">
            Próximo Drop
          </span>
        )}
        {isSoldOut && (
          <span className="absolute top-2 left-2 text-[8px] tracking-ultra uppercase bg-white/10 text-silver-muted border border-white/20 rounded-full px-2 py-1">
            Agotado
          </span>
        )}

        <div
          className={`absolute -bottom-14 left-0 right-0 text-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-70"
          }`}
        >
          <p className="text-[9px] tracking-ultra uppercase text-prism-turquoise">
            {product.tag}
          </p>
          <p className="font-heading text-sm mt-1 text-white">{product.name}</p>
          <p className="text-xs text-silver-brushed mt-0.5">
            {formatPrice(product.priceBaseEUR, currency)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
