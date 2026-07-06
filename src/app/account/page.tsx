import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/auth-form";

export const metadata: Metadata = {
  title: "My Account",
  description: "Sign in to your Crownix Store account.",
};

export default function AccountPage() {
  return (
    <div className="container-lux py-32">
      <div className="mb-10 max-w-lg">
        <p className="eyebrow mb-3">My Account</p>
        <h1 className="font-display text-5xl text-ivory">Welcome to Crownix</h1>
      </div>
      <AuthForm />
      <p className="mt-6 text-sm text-ivory/50">
        Looking for a past order?{" "}
        <Link href="/account/orders" className="text-champagne hover:underline">
          View order history
        </Link>
        .
      </p>
    </div>
  );
}
