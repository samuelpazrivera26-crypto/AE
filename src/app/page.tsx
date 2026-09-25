"use client";

import { useState } from "react";
import Hero from "@/components/site/Hero";
import Header from "@/components/site/Header";
import ProductGallery from "@/components/site/ProductGallery";
import ProductViewer from "@/components/site/ProductViewer";
import CartDrawer from "@/components/site/CartDrawer";
import { useProducts } from "@/lib/useProducts";
import { CartLine, Currency, Product } from "@/lib/types";

export default function HomePage() {
  const { products, hydrated } = useProducts();

  const [entered, setEntered] = useState(false);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);

  function handleAddToCart(product: Product, size: string | null) {
    setCart((prev) => [...prev, { productId: product.id, size, quantity: 1 }]);
    setSelected(null);
    setCartOpen(true);
  }

  function handleRemoveLine(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="relative min-h-screen bg-void">
      <Hero onEnter={() => setEntered(true)} entered={entered} />

      {entered && (
        <>
          <Header
            currency={currency}
            onCurrencyChange={setCurrency}
            cartCount={cart.length}
            onOpenCart={() => setCartOpen(true)}
          />
          <div className="pt-20">
            <ProductGallery
              products={hydrated ? products : []}
              currency={currency}
              onSelect={setSelected}
            />
          </div>
        </>
      )}

      <ProductViewer
        product={selected}
        currency={currency}
        onClose={() => setSelected(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        open={cartOpen}
        lines={cart}
        products={products}
        currency={currency}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveLine}
      />
    </main>
  );
}
