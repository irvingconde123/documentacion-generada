# Patrón reutilizable: offline, sync y persistencia local

## Principio

Offline real significa que una operación local se guarda con suficiente contexto para sincronizarse después sin perder trazabilidad.

## Mutación local mínima

Cada mutación debe crear en una sola transacción:

1. Registro de dominio.
2. Versión local.
3. Estado `PENDING`.
4. Evento en outbox con `operationId`.
5. Referencias a archivos por hash, no binarios completos dentro del evento.

## ACK del servidor

No limpiar outbox con un `200` ambiguo. Limpiar solo si el backend responde un estado transaccional estable, por ejemplo `COMMITTED`.

## Idempotencia

Cada operación debe tener:

- `operationId`
- `batchId`
- `entityId`
- `baseVersion`
- `deviceId`
- `Idempotency-Key`

El backend debe poder responder el mismo ACK si recibe el mismo intento.

## Persistencia local

Patrón recomendado:

```text
StoragePort -> DexiePersistenceAdapter
            -> SqlitePersistenceAdapter
            -> HybridPersistenceRouter
```

No migrar a SQLite antes de extraer la frontera. Primero hacer que negocio y UI dependan de interfaces.

## Seguridad local

- Cifrar payloads con AES-GCM por registro.
- No guardar tokens en SQLite/IndexedDB.
- WebCrypto en web no equivale a Keystore.
- Android/iOS deben usar Keystore/Keychain.
- SQLCipher protege archivo, pero no sustituye permisos ni borrado remoto.

## Reversibilidad

Si se activa SQLite:

1. Copiar Dexie a SQLite.
2. Comparar identificadores/cantidad.
3. Activar SQLite solo si la verificación completa pasa.
4. Mantener espejo o plan de rollback mientras madura.
5. No borrar IndexedDB hasta tener evidencia de estabilidad.

## Proyectos fuente

- `hostlyc-frontend-adastra`: implementación híbrida Dexie/SQLite, sync y cache offline.
- `hostlyc-backend-adastra`: backend idempotente y transaccional.
