import type { Metadata } from "next";
import OrderHistory from "@/components/order-history";

export const metadata: Metadata = {
  title: "Order History",
  description: "View your past Crownix Store orders.",
};

export default function OrdersPage() {
  return (
    <div className="container-lux py-32">
      <div className="mb-10 max-w-lg">
        <p className="eyebrow mb-3">My Account</p>
        <h1 className="font-display text-5xl text-ivory">Order History</h1>
      </div>
      <OrderHistory />
    </div>
  );
}
