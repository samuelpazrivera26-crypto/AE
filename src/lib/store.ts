"use client";

import { Product } from "./types";
import { seedProducts } from "./seed";

/**
 * Capa de persistencia ligera para ARIDA ERIUS.
 *
 * No hay backend real: el "panel de admin" y la "vitrina pública" son dos
 * vistas de la misma app Next.js que comparten datos a través de
 * localStorage. Esto es exactamente lo que pedía el brief ("base de datos
 * ligera tipo Supabase/LocalStorage para la sincronización entre admin y
 * tienda"), y es suficiente para un catálogo conceptual de una sola marca.
 *
 * Sincronización en tiempo real:
 * - Entre pestañas/ventanas del mismo navegador -> evento nativo `storage`.
 * - Dentro de la misma pestaña (admin y preview abiertos a la vez) ->
 *   BroadcastChannel, que el evento `storage` no cubre.
 *
 * Si en el futuro se conecta un backend real (Supabase, etc.), solo hay que
 * reemplazar las funciones de este archivo — el resto de la app consume
 * `getProducts`, `saveProduct`, `deleteProduct` y `subscribe`.
 */

const STORAGE_KEY = "arida-erius:products";
const CHANNEL_NAME = "arida-erius:sync";

type Listener = (products: Product[]) => void;

const listeners = new Set<Listener>();
let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  if (typeof window === "undefined") return null;
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME);
  return channel;
}

function readRaw(): Product[] {
  if (typeof window === "undefined") return seedProducts;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }
  try {
    return JSON.parse(raw) as Product[];
  } catch {
    return seedProducts;
  }
}

function writeRaw(products: Product[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  listeners.forEach((l) => l(products));
  getChannel()?.postMessage({ type: "sync" });
}

export function getProducts(): Product[] {
  return readRaw();
}

export function saveProduct(product: Product) {
  const products = readRaw();
  const idx = products.findIndex((p) => p.id === product.id);
  const updated = { ...product, updatedAt: Date.now() };
  if (idx >= 0) {
    products[idx] = updated;
  } else {
    products.push(updated);
  }
  writeRaw(products);
}

export function deleteProduct(id: string) {
  const products = readRaw().filter((p) => p.id !== id);
  writeRaw(products);
}

export function resetToSeed() {
  writeRaw(seedProducts);
}

/**
 * Suscribe un componente a los cambios del catálogo. Devuelve una función
 * de limpieza para usar en un `useEffect`.
 */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener(readRaw());
  };
  const onBroadcast = () => listener(readRaw());

  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
    getChannel()?.addEventListener("message", onBroadcast);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
      getChannel()?.removeEventListener("message", onBroadcast);
    }
  };
}

export function newProductId(): string {
  return `prod-${Date.now().toString(36)}`;
}
