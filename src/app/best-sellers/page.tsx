import type { Metadata } from "next";
import { getBestSellers } from "@/data/products";
import ProductGrid from "@/components/product-grid";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "The most worn pieces from Crownix Store.",
};

export default function BestSellersPage() {
  const items = getBestSellers(24);
  return (
    <div className="container-lux py-32">
      <div className="mb-12 max-w-lg">
        <p className="eyebrow mb-3">Most Worn</p>
        <h1 className="font-display text-5xl text-ivory">Best Sellers</h1>
      </div>
      <ProductGrid products={items} />
    </div>
  );
}
