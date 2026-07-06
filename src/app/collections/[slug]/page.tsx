import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { collections, getCollection } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import ProductGrid from "@/components/product-grid";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const productList = getProductsByCollection(collection.slug);

  return (
    <div>
      <div className="relative flex h-72 items-end overflow-hidden pt-24">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/60 to-onyx/20" />
        <div className="container-lux relative z-10 pb-8">
          <p className="eyebrow mb-2">{productList.length} Pieces</p>
          <h1 className="font-display text-4xl text-ivory sm:text-5xl">{collection.name}</h1>
          <p className="mt-2 max-w-lg text-sm text-ivory/70">{collection.description}</p>
        </div>
      </div>
      <div className="container-lux py-16">
        <ProductGrid products={productList} />
      </div>
    </div>
  );
}
