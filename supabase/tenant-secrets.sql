create table if not exists public.odonto_tenant_secrets (
  tenant_id uuid primary key references public.odonto_tenants(id) on delete cascade,
  booking_api_token text not null,
  booking_admin_id integer,
  booking_admin_email text,
  created_at timestamptz not null default now()
);

alter table public.odonto_tenant_secrets enable row level security;

create policy "authenticated can read tenant secrets"
  on public.odonto_tenant_secrets for select to authenticated
  using (true);

create policy "authenticated can insert tenant secrets"
  on public.odonto_tenant_secrets for insert to authenticated
  with check (true);

create policy "authenticated can update tenant secrets"
  on public.odonto_tenant_secrets for update to authenticated
  using (true);

create policy "authenticated can delete tenant secrets"
  on public.odonto_tenant_secrets for delete to authenticated
  using (true);
