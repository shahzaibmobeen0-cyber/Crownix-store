"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Logo from "@/components/logo";
import { useCartStore } from "@/context/cart-store";
import { useWishlistStore } from "@/context/wishlist-store";
import SearchOverlay from "@/components/search-overlay";
import CartDrawer from "@/components/cart-drawer";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collection" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();

  const cartCount = useCartStore((s) => s.count());
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="container-lux flex items-center justify-between">
          <Logo />

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`font-mono text-[11px] uppercase tracking-widest2 transition-colors hover:text-champagne ${
                    pathname === l.href ? "text-champagne" : "text-ivory/85"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-ivory/85 transition-colors hover:text-champagne"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative text-ivory/85 transition-colors hover:text-champagne"
            >
              <Heart size={19} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-bold text-onyx">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative text-ivory/85 transition-colors hover:text-champagne"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-bold text-onyx">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="text-ivory/85 lg:hidden"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-onyx lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-lux flex items-center justify-between py-5">
              <Logo />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X size={24} className="text-ivory" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-start justify-center gap-7 px-10">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-ivory hover:text-champagne"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
