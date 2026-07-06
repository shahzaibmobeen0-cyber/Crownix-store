"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingBag, MessageCircle, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatPKR, whatsappOrderLink } from "@/lib/utils";
import { useCartStore } from "@/context/cart-store";
import { useWishlistStore } from "@/context/wishlist-store";

export default function BuyBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  return (
    <div>
      <p className="eyebrow mb-2">{product.brandLine}</p>
      <h1 className="font-display text-4xl text-ivory">{product.name}</h1>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.round(product.rating) ? "#C6A664" : "none"}
              className={i < Math.round(product.rating) ? "text-champagne" : "text-ivory/20"}
            />
          ))}
        </div>
        <span className="text-sm text-ivory/60">
          {product.rating.toFixed(1)} · {product.reviewCount} reviews
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <p className="font-mono text-2xl text-champagne">{formatPKR(product.price)}</p>
        {product.compareAtPrice && (
          <p className="font-mono text-base text-ivory/40 line-through">
            {formatPKR(product.compareAtPrice)}
          </p>
        )}
      </div>

      <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/65">{product.description}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm">
        <div>
          <dt className="text-ivory/40">Movement</dt>
          <dd className="text-ivory">{product.movement}</dd>
        </div>
        <div>
          <dt className="text-ivory/40">Case</dt>
          <dd className="text-ivory">{product.caseMaterial}</dd>
        </div>
        <div>
          <dt className="text-ivory/40">Diameter</dt>
          <dd className="text-ivory">{product.caseDiameter}</dd>
        </div>
        <div>
          <dt className="text-ivory/40">Water Resistance</dt>
          <dd className="text-ivory">{product.waterResistance}</dd>
        </div>
        <div>
          <dt className="text-ivory/40">Strap</dt>
          <dd className="text-ivory">{product.strapMaterial}</dd>
        </div>
        <div>
          <dt className="text-ivory/40">SKU</dt>
          <dd className="text-ivory">{product.sku}</dd>
        </div>
      </dl>

      <p className={`mt-6 font-mono text-xs uppercase tracking-widest2 ${product.inStock ? "text-champagne" : "text-ivory/40"}`}>
        {product.inStock ? `In Stock — ${product.stockCount} left` : "Currently Sold Out"}
      </p>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center border border-white/15">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="p-3 hover:text-champagne"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(product.stockCount || 1, q + 1))}
            className="p-3 hover:text-champagne"
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="border border-white/15 p-3.5 hover:border-champagne"
        >
          <Heart size={16} fill={wishlisted ? "#C6A664" : "none"} className={wishlisted ? "text-champagne" : "text-ivory/70"} />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          disabled={!product.inStock}
          onClick={() => {
            addItem(product.id, qty);
            toast.success(`${product.name} added to bag`);
          }}
          className="btn-outline flex-1 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ShoppingBag size={15} /> Add to Bag
        </button>
        <button
          disabled={!product.inStock}
          onClick={() => {
            addItem(product.id, qty);
            router.push("/checkout");
          }}
          className="btn-gold flex-1 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Buy Now
        </button>
      </div>

      <a
        href={whatsappOrderLink(product.name, product.price)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 border border-green-600/40 py-4 font-mono text-[11px] uppercase tracking-widest2 text-green-400 transition-colors hover:bg-green-600/10"
      >
        <MessageCircle size={15} /> Order via WhatsApp
      </a>
    </div>
  );
}
