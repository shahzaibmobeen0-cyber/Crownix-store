import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, getRelatedProducts } from "@/data/products";
import ProductGallery from "@/components/product-gallery";
import BuyBox from "@/components/buy-box";
import ReviewsSection from "@/components/reviews-section";
import RelatedProducts from "@/components/related-products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brandLine}`,
    description: product.description,
    openGraph: { images: [{ url: product.images[0]! }] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: "Crownix Store" },
    sku: product.sku,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="container-lux py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-14 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <BuyBox product={product} />
      </div>
      <ReviewsSection product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
