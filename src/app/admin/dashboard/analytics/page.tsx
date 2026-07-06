"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { getBestSellers } from "@/data/products";
import { formatPKR } from "@/lib/utils";

const revenueByWeek = [
  { week: "Wk 1", revenue: 210000 },
  { week: "Wk 2", revenue: 268000 },
  { week: "Wk 3", revenue: 194000 },
  { week: "Wk 4", revenue: 312000 },
  { week: "Wk 5", revenue: 300500 },
];

const collectionShare = [
  { collection: "Luxury", sales: 34 },
  { collection: "Automatic", sales: 27 },
  { collection: "Classic", sales: 19 },
  { collection: "Quartz", sales: 22 },
  { collection: "Sport", sales: 15 },
  { collection: "Skeleton", sales: 11 },
];

export default function AdminAnalyticsPage() {
  const topSellers = getBestSellers(5);

  return (
    <div>
      <h1 className="font-display text-3xl text-ivory">Sales Analytics</h1>
      <p className="mt-1 text-sm text-ivory/50">
        Demo dataset. Replace with a Supabase view aggregating the `orders` table — see README.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-white/10 bg-onyx-800 p-6">
          <h2 className="mb-4 font-display text-lg text-ivory">Revenue — Last 5 Weeks</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueByWeek}>
              <defs>
                <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C6A664" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#C6A664" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="week" stroke="#9CA0A6" fontSize={11} />
              <YAxis stroke="#9CA0A6" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "#121214", border: "1px solid rgba(198,166,100,0.3)" }}
                formatter={(v: number) => formatPKR(v)}
              />
              <Area type="monotone" dataKey="revenue" stroke="#C6A664" fill="url(#gold)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-white/10 bg-onyx-800 p-6">
          <h2 className="mb-4 font-display text-lg text-ivory">Units Sold by Collection</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={collectionShare}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="collection" stroke="#9CA0A6" fontSize={11} />
              <YAxis stroke="#9CA0A6" fontSize={11} />
              <Tooltip contentStyle={{ background: "#121214", border: "1px solid rgba(198,166,100,0.3)" }} />
              <Bar dataKey="sales" fill="#C6A664" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 border border-white/10 bg-onyx-800 p-6">
        <h2 className="mb-4 font-display text-lg text-ivory">Top Sellers</h2>
        <ul className="divide-y divide-white/10">
          {topSellers.map((p, i) => (
            <li key={p.id} className="flex items-center justify-between py-3 text-sm">
              <span className="text-ivory/70">
                <span className="mr-3 font-mono text-champagne">{String(i + 1).padStart(2, "0")}</span>
                {p.name}
              </span>
              <span className="font-mono text-ivory">{formatPKR(p.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
