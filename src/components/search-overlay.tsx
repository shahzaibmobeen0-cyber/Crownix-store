"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { formatPKR } from "@/lib/utils";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brandLine.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-onyx/97 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="container-lux flex items-center gap-4 pt-8">
            <Search className="text-champagne" size={22} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches, collections…"
              className="flex-1 border-b border-white/15 bg-transparent py-3 font-display text-2xl text-ivory placeholder:text-ivory/30 focus:border-champagne focus:outline-none"
            />
            <button aria-label="Close search" onClick={onClose}>
              <X size={26} className="text-ivory" />
            </button>
          </div>

          <div className="container-lux mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                onClick={onClose}
                className="group flex items-center gap-4 border border-white/10 p-3 transition-colors hover:border-champagne/50"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-onyx-700">
                  <Image src={p.images[0]!} alt={p.name} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="font-display text-base text-ivory">{p.name}</p>
                  <p className="font-mono text-xs text-champagne">{formatPKR(p.price)}</p>
                </div>
              </Link>
            ))}
            {query && results.length === 0 && (
              <p className="text-ivory/50">No pieces match &ldquo;{query}&rdquo;.</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
