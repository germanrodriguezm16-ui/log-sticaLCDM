# Migraciones

Coloca archivos SQL numerados (por ejemplo `001_...sql`, `002_...sql`) en esta carpeta.

Flujo recomendado:
- Crear archivo SQL y confirmarlo en un PR junto al código que lo requiere.
- Añadir la secret `SUPABASE_DB_URL` en GitHub (o el URL de conexión que incluya usuario/contraseña).
- El workflow `Apply DB migrations` aplicará automáticamente los archivos en orden cuando se haga push a `main`.

Antes de ejecutar migraciones en producción, asegúrate de tener backup (pg_dump).
