-- 002_add_description.sql
-- Añade columna description si no existe (ejemplo de migración no destructiva)
alter table public.categorias
  add column if not exists description text;
