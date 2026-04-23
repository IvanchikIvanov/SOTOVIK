-- Two-tier admin model:
--   superadmin — edit + add + DELETE products
--   editor     — edit + add (no delete)
--
-- Legacy 'admin' role (from 20260421_zaberg_admin.sql) is treated as superadmin.
-- Regular 'user' rows are kept for back-compat but have no admin rights.

-- 1. Widen the role enum to include the new values.
alter table public.user_roles
    drop constraint if exists user_roles_role_check;

alter table public.user_roles
    add constraint user_roles_role_check
    check (role in ('superadmin', 'editor', 'admin', 'user'));

-- 2. Helper predicates so policies stay readable.
create or replace function public.is_editor_or_above(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1 from public.user_roles r
        where r.user_id = uid
          and r.role in ('superadmin', 'editor', 'admin')
    );
$$;

create or replace function public.is_superadmin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1 from public.user_roles r
        where r.user_id = uid
          and r.role in ('superadmin', 'admin')
    );
$$;

-- 3. Replace existing product policies so editor can write but only superadmin can delete.
drop policy if exists "Products admin insert" on public.products_catalog;
create policy "Products editor insert"
on public.products_catalog
for insert
to authenticated
with check ( public.is_editor_or_above(auth.uid()) );

drop policy if exists "Products admin update" on public.products_catalog;
create policy "Products editor update"
on public.products_catalog
for update
to authenticated
using ( public.is_editor_or_above(auth.uid()) )
with check ( public.is_editor_or_above(auth.uid()) );

drop policy if exists "Products admin delete" on public.products_catalog;
create policy "Products superadmin delete"
on public.products_catalog
for delete
to authenticated
using ( public.is_superadmin(auth.uid()) );

-- 4. Convenience RPC: grant a role to a user identified by email.
-- Call from SQL console:   select public.grant_admin_role('boss@example.com', 'superadmin');
create or replace function public.grant_admin_role(user_email text, new_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
    target_id uuid;
begin
    if new_role not in ('superadmin', 'editor') then
        raise exception 'Invalid role %, expected superadmin or editor', new_role;
    end if;

    select id into target_id from auth.users where email = user_email;
    if target_id is null then
        raise exception 'No auth user with email %', user_email;
    end if;

    insert into public.user_roles (user_id, role)
    values (target_id, new_role)
    on conflict (user_id) do update set role = excluded.role;
end;
$$;

revoke all on function public.grant_admin_role(text, text) from public, anon, authenticated;
