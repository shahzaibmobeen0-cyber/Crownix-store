import { Product } from "@/types";
import ProductCard from "@/components/product-card";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="border-t border-white/10 py-16">
      <h2 className="mb-8 font-display text-3xl text-ivory">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
