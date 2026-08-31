-- Rode este script no Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Adiciona suporte a logomarca por clinica: coluna na tabela + bucket de
-- Storage publico pra leitura, restrito a authenticated pra escrita.

alter table public.odonto_tenants add column if not exists logo_url text;

insert into storage.buckets (id, name, public)
values ('tenant-logos', 'tenant-logos', true)
on conflict (id) do nothing;

create policy "public can read tenant logos"
  on storage.objects
  for select
  to public
  using (bucket_id = 'tenant-logos');

create policy "authenticated can upload tenant logos"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'tenant-logos');

create policy "authenticated can update tenant logos"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'tenant-logos');

create policy "authenticated can delete tenant logos"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'tenant-logos');
