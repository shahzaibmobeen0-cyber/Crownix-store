-- Crownix Store — Supabase schema
-- Run in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "uuid-ossp";

-- ── Profiles (extends built-in auth.users) ────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Collections ────────────────────────────────────────────────────────
create table if not exists public.collections (
  slug text primary key,
  name text not null,
  description text,
  hero_image text
);

-- ── Products ───────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  brand_line text,
  price integer not null,
  compare_at_price integer,
  collection_slug text references public.collections (slug),
  movement text check (movement in ('Automatic', 'Quartz')),
  case_material text,
  case_diameter text,
  strap_material text,
  water_resistance text,
  images text[] not null default '{}',
  description text,
  features text[] not null default '{}',
  in_stock boolean not null default true,
  stock_count integer not null default 0,
  is_new_arrival boolean not null default false,
  is_best_seller boolean not null default false,
  sku text unique,
  created_at timestamptz not null default now()
);

-- ── Reviews ────────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products (id) on delete cascade,
  user_id uuid references auth.users (id),
  author text not null,
  rating smallint check (rating between 1 and 5),
  comment text,
  verified boolean default false,
  created_at timestamptz not null default now()
);

-- ── Orders ─────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id),
  items jsonb not null,           -- [{ product_id, quantity, price_at_purchase }]
  subtotal integer not null,
  discount integer not null default 0,
  coupon_code text,
  shipping_fee integer not null default 0,
  total integer not null,
  status text not null default 'pending'
    check (status in ('pending','processing','shipped','delivered','cancelled')),
  address jsonb not null,
  created_at timestamptz not null default now()
);

-- ── Wishlists ──────────────────────────────────────────────────────────
create table if not exists public.wishlists (
  user_id uuid references auth.users (id) on delete cascade,
  product_id uuid references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- ── Coupons ────────────────────────────────────────────────────────────
create table if not exists public.coupons (
  code text primary key,
  type text check (type in ('percent','flat')),
  value integer not null,
  min_subtotal integer,
  active boolean not null default true
);

-- ── Row Level Security ─────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.wishlists enable row level security;
alter table public.reviews enable row level security;
alter table public.products enable row level security;
alter table public.collections enable row level security;

-- Public read access to catalog data
create policy "Public can read products" on public.products for select using (true);
create policy "Public can read collections" on public.collections for select using (true);
create policy "Public can read reviews" on public.reviews for select using (true);

-- Customers can only see/manage their own rows
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users insert own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users manage own wishlist" on public.wishlists for all using (auth.uid() = user_id);

-- Admin bypass: writes to products/orders/coupons happen through the
-- server-only supabaseAdmin client (service role key), which is exempt
-- from RLS. Do not expose the service role key to the browser.
