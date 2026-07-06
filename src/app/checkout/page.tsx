"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCartStore } from "@/context/cart-store";
import { getProductById, formatPKR, applyCoupon } from "@/lib/utils";
import { Address } from "@/types";

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  line1: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Pakistan",
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();

  const [address, setAddress] = useState<Address>(emptyAddress);
  const [payment, setPayment] = useState<"cod" | "bank">("cod");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placing, setPlacing] = useState(false);

  const total = Math.max(subtotal - discount, 0);

  function handleApplyCoupon() {
    const result = applyCoupon(coupon, subtotal);
    setDiscount(result.valid ? result.discount : 0);
    toast[result.valid ? "success" : "error"](result.message);
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.line1 || !address.city) {
      toast.error("Fill in all required shipping details.");
      return;
    }
    setPlacing(true);
    // In production this posts to /api/orders which writes to Supabase
    // via supabaseAdmin and returns an order id. See README.
    setTimeout(() => {
      toast.success("Order placed! We'll confirm on WhatsApp shortly.");
      clear();
      setPlacing(false);
      router.push("/");
    }, 900);
  }

  if (items.length === 0) {
    return (
      <div className="container-lux py-32 text-center">
        <p className="text-ivory/50">Your bag is empty — add something before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container-lux py-32">
      <h1 className="mb-10 font-display text-5xl text-ivory">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 font-display text-2xl text-ivory">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none sm:col-span-2"
              />
              <input
                required
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
              />
              <input
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
              />
              <input
                required
                placeholder="Street Address"
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                className="border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none sm:col-span-2"
              />
              <input
                required
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
              />
              <input
                placeholder="Province"
                value={address.province}
                onChange={(e) => setAddress({ ...address, province: e.target.value })}
                className="border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl text-ivory">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 border border-white/15 p-4">
                <input type="radio" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                <span className="text-sm text-ivory">Cash on Delivery</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 border border-white/15 p-4">
                <input type="radio" checked={payment === "bank"} onChange={() => setPayment("bank")} />
                <span className="text-sm text-ivory">Bank Transfer</span>
              </label>
            </div>
          </section>
        </div>

        <aside className="glass h-fit space-y-6 p-7">
          <h2 className="font-display text-xl text-ivory">Order Summary</h2>
          <ul className="space-y-4">
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex items-center gap-3">
                  <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden bg-onyx-800">
                    <Image src={product.images[0]!} alt={product.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-ivory">{product.name}</p>
                    <p className="text-ivory/40">Qty {item.quantity}</p>
                  </div>
                  <p className="font-mono text-sm text-champagne">{formatPKR(product.price * item.quantity)}</p>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 border border-white/15 bg-transparent px-3 py-2.5 text-sm focus:border-champagne focus:outline-none"
            />
            <button type="button" onClick={handleApplyCoupon} className="border border-champagne/50 px-4 font-mono text-[10px] uppercase tracking-widest2 hover:bg-champagne/10">
              Apply
            </button>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-ivory/70">
              <span>Subtotal</span>
              <span className="font-mono">{formatPKR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-champagne">
                <span>Discount</span>
                <span className="font-mono">-{formatPKR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ivory/70">
              <span>Shipping</span>
              <span className="font-mono text-champagne">Free</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg text-ivory">
              <span>Total</span>
              <span className="text-champagne">{formatPKR(total)}</span>
            </div>
          </div>

          <button type="submit" disabled={placing} className="btn-gold w-full disabled:opacity-50">
            {placing ? "Placing Order…" : "Place Order"}
          </button>
          <p className="text-center text-xs text-ivory/40">
            Try coupon codes <span className="text-champagne">CROWNIX10</span> or{" "}
            <span className="text-champagne">WELCOME1500</span>
          </p>
        </aside>
      </form>
    </div>
  );
}
