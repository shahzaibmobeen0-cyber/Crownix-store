import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://crownixstore.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collections",
    "/new-arrivals",
    "/best-sellers",
    "/about",
    "/contact",
    "/cart",
    "/wishlist",
    "/account",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
