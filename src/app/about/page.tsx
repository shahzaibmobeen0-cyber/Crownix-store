import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Gem, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Crownix Store designs original watches for people who want the feel of luxury without the markup of a heritage name.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="relative flex h-96 items-end overflow-hidden pt-24">
        <Image
          src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1600&auto=format&fit=crop"
          alt="Crownix watch detail"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/60 to-onyx/10" />
        <div className="container-lux relative z-10 pb-10">
          <p className="eyebrow mb-2">Our Story</p>
          <h1 className="font-display text-5xl text-ivory">Luxury, Redesigned</h1>
        </div>
      </div>

      <div className="container-lux max-w-3xl py-20">
        <p className="text-lg leading-relaxed text-ivory/75">
          Crownix Store started with a simple frustration: the watches that felt genuinely
          well made were priced for people who already had money, and the ones priced for
          everyone else felt disposable. We set out to close that gap — not by copying a
          heritage name, but by designing our own cases, dials and movements from scratch.
        </p>
        <p className="mt-6 leading-relaxed text-ivory/60">
          Every Crownix piece goes through the same short list of questions before it ships:
          does the case feel substantial on the wrist, does the movement hold time within a
          reasonable margin, and would we hand this to a friend without hesitating. If the
          answer isn&apos;t yes to all three, it doesn&apos;t reach the store.
        </p>
      </div>

      <div className="container-lux grid gap-10 border-t border-white/10 py-20 sm:grid-cols-3">
        {[
          { icon: Gem, title: "Original Design", body: "Every case and dial is drawn in-house — nothing traced from another brand." },
          { icon: ShieldCheck, title: "Built to Last", body: "2-year movement warranty on every automatic and quartz piece we sell." },
          { icon: Users, title: "For Real Wrists", body: "Priced and sized for daily wear, not display cases." },
        ].map((v) => (
          <div key={v.title}>
            <v.icon className="text-champagne" size={28} strokeWidth={1.3} />
            <h3 className="mt-4 font-display text-lg text-ivory">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/60">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
