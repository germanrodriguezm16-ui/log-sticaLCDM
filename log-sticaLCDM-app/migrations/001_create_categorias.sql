-- 001_create_categorias.sql
-- Crea la tabla categorias usada por la app
create extension if not exists "pgcrypto";

create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text,
  description text,
  created_at timestamptz not null default now()
);

create unique index if not exists categorias_unique_lower_name on public.categorias (lower(name));
