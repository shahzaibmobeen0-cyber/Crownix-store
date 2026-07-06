"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatPKR } from "@/lib/utils";
import { useCartStore } from "@/context/cart-store";
import { useWishlistStore } from "@/context/wishlist-store";

export default function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const y = (e.clientX - rect.left - rect.width / 2) / rect.width;
    setTilt({ x: x * -8, y: y * 8 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative border border-white/10 bg-onyx-800/60 p-4 transition-colors hover:border-champagne/40"
    >
      {!product.inStock && (
        <span className="absolute left-4 top-4 z-10 bg-onyx px-2 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ivory/60">
          Sold Out
        </span>
      )}
      {product.isNewArrival && product.inStock && (
        <span className="absolute left-4 top-4 z-10 bg-champagne px-2 py-1 font-mono text-[10px] uppercase tracking-widest2 text-onyx">
          New
        </span>
      )}

      <button
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => {
          toggleWishlist(product.id);
          toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
        }}
        className="absolute right-4 top-4 z-10 rounded-full bg-onyx/70 p-2 text-ivory/70 transition-colors hover:text-champagne"
      >
        <Heart size={16} fill={wishlisted ? "#C6A664" : "none"} className={wishlisted ? "text-champagne" : ""} />
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-onyx-700">
          <Image
            src={product.images[0]!}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <Image
            src={product.images[1] ?? product.images[0]!}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-champagne/80">
            {product.brandLine}
          </p>
          <h3 className="mt-1 font-display text-lg text-ivory">{product.name}</h3>
          <div className="mt-1 flex items-center gap-1">
            <Star size={12} fill="#C6A664" className="text-champagne" />
            <span className="text-xs text-ivory/60">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <p className="font-mono text-base text-ivory">{formatPKR(product.price)}</p>
            {product.compareAtPrice && (
              <p className="font-mono text-xs text-ivory/40 line-through">
                {formatPKR(product.compareAtPrice)}
              </p>
            )}
          </div>
        </div>
      </Link>

      <button
        disabled={!product.inStock}
        onClick={() => {
          addItem(product.id);
          toast.success(`${product.name} added to bag`);
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 border border-champagne/40 py-2.5 font-mono text-[10px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-champagne hover:text-onyx disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ShoppingBag size={13} />
        {product.inStock ? "Add to Bag" : "Notify Me"}
      </button>
    </motion.div>
  );
}
