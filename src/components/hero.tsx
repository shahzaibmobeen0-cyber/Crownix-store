"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Watch3D from "@/components/watch-3d-canvas";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-onyx-radial pt-24">
      {/* Floating particles — ambient, not decorative noise */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-champagne/40 animate-float"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="container-lux grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <p className="eyebrow mb-6">Est. Crownix Store — Original Design</p>
          <h1 className="font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Time,
            <br />
            <span className="italic text-champagne">worn well.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/60">
            Crownix Store designs premium automatic, quartz, sport and skeleton
            watches in-house — engineered for daily wear, priced so the exceptional
            doesn&apos;t stay out of reach.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/collections" className="btn-gold group">
              Shop Now
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/collections/luxury" className="btn-outline">
              Explore Collection
            </Link>
          </div>

          <div className="mt-14 flex gap-10">
            {[
              ["12+", "Original Models"],
              ["4.7★", "Average Rating"],
              ["48h", "Power Reserve"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-champagne">{value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-ivory/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] lg:h-[560px]"
        >
          <Watch3D />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="text-champagne/60" size={22} />
      </motion.div>
    </section>
  );
}
