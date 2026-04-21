create extension if not exists "pgcrypto";

create table if not exists public.user_roles (
    user_id uuid primary key references auth.users (id) on delete cascade,
    role text not null check (role in ('admin', 'user')) default 'user',
    created_at timestamptz not null default now()
);

create table if not exists public.products_catalog (
    id bigint generated always as identity primary key,
    sku text not null unique,
    name text not null,
    brand text not null,
    category text not null,
    description text not null default '',
    price numeric(12, 2) not null,
    old_price numeric(12, 2),
    image text,
    screen_size text not null default '0"',
    color text not null default '',
    ram text not null default '',
    storage text not null default '',
    nfc boolean not null default false,
    availability text not null default 'in_stock' check (availability in ('in_stock', 'warehouse', 'preorder', 'out_of_stock')),
    specs_json jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function public.touch_products_catalog_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_products_catalog_updated_at on public.products_catalog;

create trigger trg_products_catalog_updated_at
before update on public.products_catalog
for each row
execute function public.touch_products_catalog_updated_at();

alter table public.user_roles enable row level security;
alter table public.products_catalog enable row level security;

drop policy if exists "Roles self read" on public.user_roles;
create policy "Roles self read"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Products public read" on public.products_catalog;
create policy "Products public read"
on public.products_catalog
for select
to anon, authenticated
using (true);

drop policy if exists "Products admin insert" on public.products_catalog;
create policy "Products admin insert"
on public.products_catalog
for insert
to authenticated
with check (
    exists (
        select 1
        from public.user_roles r
        where r.user_id = auth.uid()
          and r.role = 'admin'
    )
);

drop policy if exists "Products admin update" on public.products_catalog;
create policy "Products admin update"
on public.products_catalog
for update
to authenticated
using (
    exists (
        select 1
        from public.user_roles r
        where r.user_id = auth.uid()
          and r.role = 'admin'
    )
)
with check (
    exists (
        select 1
        from public.user_roles r
        where r.user_id = auth.uid()
          and r.role = 'admin'
    )
);

drop policy if exists "Products admin delete" on public.products_catalog;
create policy "Products admin delete"
on public.products_catalog
for delete
to authenticated
using (
    exists (
        select 1
        from public.user_roles r
        where r.user_id = auth.uid()
          and r.role = 'admin'
    )
);
