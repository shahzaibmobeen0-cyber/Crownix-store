import { getBestSellers } from "@/data/products";
import ProductCard from "@/components/product-card";

export default function BestSellersSection() {
  const items = getBestSellers(4);
  return (
    <section className="container-lux py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow mb-3">Most Worn</p>
        <h2 className="font-display text-4xl text-ivory sm:text-5xl">Best Sellers</h2>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
