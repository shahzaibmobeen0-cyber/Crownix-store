import { Collection } from "@/types";

export const collections: Collection[] = [
  {
    slug: "luxury",
    name: "Luxury Collection",
    description:
      "Statement pieces finished in champagne gold and deep onyx — built for the moments that matter.",
    heroImage:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "classic",
    name: "Classic Collection",
    description:
      "Timeless dress watches with clean dials and refined proportions for everyday elegance.",
    heroImage:
      "https://images.unsplash.com/photo-1524592094714-0f0854e0f68a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "sport",
    name: "Sport Collection",
    description:
      "Robust cases and reinforced crystals engineered for movement, without sacrificing polish.",
    heroImage:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "skeleton",
    name: "Skeleton Collection",
    description:
      "Open-worked dials that expose the mechanics of time — engineering as ornament.",
    heroImage:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "automatic",
    name: "Automatic Collection",
    description:
      "Self-winding calibres that never sleep, powered by nothing but the motion of your wrist.",
    heroImage:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "quartz",
    name: "Quartz Collection",
    description:
      "Precision quartz movements in minimalist cases — accuracy, distilled.",
    heroImage:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
