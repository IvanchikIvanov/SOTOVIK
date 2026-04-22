-- Orders table for anonymous quick-order flow.
-- Buyers are identified only by visitor_id cookie + IP + phone. No auth required.

create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    order_code text not null unique,
    visitor_id uuid,
    ip text,
    user_agent text,
    name text,
    phone text not null,
    items jsonb not null,
    source text not null check (source in ('buy_now', 'cart')),
    total integer not null default 0,
    status text not null default 'new',
    created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_phone_idx       on public.orders (phone);
create index if not exists orders_visitor_id_idx  on public.orders (visitor_id);

alter table public.orders enable row level security;

-- Clients must NOT read/update/delete orders directly (done via Edge Function + service role).
-- We do not grant INSERT to anon either — insertion happens exclusively from the
-- `submit-order` Edge Function which uses the service role key and bypasses RLS.
-- If direct anon insert is ever needed, add a policy here explicitly.

-- Optional: let authenticated admins read orders. Wire `is_admin` however your project already does.
-- Example (commented): matches existing user_roles table if present.
-- create policy "admins read orders" on public.orders
--   for select using (
--     exists (
--       select 1 from public.user_roles ur
--       where ur.user_id = auth.uid() and ur.role = 'admin'
--     )
--   );
