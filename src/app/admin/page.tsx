"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/lib/useProducts";
import { saveProduct, deleteProduct, resetToSeed } from "@/lib/store";
import { Product, ProductStatus } from "@/lib/types";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";

export default function AdminPage() {
  const { products, hydrated } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);

  function handleStatusChange(product: Product, status: ProductStatus) {
    saveProduct({ ...product, status });
  }

  function handleDelete(id: string) {
    if (confirm("¿Eliminar esta prenda del catálogo? Esta acción no se puede deshacer.")) {
      deleteProduct(id);
    }
  }

  return (
    <main className="min-h-screen bg-void text-white px-6 md:px-12 py-10">
      <header className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
        <div>
          <span className="text-[9px] tracking-ultra uppercase text-prism-turquoise">
            Módulo de Control // Nave Nodriza
          </span>
          <h1 className="font-heading text-2xl mt-1 uppercase text-gradient-silver">
            ARIDA ERIUS — Backoffice
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-[10px] tracking-ultra uppercase text-silver-brushed hover:text-white border border-white/15 rounded-full px-4 py-2"
          >
            Ver Tienda ↗
          </Link>
          <button
            onClick={() => {
              if (confirm("Esto restaurará el catálogo de fábrica. ¿Continuar?")) resetToSeed();
            }}
            className="text-[10px] tracking-ultra uppercase text-silver-muted hover:text-white"
          >
            Restaurar Seed
          </button>
        </div>
      </header>

      {!hydrated ? (
        <p className="text-silver-muted text-sm">Cargando inventario...</p>
      ) : (
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          <ProductForm
            editing={editing}
            onSave={(product) => {
              saveProduct(product);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] tracking-ultra uppercase text-silver-brushed">
                Inventario ({products.length})
              </h2>
              <p className="text-[10px] text-silver-muted">
                Los cambios se sincronizan en tiempo real con la vitrina pública.
              </p>
            </div>
            <ProductTable
              products={products}
              onEdit={setEditing}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
