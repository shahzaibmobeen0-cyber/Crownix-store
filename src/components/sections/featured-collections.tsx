"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";

export default function FeaturedCollections() {
  return (
    <section className="container-lux py-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-3">Curated by Movement &amp; Mood</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">
            The Collections
          </h2>
        </div>
        <Link
          href="/collections"
          className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest2 text-champagne md:flex"
        >
          View all <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
          >
            <Link
              href={`/collections/${c.slug}`}
              className="group relative block h-80 overflow-hidden border border-white/10"
            >
              <Image
                src={c.heroImage}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-ivory">{c.name}</h3>
                <p className="mt-1 line-clamp-2 max-w-xs text-sm text-ivory/60">
                  {c.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest2 text-champagne opacity-0 transition-opacity group-hover:opacity-100">
                  Discover <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
