"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Trash2, Pencil, Plus, Upload } from "lucide-react";
import { products as seedProducts } from "@/data/products";
import { formatPKR } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Demo CRUD surface. All state here is client-side and resets on reload.
 * To make this persistent: replace the local setState calls with calls to
 * server actions / API routes (e.g. /api/admin/products) that use
 * `supabaseAdmin` from src/lib/supabase-admin.ts to write to the `products`
 * table, then revalidate this route. See README "Wiring up the Admin CRUD".
 */
export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product removed (demo — not persisted).");
  }

  function handleImageUpload(id: string, file: File) {
    const url = URL.createObjectURL(file);
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, images: [url, ...p.images.slice(1)] } : p))
    );
    toast.success("Image preview updated (demo — connect Supabase Storage to persist).");
  }

  function handleFieldChange(id: string, field: keyof Product, value: string | number | boolean) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function handleAddProduct() {
    const id = `new-${Date.now()}`;
    setItems((prev) => [
      {
        id,
        slug: `new-product-${prev.length + 1}`,
        name: "New Product",
        brandLine: "Crownix",
        price: 0,
        collection: "classic",
        movement: "Quartz",
        caseMaterial: "",
        caseDiameter: "",
        strapMaterial: "",
        waterResistance: "",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0854e0f68a?q=80&w=800&auto=format&fit=crop"],
        description: "",
        features: [],
        rating: 0,
        reviewCount: 0,
        reviews: [],
        inStock: true,
        stockCount: 0,
        isNewArrival: true,
        isBestSeller: false,
        sku: "CRX-NEW",
      },
      ...prev,
    ]);
    setEditingId(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-ivory">Products</h1>
          <p className="mt-1 text-sm text-ivory/50">{items.length} products in catalog</p>
        </div>
        <button onClick={handleAddProduct} className="btn-gold">
          <Plus size={15} /> Add Product
        </button>
      </div>

      <div className="mt-8 overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-onyx-800 text-xs uppercase tracking-widest2 text-ivory/50">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Collection</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items.map((p) => (
              <tr key={p.id}>
                <td className="p-4">
                  <div className="relative h-12 w-12 overflow-hidden bg-onyx-700">
                    <Image src={p.images[0]!} alt={p.name} fill className="object-cover" sizes="48px" />
                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-onyx/0 opacity-0 hover:bg-onyx/60 hover:opacity-100">
                      <Upload size={14} className="text-champagne" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(p.id, e.target.files[0])}
                      />
                    </label>
                  </div>
                </td>
                <td className="p-4">
                  {editingId === p.id ? (
                    <input
                      value={p.name}
                      onChange={(e) => handleFieldChange(p.id, "name", e.target.value)}
                      className="border border-white/15 bg-transparent px-2 py-1 text-sm focus:border-champagne focus:outline-none"
                    />
                  ) : (
                    <span className="text-ivory">{p.name}</span>
                  )}
                </td>
                <td className="p-4 text-ivory/70">{p.collection}</td>
                <td className="p-4">
                  {editingId === p.id ? (
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => handleFieldChange(p.id, "price", Number(e.target.value))}
                      className="w-24 border border-white/15 bg-transparent px-2 py-1 text-sm focus:border-champagne focus:outline-none"
                    />
                  ) : (
                    <span className="font-mono text-champagne">{formatPKR(p.price)}</span>
                  )}
                </td>
                <td className="p-4">
                  {editingId === p.id ? (
                    <input
                      type="number"
                      value={p.stockCount}
                      onChange={(e) => handleFieldChange(p.id, "stockCount", Number(e.target.value))}
                      className="w-20 border border-white/15 bg-transparent px-2 py-1 text-sm focus:border-champagne focus:outline-none"
                    />
                  ) : (
                    <span className={p.stockCount <= 10 ? "text-red-400" : "text-ivory/70"}>{p.stockCount}</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingId(editingId === p.id ? null : p.id)}
                      className="text-ivory/60 hover:text-champagne"
                      aria-label="Edit product"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-ivory/60 hover:text-red-400"
                      aria-label="Delete product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
