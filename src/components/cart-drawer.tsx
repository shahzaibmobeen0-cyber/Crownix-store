"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/context/cart-store";
import { getProductById, formatPKR } from "@/lib/utils";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="glass fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-onyx-800"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="font-display text-xl text-ivory">Your Bag ({items.length})</h2>
              <button aria-label="Close cart" onClick={onClose}>
                <X size={22} className="text-ivory" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-ivory/50">
                  Your bag is empty. Every great collection starts with one piece.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <li key={item.productId} className="flex gap-4">
                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-onyx-700">
                          <Image
                            src={product.images[0]!}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-base text-ivory">{product.name}</p>
                          <p className="font-mono text-xs text-champagne">{formatPKR(product.price)}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="border border-white/15 p-1 hover:border-champagne"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-sm">{item.quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="border border-white/15 p-1 hover:border-champagne"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeItem(item.productId)}
                              className="ml-auto text-ivory/40 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-ivory/70">Subtotal</span>
                  <span className="font-mono text-lg text-champagne">{formatPKR(subtotal)}</span>
                </div>
                <Link href="/cart" onClick={onClose} className="btn-outline mb-3 w-full">
                  View Bag
                </Link>
                <Link href="/checkout" onClick={onClose} className="btn-gold w-full">
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
