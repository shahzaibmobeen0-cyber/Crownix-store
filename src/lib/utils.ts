import { products } from "@/data/products";
import { Coupon } from "@/types";

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const COUPONS: Coupon[] = [
  { code: "CROWNIX10", type: "percent", value: 10 },
  { code: "WELCOME1500", type: "flat", value: 1500, minSubtotal: 15000 },
];

export function applyCoupon(code: string, subtotal: number) {
  const coupon = COUPONS.find(
    (c) => c.code.toLowerCase() === code.trim().toLowerCase()
  );
  if (!coupon) return { valid: false, discount: 0, message: "Invalid or expired code." };
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      discount: 0,
      message: `Add ${coupon.minSubtotal - subtotal} PKR more to use this code.`,
    };
  }
  const discount =
    coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  return { valid: true, discount, message: "Coupon applied." };
}

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function whatsappOrderLink(productName: string, price: number) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
  const text = encodeURIComponent(
    `Hi Crownix Store, I'd like to order the "${productName}" (PKR ${price.toLocaleString()}). Is it in stock?`
  );
  return `https://wa.me/${number}?text=${text}`;
}
