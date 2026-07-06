"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/context/cart-store";
import { getProductById, formatPKR } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div className="container-lux py-32">
      <h1 className="mb-10 font-display text-5xl text-ivory">Your Bag</h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-ivory/50">Your bag is empty.</p>
          <Link href="/collections" className="btn-gold mt-6 inline-flex">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex gap-6 py-6">
                  <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden bg-onyx-800">
                    <Image src={product.images[0]!} alt={product.name} fill className="object-cover" sizes="112px" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest2 text-champagne/80">
                          {product.brandLine}
                        </p>
                        <Link href={`/product/${product.slug}`} className="font-display text-xl text-ivory hover:text-champagne">
                          {product.name}
                        </Link>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.productId)}
                        className="text-ivory/40 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="mt-2 font-mono text-champagne">{formatPKR(product.price)}</p>
                    <div className="mt-4 flex items-center border border-white/15 w-fit">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2.5 hover:text-champagne">
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2.5 hover:text-champagne">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="glass h-fit p-7">
            <h2 className="mb-5 font-display text-xl text-ivory">Order Summary</h2>
            <div className="flex justify-between text-sm text-ivory/70">
              <span>Subtotal</span>
              <span className="font-mono">{formatPKR(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-ivory/70">
              <span>Shipping</span>
              <span className="font-mono text-champagne">Free</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-4 font-display text-lg text-ivory">
              <span>Total</span>
              <span className="text-champagne">{formatPKR(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn-gold mt-6 w-full">
              Checkout <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
