import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse every Crownix Store collection — Luxury, Classic, Sport, Skeleton, Automatic and Quartz.",
};

export default function CollectionsPage() {
  return (
    <div className="container-lux py-32">
      <div className="mb-14 max-w-lg">
        <p className="eyebrow mb-3">The Full Range</p>
        <h1 className="font-display text-5xl text-ivory">Collections</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group relative block h-96 overflow-hidden border border-white/10"
          >
            <Image
              src={c.heroImage}
              alt={c.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h2 className="font-display text-3xl text-ivory">{c.name}</h2>
              <p className="mt-2 max-w-sm text-sm text-ivory/60">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
