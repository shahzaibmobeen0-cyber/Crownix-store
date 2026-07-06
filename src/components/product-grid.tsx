"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/product-card";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [movement, setMovement] = useState<"all" | "Automatic" | "Quartz">("all");

  const filtered = useMemo(() => {
    let list = products;
    if (movement !== "all") list = list.filter((p) => p.movement === movement);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [products, sort, movement]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex gap-2">
          {(["all", "Automatic", "Quartz"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMovement(m)}
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                movement === m
                  ? "border-champagne bg-champagne text-onyx"
                  : "border-white/15 text-ivory/70 hover:border-champagne/50"
              }`}
            >
              {m === "all" ? "All Movements" : m}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border border-white/15 bg-onyx px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-ivory focus:border-champagne focus:outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ivory/50">No pieces match these filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
