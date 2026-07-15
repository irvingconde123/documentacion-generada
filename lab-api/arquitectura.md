# lab-api - arquitectura

## Propósito

API NestJS multi-tenant que alimenta el CMS (`Lab-CMS`) y la landing pública (`lab-frontend`). Gestiona tenants, dominios, módulos, usuarios, permisos, contenido, media, SEO, auditoría, login cifrado y rate limits.

## Stack y comandos

- NestJS 11, Prisma 7, PostgreSQL, Swagger, JWT/Passport, bcrypt, Helmet, Joi.
- Scripts clave: `start:local`, `migrate:*`, `seed:demo:local`, `inspect:demo:local`, `tenant:provision:*`, `keys:login:*`, `test`.
- Fuente: `lab-api/package.json`.

## Arquitectura vista

```text
src/
|-- common/
|   |-- authorization/
|   |-- decorators/
|   |-- filters/
|   |-- guards/
|   |-- rate-limit/
|   `-- tenant/
|-- config/
|-- database/prisma/
`-- modules/
    |-- audit/
    |-- auth/
    |-- landing/
    |-- media/
    |-- seo/
    |-- settings/
    |-- system/
    |-- users/
    `-- public/*

prisma/schema/
|-- core.prisma
|-- auth.prisma
|-- content.prisma
|-- audit.prisma
`-- security.prisma
```

## Responsabilidades

- `common/tenant`: resuelve tenant por hostname o `X-Tenant-Slug` en local, expone `CurrentTenant`, `TenantModuleGuard` y decoradores.
- `common/guards`: `CmsAuthGuard`, `PermissionsGuard`, JWT y validaciones de scope.
- `common/authorization`: permisos efectivos por rol más overrides/denials.
- `common/rate-limit`: políticas por endpoint, guard global y store en memoria.
- `modules/auth`: login CMS, llave pública, JWT, sesión y token version.
- `modules/landing`: composición, secciones, navegación, páginas y tipos de componente.
- `modules/media/settings/seo/faqs/certifications`: contenido público y CMS.
- `modules/audit`: auditoría de cambios y errores relevantes.
- `database/prisma`: cliente Prisma con adapter Postgres.

## Tenancy

El tenant se resuelve por dominio en ambientes desplegados y por `X-Tenant-Slug` en local/test. El frontend no debe decidir contenido por slug; el slug solo selecciona contexto.

Modelos Prisma:

- `Tenant`, `TenantDomain`, `TenantModule` en `core.prisma`.
- Contenido relacionado a `tenantId` en `content.prisma`.
- Accesos por tenant y permisos en `auth.prisma`.

## Interfaces, DTOs y permisos

- DTOs viven dentro de módulos y se documentan con Swagger.
- Permisos principales: `CMS_CONTENT_MANAGE`, `AUDIT_REPORT_REQUEST`, `USER_MANAGE`, `SYSTEM_ENUMS_READ`, `RATE_LIMIT_MANAGE`, `SYSTEM_ADMIN`.
- `resolveEffectivePermissions` mezcla defaults por rol, permisos adicionales y permisos denegados.
- CMS usa permisos efectivos, no solo roles.
- Backend siempre es autoridad final aunque el frontend oculte acciones.

## Seguridad

- Login con RSA-OAEP SHA-256 usando `GET /api/auth/public-key`.
- Compatibilidad temporal con password plano, marcada como migración pendiente.
- Bloqueo tras intentos fallidos y `tokenVersion` para invalidar sesiones.
- Rate limit global y por política (`auth.login`, `auth.public-key`, `cms.write`, `public.read`, etc.).
- Helmet, CORS por ambiente, `trust proxy`, Swagger con Bearer y filtros globales.
- Auditoría de errores HTTP relevantes sin exponer stack ni secretos.

## Calidad

- Prisma schemas separados por responsabilidad: core, auth, content, audit, security.
- Scripts de provisión de tenants y seeds demo.
- `reports/api-smoke-test-report.md` registra smoke tests de endpoints públicos, CMS, tenant inexistente y auditoría.
- Specs en permisos efectivos, rate-limit store, servicios de landing y controladores.

## Errores y mejoras detectadas

- `README.md` conserva mucho boilerplate de NestJS; conviene reemplazarlo por contexto real del proyecto.
- El login plano debe retirarse cuando CMS/landing estén migrados completamente a `encryptedPassword`.
- El store de rate limit en memoria sirve local/instancia única; para múltiples instancias conviene Redis o storage compartido.
- Media local es suficiente para desarrollo; producción debe usar object storage/CDN.

## Rutas fuente clave

- `frontend_cms_implementation_map.md`
- `frontend_landing_implementation_map.md`
- `login_security_rate_limit_changes.md`
- `api_documentation_notes.md`
- `api_next_steps_roadmap.md`
- `reports/api-smoke-test-report.md`
- `prisma/schema/*.prisma`
- `src/common/tenant/*`
- `src/common/guards/*`
- `src/common/authorization/*`
- `src/common/rate-limit/*`
- `src/modules/landing/*`
