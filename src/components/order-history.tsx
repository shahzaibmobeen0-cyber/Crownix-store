"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { formatPKR } from "@/lib/utils";
import type { Order } from "@/types";

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });
      setOrders((data as unknown as Order[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="text-ivory/50">Loading orders…</p>;

  if (!isSupabaseConfigured) {
    return (
      <p className="text-ivory/50">
        Connect Supabase to enable persistent order history — see the README section
        &ldquo;Connecting Supabase&rdquo;. Orders placed in demo mode are not stored.
      </p>
    );
  }

  if (orders.length === 0) {
    return <p className="text-ivory/50">No orders yet — sign in and place your first order.</p>;
  }

  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {orders.map((o) => (
        <li key={o.id} className="flex items-center justify-between py-5">
          <div>
            <p className="font-display text-lg text-ivory">Order #{o.id.slice(0, 8)}</p>
            <p className="text-xs text-ivory/40">{new Date(o.createdAt).toLocaleDateString()}</p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest2 text-champagne">{o.status}</span>
          <p className="font-mono text-ivory">{formatPKR(o.total)}</p>
        </li>
      ))}
    </ul>
  );
}
