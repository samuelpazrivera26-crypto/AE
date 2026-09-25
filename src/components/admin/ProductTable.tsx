"use client";

import Image from "next/image";
import { Product, ProductStatus } from "@/lib/types";
import { formatPrice } from "@/lib/currency";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onStatusChange: (product: Product, status: ProductStatus) => void;
}

const STATUS_LABEL: Record<ProductStatus, string> = {
  visible: "Visible",
  upcoming: "Próximo Drop",
  soldout: "Agotado",
};

const STATUS_COLOR: Record<ProductStatus, string> = {
  visible: "text-prism-cyan border-prism-cyan/40 bg-prism-cyan/10",
  upcoming: "text-prism-purple border-prism-purple/40 bg-prism-purple/10",
  soldout: "text-silver-muted border-white/20 bg-white/5",
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onStatusChange,
}: ProductTableProps) {
  return (
    <div className="bg-void-card border border-white/10 rounded-lg overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[9px] tracking-ultra uppercase text-silver-muted">
            <th className="p-4">Prenda</th>
            <th className="p-4">Categoría</th>
            <th className="p-4">Precio</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="p-4 flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white">{product.name}</p>
                  <p className="text-[10px] text-silver-muted">{product.id}</p>
                </div>
              </td>
              <td className="p-4 text-silver-brushed capitalize">{product.category}</td>
              <td className="p-4 text-silver-brushed">{formatPrice(product.priceBaseEUR, "EUR")}</td>
              <td className="p-4 text-silver-brushed">{product.stock}</td>
              <td className="p-4">
                <select
                  value={product.status}
                  onChange={(e) =>
                    onStatusChange(product, e.target.value as ProductStatus)
                  }
                  className={`text-[9px] tracking-ultra uppercase border rounded-full px-2.5 py-1 bg-transparent ${STATUS_COLOR[product.status]}`}
                >
                  {Object.entries(STATUS_LABEL).map(([value, label]) => (
                    <option key={value} value={value} className="bg-void text-white">
                      {label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-[10px] tracking-ultra uppercase text-silver-brushed hover:text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-[10px] tracking-ultra uppercase text-red-400/70 hover:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="p-8 text-center text-silver-muted text-sm">
                No hay prendas cargadas. Publica la primera desde el formulario.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
