# hostlyc-backend-adastra - arquitectura

## Propósito

API operativa NestJS para la app híbrida de laboratorio/Adastra. Resuelve flujos transaccionales: login, identidad, roles, rutas, reportes, catálogos, sincronización offline, auditoría e idempotencia.

## Stack y comandos

- NestJS 11, TypeScript, `pg`, TypeORM limitado, Swagger, bcrypt, JWT, Helmet, Excel/PDF.
- Scripts clave: `start:local`, `build`, `migrate:*`, `seed:admin:local`, `quality:size`, `test`, `test:e2e`.
- Fuente: `hostlyc-backend-adastra/package.json`.

## Arquitectura vista

El proyecto funciona como monolito modular con infraestructura transversal en `src/common` y bounded contexts en `src/modules`.

```text
src/
|-- common/
|   |-- audit/
|   |-- crypto/
|   |-- database/
|   |-- documents/
|   |-- filters/
|   |-- logging/
|   |-- mail/
|   |-- messages/
|   `-- response/
`-- modules/
    |-- auth/
    |-- catalogs/
    |-- identity/
    |-- reports/
    |-- roles/
    |-- routes/
    |-- sync/
    |-- users/
    `-- version/
```

## Responsabilidades

- `common/database`: `DatabaseRouterService`, `DatabaseRegistryService`, `TransactionService` e `IdempotencyService`.
- `common/crypto`: cifrado de payload y transporte.
- `common/audit`: bitácora append-only mediante `AuditRepository`.
- `modules/auth`: login, JWT, logout, sesión, guard `AccessTokenGuard`.
- `modules/identity`: roles, permisos y dispositivos.
- `modules/sync`: lotes offline, reconciliación, ACK `COMMITTED` y rollback si falla.
- `modules/reports`: consultas cifradas, filtros por rol/propietario/compartición, auditoría y exportación.
- `modules/catalogs`: catálogos dinámicos sin exponer SQL libre.

## Acceso a datos

Decisión documentada en `docs/ADR-002-data-access.md`: hot paths con SQL explícito y `pg`; TypeORM se queda en CRUD simple/metadata. No se introduce Prisma en esta API porque el control de SQL, transacciones, CTE, locks y `RETURNING` pesa más que la DX.

Patrón clave:

- El controlador no arma SQL.
- El servicio coordina caso de uso y auditoría.
- El repositorio concentra SQL parametrizado.
- `DatabaseRouterService` elige el uso: `OPERATIONAL`, `AUDIT`, `CMS_READ`.
- `DatabaseRegistryService` abre conexiones lazy.

## Seguridad

- SQL solo con placeholders `$1`, `$2`, arreglos tipados y enums/whitelists para fragmentos no parametrizables.
- JWT corto, bcrypt, logout con invalidación por versión de token.
- Payloads sensibles con envelope RSA-OAEP-256 + AES-256-GCM.
- Auditoría separada de logs técnicos.
- No registrar tokens, secretos, fotos, SQL sensible ni respuestas completas.
- Endpoints protegidos con `AccessTokenGuard`.
- Operaciones mutables idempotentes con `Idempotency-Key`.

## Calidad

- `quality:size` limita tamaño de archivos fuente.
- `format:check`, `lint:check`, `test`, `test:e2e`.
- ADRs obligan a comparar cambios de SQL con `EXPLAIN (ANALYZE, BUFFERS)`, p95 y memoria.
- `QUALITY_GUIDE.md` recomienda mantener `common` para infraestructura transversal, servicios para casos de uso y repositorios para consultas.

## Errores y lecciones reutilizables

- No convertir un endpoint dinámico en "ejecutor SQL"; usar claves permitidas y repositorios por caso.
- No confiar la trazabilidad solo al cliente; el sincronizador autenticado debe quedar como actor verificable.
- No borrar outbox hasta que el backend confirme `COMMITTED`.
- No mezclar logs técnicos con auditoría de negocio.

## Rutas fuente clave

- `docs/ADR-002-data-access.md`
- `docs/ADR-003-seguridad-consultas-sql.md`
- `docs/architecture/OPERATIONS_API_ARCHITECTURE.md`
- `docs/REPORTS_SECURITY_ARCHITECTURE.md`
- `docs/IDENTITY_RBAC_ARCHITECTURE.md`
- `src/common/database/*`
- `src/common/audit/audit.repository.ts`
- `src/modules/sync/*`
- `src/modules/reports/*`
