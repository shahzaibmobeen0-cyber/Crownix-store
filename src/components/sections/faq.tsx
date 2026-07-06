"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Are Crownix watches original designs?",
    a: "Yes. Every Crownix piece is designed and specced in-house — case shape, dial layout, and strap details are our own, not copies of another brand's catalogue.",
  },
  {
    q: "What's the difference between Automatic and Quartz?",
    a: "Automatic movements wind themselves from the motion of your wrist and need no battery, but lose or gain a few seconds a day. Quartz movements run on a battery and are more precise, typically within seconds a month.",
  },
  {
    q: "Do you offer Cash on Delivery in Pakistan?",
    a: "Yes, COD is available nationwide on every order, alongside card and bank transfer options at checkout.",
  },
  {
    q: "What's your warranty and return policy?",
    a: "Every watch carries a 2-year movement warranty against manufacturing defects. Unworn pieces can be returned within 7 days of delivery in original packaging.",
  },
  {
    q: "Can I order directly on WhatsApp?",
    a: "Absolutely — every product page has a WhatsApp Order button that pre-fills your enquiry so our team can confirm stock and sizing in minutes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-lux max-w-3xl py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow mb-3">Good to Know</p>
        <h2 className="font-display text-4xl text-ivory sm:text-5xl">Questions, Answered</h2>
      </div>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg text-ivory">{f.q}</span>
              <Plus
                size={18}
                className={`flex-shrink-0 text-champagne transition-transform ${
                  open === i ? "rotate-45" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-relaxed text-ivory/60">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
