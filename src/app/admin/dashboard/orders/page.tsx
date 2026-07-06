"use client";

import { useState } from "react";
import { formatPKR } from "@/lib/utils";
import type { Order } from "@/types";

/**
 * Demo order queue. Replace `demoOrders` with a fetch to /api/admin/orders
 * (backed by supabaseAdmin.from("orders").select()) once Supabase is wired
 * up — see README "Wiring up the Admin CRUD".
 */
const demoOrders: Order[] = [
  {
    id: "CRX-10231",
    userId: "guest",
    items: [{ productId: "p1", quantity: 1, priceAtPurchase: 24500 }],
    subtotal: 24500,
    discount: 0,
    shippingFee: 0,
    total: 24500,
    status: "processing",
    address: { fullName: "Ahmed Raza", phone: "0300xxxxxxx", line1: "Street 4, DHA", city: "Lahore", province: "Punjab", postalCode: "54000", country: "Pakistan" },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "CRX-10230",
    userId: "guest",
    items: [{ productId: "p6", quantity: 2, priceAtPurchase: 14500 }],
    subtotal: 29000,
    discount: 1500,
    couponCode: "WELCOME1500",
    shippingFee: 0,
    total: 27500,
    status: "shipped",
    address: { fullName: "Sana Malik", phone: "0301xxxxxxx", line1: "Block 6, Gulshan", city: "Karachi", province: "Sindh", postalCode: "75300", country: "Pakistan" },
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "CRX-10229",
    userId: "guest",
    items: [{ productId: "p7", quantity: 1, priceAtPurchase: 34900 }],
    subtotal: 34900,
    discount: 0,
    shippingFee: 0,
    total: 34900,
    status: "delivered",
    address: { fullName: "Bilal Sheikh", phone: "0333xxxxxxx", line1: "F-10 Markaz", city: "Islamabad", province: "ICT", postalCode: "44000", country: "Pakistan" },
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
  },
];

const statusColors: Record<Order["status"], string> = {
  pending: "text-ivory/60",
  processing: "text-champagne",
  shipped: "text-blue-400",
  delivered: "text-green-400",
  cancelled: "text-red-400",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(demoOrders);

  function updateStatus(id: string, status: Order["status"]) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ivory">Orders</h1>
      <p className="mt-1 text-sm text-ivory/50">{orders.length} orders — demo data</p>

      <div className="mt-8 overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-onyx-800 text-xs uppercase tracking-widest2 text-ivory/50">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">City</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-4 font-mono text-champagne">{o.id}</td>
                <td className="p-4 text-ivory">{o.address.fullName}</td>
                <td className="p-4 text-ivory/70">{o.address.city}</td>
                <td className="p-4 font-mono text-ivory">{formatPKR(o.total)}</td>
                <td className="p-4">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                    className={`border border-white/15 bg-onyx px-2 py-1 text-xs uppercase tracking-widest2 focus:border-champagne focus:outline-none ${statusColors[o.status]}`}
                  >
                    {(["pending", "processing", "shipped", "delivered", "cancelled"] as const).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-ivory/50">
                  {new Date(o.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
