"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// El canvas de Three.js solo debe existir en cliente.
const Starfield = dynamic(() => import("./Starfield"), { ssr: false });

interface HeroProps {
  onEnter: () => void;
  entered: boolean;
}

export default function Hero({ onEnter, entered }: HeroProps) {
  return (
    <motion.section
      initial={false}
      animate={entered ? { opacity: 0, scale: 1.04, pointerEvents: "none" } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-void overflow-hidden"
    >
      <Starfield />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="text-[10px] tracking-ultra uppercase text-prism-turquoise mb-6">
          Maison Conceptual // Vol. 01
        </span>
        <h1 className="font-heading text-gradient-silver text-[13vw] md:text-[7vw] leading-[0.9] font-extrabold uppercase">
          Nacidos
          <br />
          en el Ruido
        </h1>
        <p className="mt-8 max-w-md text-sm text-silver-brushed">
          Una señal rota en el vacío del cosmos. ARIDA ERIUS suspende cada
          prenda como un artefacto en gravedad cero.
        </p>
        <button
          onClick={onEnter}
          className="mt-10 px-10 py-3 rounded-full border border-white/25 text-[10px] tracking-ultra uppercase text-white hover:bg-white hover:text-void transition-all duration-300"
        >
          Entrar
        </button>
      </div>
    </motion.section>
  );
}
