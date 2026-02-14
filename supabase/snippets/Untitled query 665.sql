create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null
);
alter table public.contact_messages
  add column if not exists status text not null default 'new';

-- (optionnel mais propre) limiter les valeurs possibles
alter table public.contact_messages
  add constraint contact_messages_status_check
  check (status in ('new','read','archived'));

-- refresh du schema cache PostgREST
select pg_notify('pgrst', 'reload schema');

