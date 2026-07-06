import { Star, BadgeCheck } from "lucide-react";
import { Product } from "@/types";

export default function ReviewsSection({ product }: { product: Product }) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => r.rating === star).length;
    const pct = product.reviews.length ? (count / product.reviews.length) * 100 : 0;
    return { star, pct };
  });

  return (
    <section id="reviews" className="border-t border-white/10 py-16">
      <h2 className="font-display text-3xl text-ivory">Customer Reviews</h2>

      <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
        <div>
          <p className="font-display text-5xl text-champagne">{product.rating.toFixed(1)}</p>
          <div className="mt-2 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(product.rating) ? "#C6A664" : "none"}
                className={i < Math.round(product.rating) ? "text-champagne" : "text-ivory/20"}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-ivory/50">Based on {product.reviewCount} reviews</p>

          <div className="mt-6 space-y-2">
            {breakdown.map((b) => (
              <div key={b.star} className="flex items-center gap-2 text-xs text-ivory/50">
                <span className="w-3">{b.star}</span>
                <Star size={10} fill="#C6A664" className="text-champagne" />
                <div className="h-1.5 flex-1 bg-white/10">
                  <div className="h-1.5 bg-champagne" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className="space-y-6">
          {product.reviews.map((r) => (
            <li key={r.id} className="border-b border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-display text-base text-ivory">{r.author}</p>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest2 text-champagne">
                      <BadgeCheck size={12} /> Verified
                    </span>
                  )}
                </div>
                <span className="text-xs text-ivory/40">
                  {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < r.rating ? "#C6A664" : "none"}
                    className={i < r.rating ? "text-champagne" : "text-ivory/20"}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
