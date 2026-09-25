"use client";

import { useEffect, useState } from "react";
import { Product, ProductCategory, ProductStatus } from "@/lib/types";
import { newProductId } from "@/lib/store";

interface ProductFormProps {
  editing: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const EMPTY: Omit<Product, "id" | "updatedAt"> = {
  name: "",
  category: "streetwear",
  tag: "",
  description: "",
  priceBaseEUR: 0,
  image: "",
  hasSizes: true,
  sizes: ["S", "M", "L", "XL"],
  stock: 0,
  status: "visible",
};

export default function ProductForm({ editing, onSave, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, "id" | "updatedAt">>(EMPTY);

  useEffect(() => {
    if (editing) {
      const { id, updatedAt, ...rest } = editing;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
  }, [editing]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      id: editing?.id ?? newProductId(),
      updatedAt: Date.now(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-void-card border border-white/10 rounded-lg p-6 space-y-4"
    >
      <h3 className="text-[10px] tracking-ultra uppercase text-prism-turquoise mb-2">
        {editing ? "Editar Archivo" : "Nuevo Archivo // Prenda"}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nombre / Código de archivo">
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Categoría">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value as ProductCategory)}
            className="input"
          >
            <option value="outerwear">Outerwear</option>
            <option value="streetwear">Streetwear</option>
            <option value="hardware">Hardware</option>
          </select>
        </Field>
      </div>

      <Field label="Etiqueta técnica (ej. STREETWEAR // 650 GSM)">
        <input
          value={form.tag}
          onChange={(e) => update("tag", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Descripción técnica y narrativa">
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="input resize-none"
        />
      </Field>

      <Field label="Ruta o URL de la imagen (PNG flotante / transparente)">
        <input
          required
          placeholder="/assets/nueva_prenda.png"
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Precio base (EUR)">
          <input
            required
            type="number"
            min={0}
            value={form.priceBaseEUR}
            onChange={(e) => update("priceBaseEUR", Number(e.target.value))}
            className="input"
          />
        </Field>

        <Field label="Stock">
          <input
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) => update("stock", Number(e.target.value))}
            className="input"
          />
        </Field>

        <Field label="Estado de lanzamiento">
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as ProductStatus)}
            className="input"
          >
            <option value="visible">Visible</option>
            <option value="upcoming">Próximo Drop</option>
            <option value="soldout">Agotado</option>
          </select>
        </Field>
      </div>

      <label className="flex items-center gap-2 text-xs text-silver-brushed">
        <input
          type="checkbox"
          checked={form.hasSizes}
          onChange={(e) => update("hasSizes", e.target.checked)}
        />
        Esta prenda maneja tallas (S/M/L/XL)
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-white text-void text-[10px] tracking-ultra uppercase hover:bg-prism-turquoise transition-colors"
        >
          {editing ? "Guardar Cambios" : "Publicar Prenda"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-full border border-white/20 text-[10px] tracking-ultra uppercase text-silver-brushed hover:text-white transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 0.6rem 0.8rem;
          font-size: 0.8rem;
          color: white;
        }
        .input:focus {
          outline: none;
          border-color: #45bedf;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[9px] tracking-ultra uppercase text-silver-muted mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
