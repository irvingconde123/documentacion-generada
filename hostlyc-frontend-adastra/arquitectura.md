# hostlyc-frontend-adastra - arquitectura

## Propósito

App offline/híbrida Adastra para operaciones de laboratorio. Corre como web/PWA, Android con Capacitor y escritorio con Electron.

## Stack y comandos

- Angular 20, Ionic 8, Capacitor 8, Dexie/IndexedDB, SQLite nativo, Electron.
- Scripts clave: `start:local`, `build:local`, `build:android`, `release:apk`, `release:desktop`, `quality:size`, `test`.
- Fuente: `hostlyc-frontend-adastra/package.json`.

## Arquitectura vista

Arquitectura por capas:

```text
src/app/
|-- core/
|   |-- auth/
|   |-- config/
|   |-- crypto/
|   |-- http/
|   |-- metrics/
|   |-- network/
|   |-- storage/
|   |-- sync/
|   `-- theme/
|-- data-access/
|   |-- catalogs/
|   |-- adapters/
|   |-- models/
|   |-- repositories/
|   `-- sources/
|-- features/
|-- shared/
`-- styles/
```

La UI trabaja contra servicios/facades y señales; no decide si el dato viene de red, IndexedDB o SQLite.

## Responsabilidades

- `core/auth`: sesión, roles, permisos, guards y navegación por contexto.
- `core/crypto`: cifrado local y cifrado de transporte.
- `core/storage`: `StoragePort`, Dexie, SQLite y router híbrido.
- `core/sync`: outbox, sincronización, reconciliación y recuperación automática.
- `core/network`: conectividad real y modo offline forzado.
- `data-access/catalogs`: catálogo dinámico con fuente local y remota.
- `features/capture`: captura offline, borradores y evidencias.
- `features/reports`: caché cifrada de reportes por rol.

## Data-access local/CMS/API

Patrón documentado en `docs/architecture/DYNAMIC_DATA_ACCESS.md`:

```text
Vista -> CatalogService -> CatalogRepository -> LocalCatalogSource
                                `-> GenericDataRepository -> TransportCryptoService -> API
```

El backend valida `CatalogKey` contra whitelist. Esto permite flexibilidad sin exponer tablas, columnas o SQL desde el cliente.

Para diseño visual:

- `DesignLocalSource`: fallback local compilado.
- `DesignCmsApiSource`: tema desde CMS/API.
- `DesignBootstrapRepository`: selecciona fuente según `environment.designSource`.
- `RuntimeConfigService` centraliza comportamiento de runtime.

## Offline, sync y persistencia

Modelo local-first:

- Mutación crea entidad, versión local, estado `PENDING` y evento en `sync_outbox`.
- Archivos se referencian por hash, no se meten completos en la operación.
- Outbox solo se limpia con ACK completo del backend.
- Backoff/reintento se separa de errores no recuperables.

Persistencia:

- Android/iOS: SQLite/SQLCipher para identidades operacionales.
- Web: IndexedDB con cifrado por registro.
- Electron: SQLite/SQLCipher previsto.
- `HybridPersistenceRouter` decide Dexie vs SQLite.
- `HybridStorageMigrationService` copia, verifica identificadores y activa SQLite solo si la migración es completa.

## Seguridad

- AES-GCM por registro y blobs.
- Tokens no se persisten en SQLite/IndexedDB.
- WebCrypto/IndexedDB sirve para web/prototipo, pero producción móvil requiere Keystore/Keychain.
- Android usa `SecureSqliteSecretPlugin` y evita exponer frase SQLCipher al bridge JS.
- `allowBackup=false` evita restaurar DB sin llave.
- Cliente oculta acciones por permisos, pero API revalida todo.

## Calidad

- `quality:size` para evitar archivos fuente grandes.
- Specs sobre sync, storage híbrido, schema SQLite y cachés.
- Documentos de rollback/migración evitan cambios irreversibles.
- Guías de diseño centralizan tokens y evitan CSS arbitrario desde CMS.

## Errores y lecciones reutilizables

- Antes de migrar a SQLite, extraer `StoragePort`; cambiar motor no debe reescribir negocio.
- No guardar tokens, passwords, request/response completos ni stacks en storage local.
- No permitir CSS libre desde CMS; usar tokens y variantes conocidas.
- Un modo offline real necesita outbox idempotente y ACK transaccional, no solo `localStorage`.

## Rutas fuente clave

- `docs/architecture/FRONTEND_HYBRID_ARCHITECTURE.md`
- `docs/architecture/OFFLINE_SYNC_AND_SECURITY.md`
- `docs/architecture/DYNAMIC_DATA_ACCESS.md`
- `docs/storage/hybrid-sqlite-indexeddb-design.md`
- `docs/storage/hybrid-storage-operations.md`
- `src/app/core/storage/*`
- `src/app/core/sync/*`
- `src/app/data-access/catalogs/*`
- `src/app/core/theme/theme.service.ts`
