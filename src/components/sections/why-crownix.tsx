"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Gem, HeadphonesIcon } from "lucide-react";

const points = [
  {
    icon: Gem,
    title: "Designed In-House",
    body: "Every case, dial and clasp is drawn and specced by Crownix — not relabelled from a catalogue.",
  },
  {
    icon: ShieldCheck,
    title: "2-Year Movement Warranty",
    body: "Automatic and quartz calibres covered against manufacturing defects, no fine print.",
  },
  {
    icon: Truck,
    title: "Nationwide Cash on Delivery",
    body: "Free tracked shipping across Pakistan, with COD available on every order.",
  },
  {
    icon: HeadphonesIcon,
    title: "Real Human Support",
    body: "Message us on WhatsApp and talk to someone who actually knows the collection.",
  },
];

export default function WhyCrownix() {
  return (
    <section className="border-y border-white/10 bg-onyx-800/50 py-24">
      <div className="container-lux">
        <div className="mb-14 max-w-lg">
          <p className="eyebrow mb-3">Why Crownix</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">
            Built to be worn, not just unboxed.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p.icon className="text-champagne" size={28} strokeWidth={1.3} />
              <h3 className="mt-4 font-display text-lg text-ivory">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
