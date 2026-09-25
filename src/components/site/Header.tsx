"use client";

import Image from "next/image";
import { Currency } from "@/lib/types";

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = ["COLLECTIONS", "LOOKBOOK", "ATELIER", "ARCHIVE"];

export default function Header({
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 h-20 backdrop-blur-md bg-void/60 border-b border-white/5">
      <nav className="hidden md:flex items-center gap-6 flex-1">
        {NAV_LINKS.slice(0, 2).map((link) => (
          <a
            key={link}
            href="#"
            className="text-[10px] tracking-ultra uppercase text-silver-brushed hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="flex-1 flex justify-center">
        <Image
          src="/assets/logo_emblem_white.png"
          alt="ARIDA ERIUS"
          width={40}
          height={40}
          className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_12px_rgba(212,212,220,0.35)]"
        />
      </div>

      <div className="flex-1 flex items-center justify-end gap-5">
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.slice(2).map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] tracking-ultra uppercase text-silver-brushed hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as Currency)}
          className="bg-transparent text-[10px] tracking-ultra uppercase text-silver-brushed border border-white/15 rounded-full px-3 py-1.5 focus:outline-none focus:border-prism-turquoise"
        >
          <option className="bg-void" value="EUR">EUR</option>
          <option className="bg-void" value="USD">USD</option>
          <option className="bg-void" value="COP">COP</option>
        </select>

        <button
          onClick={onOpenCart}
          className="relative text-[10px] tracking-ultra uppercase text-silver-brushed hover:text-white transition-colors"
        >
          BAG
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 w-4 h-4 flex items-center justify-center rounded-full bg-prism-turquoise text-void text-[9px] font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
