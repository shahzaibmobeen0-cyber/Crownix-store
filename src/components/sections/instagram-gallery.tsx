import Image from "next/image";
import { Instagram } from "lucide-react";
import { products } from "@/data/products";

export default function InstagramGallery() {
  const shots = products.slice(0, 6);
  return (
    <section className="py-24">
      <div className="container-lux mb-10 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-3">@crownix.1672868</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">On Instagram</h2>
        </div>
        <a
          href="https://instagram.com/crownix.1672868"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline hidden md:inline-flex"
        >
          <Instagram size={15} /> Follow
        </a>
      </div>
      <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {shots.map((p) => (
          <a
            key={p.id}
            href="https://instagram.com/crownix.1672868"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={p.images[0]!}
              alt={p.name}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-onyx/0 transition-colors group-hover:bg-onyx/50">
              <Instagram
                size={20}
                className="text-ivory opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
