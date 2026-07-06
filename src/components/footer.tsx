"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "@/components/logo";
import { collections } from "@/data/collections";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    toast.success("Welcome to the Crownix inner circle.");
    setEmail("");
  }

  return (
    <footer className="border-t border-white/10 bg-onyx-800">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
            Crownix Store designs and ships premium automatic, quartz, sport and skeleton
            watches — engineered for everyday wear, priced for real life.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://instagram.com/crownix.1672868"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Crownix on Instagram"
              className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-colors hover:border-champagne hover:text-champagne"
            >
              <Instagram size={17} />
            </a>
            <a
              href="#"
              aria-label="Crownix on Facebook"
              className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-colors hover:border-champagne hover:text-champagne"
            >
              <Facebook size={17} />
            </a>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Crownix on WhatsApp"
              className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-colors hover:border-champagne hover:text-champagne"
            >
              <MessageCircle size={17} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Collections</h3>
          <ul className="space-y-2.5 text-sm text-ivory/60">
            {collections.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="transition-colors hover:text-champagne">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm text-ivory/60">
            <li><Link href="/about" className="hover:text-champagne">About Crownix</Link></li>
            <li><Link href="/contact" className="hover:text-champagne">Contact</Link></li>
            <li><Link href="/account" className="hover:text-champagne">My Account</Link></li>
            <li><Link href="/account/orders" className="hover:text-champagne">Track Order</Link></li>
            <li><Link href="/admin/login" className="hover:text-champagne">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Stay Updated</h3>
          <p className="mb-4 text-sm text-ivory/60">
            New arrivals, private offers, one email a month — no more.
          </p>
          <form onSubmit={handleSubscribe} className="flex border border-white/15">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none"
            />
            <button type="submit" className="bg-champagne px-4 font-mono text-[11px] uppercase text-onyx">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="container-lux flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-ivory/40 md:flex-row">
        <p>© {new Date().getFullYear()} Crownix Store. All rights reserved.</p>
        <p className="font-mono uppercase tracking-widest2">Luxury Within Reach</p>
      </div>
    </footer>
  );
}
