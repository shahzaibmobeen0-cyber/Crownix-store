import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { products } from "@/data/products";
import { formatPKR } from "@/lib/utils";

const stats = [
  { label: "Total Products", value: products.length.toString(), icon: Package },
  { label: "Orders This Month", value: "47", icon: ShoppingCart },
  { label: "Customers", value: "312", icon: Users },
  { label: "Revenue (30d)", value: formatPKR(1284500), icon: TrendingUp },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ivory">Overview</h1>
      <p className="mt-1 text-sm text-ivory/50">
        Demo metrics shown below. Connect Supabase to replace with live figures — see README.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-white/10 bg-onyx-800 p-6">
            <s.icon className="text-champagne" size={22} />
            <p className="mt-4 font-display text-2xl text-ivory">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest2 text-ivory/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-white/10 bg-onyx-800 p-6">
        <h2 className="font-display text-xl text-ivory">Low Stock Alerts</h2>
        <ul className="mt-4 divide-y divide-white/10">
          {products
            .filter((p) => p.inStock && p.stockCount <= 10)
            .map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3 text-sm">
                <span className="text-ivory">{p.name}</span>
                <span className="font-mono text-champagne">{p.stockCount} left</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
