import { Mail, Phone } from "lucide-react";

const demoCustomers = [
  { name: "Ahmed Raza", email: "ahmed.raza@example.com", phone: "0300xxxxxxx", orders: 3, spent: 68500 },
  { name: "Sana Malik", email: "sana.malik@example.com", phone: "0301xxxxxxx", orders: 1, spent: 27500 },
  { name: "Bilal Sheikh", email: "bilal.sheikh@example.com", phone: "0333xxxxxxx", orders: 2, spent: 46400 },
  { name: "Fatima Khan", email: "fatima.khan@example.com", phone: "0321xxxxxxx", orders: 5, spent: 112300 },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ivory">Customers</h1>
      <p className="mt-1 text-sm text-ivory/50">
        {demoCustomers.length} customers — demo data. Connect Supabase auth + profiles to list real accounts.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {demoCustomers.map((c) => (
          <div key={c.email} className="border border-white/10 bg-onyx-800 p-6">
            <p className="font-display text-lg text-ivory">{c.name}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-ivory/50">
              <Mail size={12} /> {c.email}
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-ivory/50">
              <Phone size={12} /> {c.phone}
            </p>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-sm">
              <span className="text-ivory/60">{c.orders} orders</span>
              <span className="font-mono text-champagne">PKR {c.spent.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
