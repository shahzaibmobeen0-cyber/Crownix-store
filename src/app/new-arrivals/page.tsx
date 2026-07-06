import type { Metadata } from "next";
import { getNewArrivals } from "@/data/products";
import ProductGrid from "@/components/product-grid";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest pieces from Crownix Store — freshly landed.",
};

export default function NewArrivalsPage() {
  const items = getNewArrivals(24);
  return (
    <div className="container-lux py-32">
      <div className="mb-12 max-w-lg">
        <p className="eyebrow mb-3">Just Landed</p>
        <h1 className="font-display text-5xl text-ivory">New Arrivals</h1>
      </div>
      <ProductGrid products={items} />
    </div>
  );
}
