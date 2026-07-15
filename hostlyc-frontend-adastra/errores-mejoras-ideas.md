# hostlyc-frontend-adastra - errores, mejoras e ideas

## Errores o riesgos vistos

- Migrar a SQLite sin una frontera tipo `StoragePort` habría obligado a reescribir servicios de negocio.
- Guardar tokens, passwords, request/response completos o stacks en storage local rompería el modelo de seguridad.
- Usar CSS libre desde CMS permitiría romper layout o abrir vectores de abuso visual/inyección.
- Ocultar botones por permisos en el cliente no sustituye validación de API.
- Cambiar a SQLite sin rollback verificado puede dejar instalaciones en un estado no recuperable.

## Pendientes antes de producción

- Probar SQLite/híbrido en Android físico con instalación limpia, actualización, reinicio, modo avión y pérdida de red.
- Probar intercambio real de borradores entre usuarios y revisar auditoría de creador/sincronizador.
- Aplicar migración backend `012_sync_provenance` en entorno controlado antes de publicar APK que envíe `createdByUserId`.
- Usar Android Keystore/Keychain hardware-backed para llaves en producción móvil.
- Migrar colores históricos directos en features a tokens del sistema visual.

## Mejoras futuras

- Refresh tokens rotatorios y revocación por dispositivo.
- MFA para roles sensibles.
- Políticas MDM o borrado remoto si el contexto operativo lo exige.
- Expandir módulos pendientes: recepción, laboratorio, incidencias y resultados.
- Mejorar métricas dinámicas, filtros autoaplicables, auditoría y reportes.

## Ideas reutilizables

- `StoragePort` + adapters por motor antes de cualquier migración de persistencia.
- `HybridPersistenceRouter` con verificación de identificadores antes de activar SQLite.
- Outbox local con batch/operation IDs y limpieza solo por ACK confirmado.
- Backups portables cifrados para continuidad operativa entre dispositivos.

## Fuentes

- `docs/storage/hybrid-sqlite-indexeddb-design.md`
- `docs/storage/hybrid-storage-operations.md`
- `docs/AUTH_OFFLINE_BACKUP.md`
- `docs/architecture/RESILIENT_SYNC_AND_RUNTIME_CONFIG.md`
- `docs/project-history/ROADMAP.md`
- `docs/project-history/notas3.md`
- `docs/project-history/notas4.md`
