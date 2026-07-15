# hostlyc-backend-adastra - errores, mejoras e ideas

## Errores o riesgos vistos

- Riesgo de convertir catálogos dinámicos en consultas arbitrarias si se acepta tabla/columna desde cliente. La implementación correcta usa `CatalogKey` y whitelists.
- Riesgo de perder idempotencia si una mutación se confirma por HTTP `200` sin estado transaccional estable. La API debe responder `COMMITTED` solo después de commit.
- Riesgo de mezclar auditoría con logs técnicos. La auditoría debe ser append-only y de negocio; logs son diagnóstico.
- Riesgo de confiar en metadata de cliente para creador/sincronizador sin respaldo del actor autenticado.

## Mejoras pendientes

- Mantener comparación de SQL crítico con `EXPLAIN (ANALYZE, BUFFERS)`, p95 y memoria antes de sustituir consultas.
- Endurecer trazabilidad con credenciales de origen firmadas si la atribución del dispositivo debe tener valor probatorio.
- Mantener `Idempotency-Key` en todos los comandos mutables.
- Conservar separación controller/service/repository al crecer módulos nuevos.

## Ideas reutilizables

- API operativa como monolito modular antes que microservicios prematuros.
- Ruteo por uso de base (`OPERATIONAL`, `AUDIT`, `CMS_READ`) para desacoplar motores o conexiones sin ensuciar servicios.
- Envelope cifrado para payloads sensibles encima de TLS cuando se quiere reducir exposición accidental en logs/proxies.
- `common/messages` para textos visibles y errores sin recorrer controladores.

## Fuentes

- `docs/ADR-002-data-access.md`
- `docs/ADR-003-seguridad-consultas-sql.md`
- `docs/QUALITY_GUIDE.md`
- `src/common/database/idempotency.service.ts`
- `src/modules/catalogs/*`
- `src/modules/sync/*`
