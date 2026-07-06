"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Verified Buyer — Meridian Noir",
    quote:
      "Ordering was easy and the WhatsApp confirmation made me trust the brand immediately. The watch itself feels heavier and better finished than the price tag suggests.",
    rating: 5,
  },
  {
    name: "Sana Malik",
    role: "Verified Buyer — Regent Gold",
    quote:
      "Got this as a gift for my sister — the packaging alone looked like it came from a boutique, not an online order.",
    rating: 5,
  },
  {
    name: "Bilal Sheikh",
    role: "Verified Buyer — Voyager Carbon",
    quote:
      "I run a lot and was worried about durability. Six months in, no scratches on the crystal and the strap has held up fine.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="container-lux py-24">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">In Their Words</p>
        <h2 className="font-display text-4xl text-ivory sm:text-5xl">Worn by You</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass p-7"
          >
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={14}
                  fill={s < t.rating ? "#C6A664" : "none"}
                  className={s < t.rating ? "text-champagne" : "text-ivory/20"}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-ivory/75">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-5">
              <p className="font-display text-base text-ivory">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-champagne/70">
                {t.role}
              </p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
