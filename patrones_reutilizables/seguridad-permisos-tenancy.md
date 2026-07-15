# Patrón reutilizable: seguridad, permisos y tenancy

## Tenancy

Regla: el tenant se resuelve en backend. El frontend puede enviar `X-Tenant-Slug` solo en local/test; en stage/prod se resuelve por hostname/dominio.

No hacer:

- Condicionar contenido por `tenant.slug` en frontend.
- Permitir cambiar tenant sin limpiar o revalidar sesión.
- Mezclar datos de tenants en caches sin clave por tenant.

## Permisos

Usar permisos efectivos:

```text
rol base + permisos adicionales - permisos denegados = permisos efectivos
```

El frontend usa permisos para navegación/UX; el backend valida en cada endpoint.

## Guards recomendados

Backend:

- Auth guard.
- Scope guard si existen apps distintas (`CMS`, público, operativo).
- Permissions guard.
- Tenant module guard.
- Rate limit guard.

Frontend:

- Auth guard.
- Permission guard.
- Tenant selection guard.
- Module guard.

## Login y credenciales

Patrón visto en `lab-api`/`Lab-CMS`:

1. Frontend pide llave pública: `GET /api/auth/public-key`.
2. Cifra password con RSA-OAEP SHA-256.
3. Envía `kid` + `encryptedPassword`.
4. API valida, devuelve Bearer token y usuario/permisos.

Notas:

- Esto no reemplaza HTTPS.
- Evita exposición accidental en logs/proxies internos.
- Password plano debe ser solo compatibilidad temporal.

## Rate limit

Políticas por ruta:

- Login más restrictivo.
- Public key con límite propio.
- CMS write limitado.
- Public read más permisivo.
- Fallback global.

Para múltiples instancias, no usar memoria local: mover a Redis/storage compartido.

## Auditoría

Separar:

- Logs técnicos: diagnóstico sin PII/secrets.
- Auditoría: actor, tenant, acción, entidad, antes/después sanitizado, estado, requestId.

No registrar:

- Tokens.
- Passwords.
- Llaves privadas.
- Payloads sensibles completos.
- Stacks visibles al usuario.

## Proyectos fuente

- `lab-api`: tenancy, permisos, rate limit, login cifrado.
- `hostlyc-backend-adastra`: auditoría, idempotencia, SQL seguro y JWT operativo.
- `Lab-CMS`: guards/interceptors frontend.
