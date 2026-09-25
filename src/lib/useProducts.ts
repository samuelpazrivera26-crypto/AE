"use client";

import { useEffect, useState } from "react";
import { Product } from "./types";
import { getProducts, subscribe } from "./store";

/**
 * Hook compartido por la tienda y el admin: lee el catálogo y se re-renderiza
 * automáticamente en cuanto el admin guarda un cambio (misma pestaña, otra
 * pestaña, u otra ventana).
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setHydrated(true);
    return subscribe(setProducts);
  }, []);

  return { products, hydrated };
}
