alter table public.reservations enable row level security;

drop policy if exists "read own reservations" on public.reservations;
drop policy if exists "read own reservations by email" on public.reservations;

create policy "read own reservations by email"
on public.reservations
for select
to authenticated
using (
  lower(trim(email)) = lower(trim(auth.jwt() ->> 'email'))
);
