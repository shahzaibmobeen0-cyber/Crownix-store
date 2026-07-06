"use client";

import Link from "next/link";
import { useWishlistStore } from "@/context/wishlist-store";
import { getProductById } from "@/lib/utils";
import ProductCard from "@/components/product-card";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.productIds);
  const items = ids.map(getProductById).filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  return (
    <div className="container-lux py-32">
      <h1 className="mb-10 font-display text-5xl text-ivory">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-ivory/50">Nothing saved yet — tap the heart on any piece to add it here.</p>
          <Link href="/collections" className="btn-gold mt-6 inline-flex">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
