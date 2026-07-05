# Crownix Store — Luxury Within Reach

A premium, production-ready e-commerce storefront for **Crownix Store**, an original watch
brand. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, React Three Fiber, and
Framer Motion, with Supabase as the backend of record.

> **Brand note:** Crownix Store is an original brand identity. No third-party watch brand
> names, logos, or trademarks are used anywhere in this codebase or its demo content.

---

## ✨ What's fully built

- **Homepage** — full-screen hero with a procedurally modelled 3D watch (React Three
  Fiber) whose hands track real local time, animated logo intro / loading screen, floating
  particles, CTA buttons.
- **Navigation** — sticky glass navbar, live search overlay, wishlist + cart counters, slide-in
  cart drawer, mobile menu.
- **Catalog** — 6 collections (Luxury, Classic, Sport, Skeleton, Automatic, Quartz), 12 demo
  products with full spec sheets, reviews, and stock data (`src/data`).
- **Product page** — gallery with hover-zoom, drag-to-rotate 360° viewer, ratings/review
  breakdown, related products, WhatsApp order button, Product JSON-LD for SEO.
- **Shopping** — cart page, checkout with address form + coupon codes (`CROWNIX10`,
  `WELCOME1500`) + order summary, wishlist page — all persisted to `localStorage` via Zustand.
- **Accounts** — Supabase-auth sign in/up form, order history view.
- **Admin dashboard** — login, product CRUD table (add/edit/delete/image upload preview),
  order status management, customer list, sales analytics charts (Recharts).
- **Content sections** — Why Crownix, testimonials, FAQ accordion, Instagram gallery,
  newsletter signup, contact form + Google Maps placeholder, premium footer.
- **SEO/perf** — per-page metadata, dynamic `sitemap.xml` and `robots.txt`, `next/image`
  optimization, code-split routes, semantic HTML, visible focus states, `prefers-reduced-motion`
  support.

## 🧩 What's scaffolded (needs your Supabase project to go fully live)

The storefront runs today on realistic mock data in `src/data/*` — no backend required for
local development or a Vercel preview. The following are wired with clear `// see README`
comments showing exactly where to connect Supabase:

- **Accounts & sessions** (`src/components/auth-form.tsx`, `src/lib/supabase.ts`)
- **Order persistence** (`src/app/api/orders/route.ts` — a working route handler using the
  service-role client; the checkout page currently simulates placing an order)
- **Order history** (`src/components/order-history.tsx`)
- **Admin auth guard** (`src/app/admin/login/page.tsx` — currently allows a demo pass-through
  when Supabase env vars are absent)
- **Admin CRUD persistence** (`src/app/admin/dashboard/products/page.tsx` — edits are
  client-only until you add API routes backed by `supabaseAdmin`)

This split is intentional: you can demo, review, and deploy the entire storefront today, then
wire up Supabase at your own pace without touching the UI layer.

---

## 🛠 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, RSC) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS (custom design tokens) |
| 3D | Three.js via React Three Fiber + drei |
| Animation | Framer Motion |
| State | Zustand (cart, wishlist) + localStorage persistence |
| Backend | Supabase (Postgres + Auth + Storage) |
| Charts | Recharts (admin analytics) |
| Icons | lucide-react |
| Toasts | react-hot-toast |

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY once you have a
# Supabase project (optional for local preview — the storefront works on mock data
# without them).

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

### Design tokens

Colors, type scale, and animation timing live in `tailwind.config.ts` and
`src/app/globals.css`. The palette (`onyx`, `champagne`, `ivory`, `steel`) maps directly to
the brief's Black / Gold / White / Silver requirement — edit the hex values there to
re-tune the brand without touching component code.

Fonts (`next/font/google`, self-hosted, zero layout shift):
- **Fraunces** — display/headline serif
- **Manrope** — body sans-serif
- **Space Mono** — eyebrows, prices, specs, UI labels (evokes dial typography)

---

## 🗄 Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of `public/sql/schema.sql`, and run it.
   This creates `profiles`, `products`, `collections`, `reviews`, `orders`, `wishlists`,
   `coupons`, plus Row Level Security policies.
3. Copy your **Project URL**, **anon key**, and **service role key** into `.env.local`
   (see `.env.example`).
4. (Optional) Seed `products`/`collections` from `src/data/*` using the Supabase SQL editor
   or a one-off script — the shapes match closely by design.

### Admin access

The schema includes `profiles.is_admin boolean`. To make a user an admin:

```sql
update public.profiles set is_admin = true where id = '<user-uuid>';
```

Then sign in at `/admin/login` with that account's email/password.

### Wiring up the Admin CRUD

`src/app/admin/dashboard/products/page.tsx` currently manages state client-side. To persist:

1. Add route handlers under `src/app/api/admin/products/` using `supabaseAdmin` from
   `src/lib/supabase-admin.ts` (service role — bypasses RLS, **server-only**, never import it
   in a Client Component).
2. Replace the `setItems` calls with `fetch()` calls to those routes.
3. For image uploads, swap the `URL.createObjectURL` preview for a real upload to a Supabase
   Storage bucket and store the returned public URL.

### Wiring up Checkout

`src/app/api/orders/route.ts` is already a working `POST` handler. Point the checkout page's
`handlePlaceOrder` at it with `fetch("/api/orders", { method: "POST", body: JSON.stringify(...) })`
once you're ready to persist real orders.

---

## 📦 Project structure

```
src/
├── app/                    # Routes (App Router)
│   ├── admin/              # Admin login + dashboard (products/orders/customers/analytics)
│   ├── api/orders/         # Example route handler (Supabase-backed)
│   ├── collections/        # Collection listing + [slug] detail
│   ├── product/[slug]/     # Product detail page
│   ├── cart/ checkout/ wishlist/ account/
│   ├── sitemap.ts robots.ts not-found.tsx loading.tsx
│   └── layout.tsx page.tsx globals.css
├── components/
│   ├── sections/           # Homepage content sections
│   ├── hero.tsx watch-3d.tsx watch-3d-canvas.tsx   # 3D hero
│   ├── navbar.tsx footer.tsx cart-drawer.tsx search-overlay.tsx
│   ├── product-card.tsx product-grid.tsx product-gallery.tsx buy-box.tsx
│   └── reviews-section.tsx related-products.tsx auth-form.tsx order-history.tsx
├── context/                # Zustand stores (cart, wishlist)
├── data/                   # Mock catalog (products.ts, collections.ts)
├── lib/                    # supabase.ts, supabase-admin.ts, utils.ts
└── types/                  # Shared TypeScript types
public/sql/schema.sql       # Full Supabase schema + RLS policies
```

---

## ⚡ Performance & accessibility notes

- The 3D hero (`watch-3d.tsx`) is loaded via `next/dynamic` with `ssr: false` and a lightweight
  pulse-circle fallback, so it never blocks first paint or SSR.
- All images route through `next/image` with device-appropriate `sizes` for responsive,
  lazy-loaded delivery.
- Routes are automatically code-split by the App Router; the admin dashboard bundle (Recharts,
  CRUD tables) never loads for storefront visitors.
- Focus states are visible (`:focus-visible` in `globals.css`), and `prefers-reduced-motion`
  disables non-essential animation globally.
- Product pages emit `Product` JSON-LD for rich search results.

## 🖼 Demo imagery

Product and lifestyle photography in `src/data/products.ts` uses royalty-free Unsplash URLs
as placeholders. Swap these for your own studio photography (or Supabase Storage URLs) before
launch — the `images: string[]` field on each product accepts any public image URL.

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy — `next.config.js` and the App Router structure require zero extra Vercel config.

---

## 🔒 A note on originality

Per the brand brief, this project intentionally avoids any copyrighted logos, trademarks, or
branding from existing watch companies. All product names, model names, and copy are original
to Crownix Store. If you later source real inventory (including OEM/ODM pieces), keep
marketing copy in Crownix's own voice and avoid naming or implying association with other
watch brands.
