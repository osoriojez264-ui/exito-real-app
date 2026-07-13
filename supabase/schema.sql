-- Ejecuta esto en Supabase → SQL Editor → New query.

-- ============ TABLA: entries (reflexiones del diario) ============
create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  entry_date date not null default current_date,
  content text not null,
  created_at timestamptz not null default now(),
  unique (user_id, entry_date)
);

alter table entries enable row level security;

create policy "Users can view own entries"
  on entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on entries for update
  using (auth.uid() = user_id);

-- ============ TABLA: resources (catálogo de plantillas/PDFs/audios) ============
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  is_free boolean not null default false,
  checkout_url text,
  sort_order int not null default 0
);

alter table resources enable row level security;

create policy "Anyone can read resources"
  on resources for select
  using (true);

-- Datos de ejemplo — reemplaza checkout_url con tus links reales de Gumroad/Hotmart.
insert into resources (title, type, is_free, checkout_url, sort_order) values
  ('Revisión semanal real', 'Plantilla · Notion', true, null, 1),
  ('30 prompts de reflexión profunda', 'PDF', false, 'https://gumroad.com/l/tu-producto', 2),
  ('Cierre de semana, guiado', 'Audio · 12 min', false, 'https://gumroad.com/l/tu-producto-2', 3),
  ('Reinicio de hábitos', 'Bundle completo', false, 'https://gumroad.com/l/tu-bundle', 4);
