-- Rode este script no Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Projeto compartilhado "VendasLp". Tabela de clinicas personalizadas
-- (multi-tenant) do site-modelo Sorriso Vital Odontologia.
--
-- Leitura publica (anon) para renderizar a pagina de cada clinica por slug.
-- Escrita (insert/update/delete) somente para usuarios autenticados
-- (os vendedores, que logam no /admin com uma conta do Supabase Auth).

create table if not exists public.odonto_tenants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  slug text not null unique,
  clinic_name text not null,
  address text,
  phone_display text,
  primary_color text not null default '#0f9b8e',
  specialty_keys text[] not null default array[]::text[]
);

alter table public.odonto_tenants enable row level security;

create policy "anyone can read tenants"
  on public.odonto_tenants
  for select
  to anon, authenticated
  using (true);

create policy "authenticated can insert tenants"
  on public.odonto_tenants
  for insert
  to authenticated
  with check (true);

create policy "authenticated can update tenants"
  on public.odonto_tenants
  for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can delete tenants"
  on public.odonto_tenants
  for delete
  to authenticated
  using (true);

-- Mantem updated_at em dia a cada alteracao.
create or replace function public.odonto_tenants_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.odonto_tenants;
create trigger set_updated_at
  before update on public.odonto_tenants
  for each row execute function public.odonto_tenants_set_updated_at();
