import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, LogOut } from "lucide-react";
import Logo from "@/components/logo";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/products", label: "Products", icon: Package },
  { href: "/admin/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/dashboard/customers", label: "Customers", icon: Users },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-onyx">
      <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-onyx-800 p-6 lg:block">
        <Logo />
        <nav className="mt-10 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 rounded px-3 py-2.5 text-sm text-ivory/70 transition-colors hover:bg-white/5 hover:text-champagne"
            >
              <l.icon size={17} />
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/admin/login"
          className="mt-10 flex items-center gap-3 rounded px-3 py-2.5 text-sm text-ivory/50 hover:text-red-400"
        >
          <LogOut size={17} /> Sign Out
        </Link>
      </aside>
      <div className="flex-1 p-6 lg:p-10">{children}</div>
    </div>
  );
}
