export type MovementType = "Automatic" | "Quartz";

export type CollectionSlug =
  | "luxury"
  | "classic"
  | "sport"
  | "skeleton"
  | "automatic"
  | "quartz";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  description: string;
  heroImage: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandLine: string; // e.g. "Crownix Meridian"
  price: number; // PKR
  compareAtPrice?: number;
  collection: CollectionSlug;
  movement: MovementType;
  caseMaterial: string;
  caseDiameter: string;
  strapMaterial: string;
  waterResistance: string;
  images: string[]; // gallery
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  inStock: boolean;
  stockCount: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  sku: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; quantity: number; priceAtPurchase: number }[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  address: Address;
  createdAt: string;
}

export interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  minSubtotal?: number;
}
