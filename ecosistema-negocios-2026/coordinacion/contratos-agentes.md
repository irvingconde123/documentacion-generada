# Contratos compartidos

## Estado

Los contratos iniciales estan implementados en `repos/shared-contracts` version `0.1.0`.

## Agentes asignados

| Agente | Proyecto/repo | Responsabilidad principal | Puede modificar | Debe pedir revision cuando |
|---|---|---|---|---|
| Agente 1 - API y core | `repos/api` | API central, tenant, auth, permisos, publicacion, leads, sincronizacion y observabilidad | Controladores, servicios, adaptadores, tests y docs de API | Cambie contratos consumidos por CMS, landing o sistema hibrido |
| Agente 2 - CMS | `repos/cms` | Login CMS, seleccion de negocio, editor de contenido/diseno, publicacion y permisos CMS | UI CMS, server actions, clientes API, docs CMS | Necesite nuevos DTOs o cambie el formato publicado a landing/sistema |
| Agente 3 - Landing | `repos/landing` | Render publico, SEO, cache de contenido, formularios y experiencia de conversion | UI landing, cliente de contenido, formulario de leads, docs landing | Necesite datos nuevos desde CMS/API o cambie `CreateLeadRequest` |
| Agente 4 - Sistema hibrido | `repos/sistema-hibrido` | Shell web/mobile/desktop, offline-first, outbox, sync, inventario y modo offline forzado | Apps/canales, dominio compartido, storage, sync y docs offline | Necesite contratos de sync, permisos o datos operativos nuevos |
| Agente 5 - Contratos y coordinacion | `repos/shared-contracts`, `coordinacion` | Versionar DTOs/interfaces, registrar estado, resolver cruces entre agentes y mantener roadmap | Contratos compartidos, estado, decisiones y plan de trabajo | Cualquier cambio impacte mas de un proyecto |

## Reglas de frontera

- Cada agente trabaja en su repo asignado y no modifica otro repo sin dejarlo registrado aqui.
- Todo DTO nuevo o cambio de DTO empieza en `repos/shared-contracts` y se registra en esta tabla antes de implementarse.
- Los contratos quedan en estado `propuesto` hasta que API y al menos un consumidor los validen.
- El Agente 5 es responsable de marcar contratos como `aceptado`, `cambio requerido`, `obsoleto` o `en revision`.
- Si un cambio afecta a landing y sistema hibrido, el CMS no publica el cambio hasta que el contrato quede documentado.

## Criterios de validacion

Un contrato solo puede pasar a `aceptado` cuando cumple los criterios de `coordinacion/plan-pruebas-integracion.md`, incluyendo compilacion productor-consumidor, registro de version, semantica explicita de campos, manejo de errores seguro y evidencia de validacion.

## Contratos base

| Nombre | Origen | Consume | Produce | Estado | Version |
|---|---|---|---|---|---|
| TenantContext | API | Todos | API | propuesto | 0.1 |
| ContentPageResponse | CMS | Landing, sistema hibrido | API/CMS | propuesto | 0.1 |
| DesignConfigResponse | CMS | Landing, sistema hibrido | API/CMS | propuesto | 0.1 |
| LeadFormConfigResponse | CMS | Landing | API/CMS | propuesto | 0.1 |
| SaveContentPageRequest | CMS | API | CMS | propuesto | 0.1 |
| SaveDesignConfigRequest | CMS | API | CMS | propuesto | 0.1 |
| RequestAuditReportRequest | CMS | API | CMS | propuesto | 0.1 |
| RequestAuditReportResponse | API | CMS | API | propuesto | 0.1 |
| CreateLeadRequest | Landing | API | Landing | propuesto | 0.1 |
| CreateLeadResponse | API | Landing | API | propuesto | 0.1 |
| SyncOperation | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| SyncAck | API | Sistema hibrido | API | propuesto | 0.1 |
| ApiSyncStatus | API | Sistema hibrido | API | propuesto | 0.1 |
| HybridSession | API | Sistema hibrido | API | propuesto | 0.1 |
| HybridAuthState | Sistema hibrido | Sistema hibrido | Sistema hibrido | propuesto | 0.1 |
| HybridSyncEnvelope | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| CommitSyncBatchRequest | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| QuerySyncStatusRequest | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| SyncCommitAck | API | Sistema hibrido | API | propuesto | 0.1 |
| SyncBatchStatus | API | Sistema hibrido | API | propuesto | 0.1 |
| SyncConflict | API | Sistema hibrido | API | propuesto | 0.1 |
| TransportRequestEnvelope | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| TransportResponseEnvelope | API | Sistema hibrido | API | propuesto | 0.1 |
| IdempotencyOperation | Sistema hibrido | Sistema hibrido/API | Sistema hibrido | propuesto | 0.1 |
| StoredOutboxRecordContract | Sistema hibrido | Sistema hibrido | Sistema hibrido | propuesto | 0.1 |
| InventoryItemDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| SaleDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| CustomerDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| PaymentDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| StockMovementDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| EvidenceAttachmentDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| SaveContentPageDraftRequest | CMS | API | CMS | propuesto | 0.1 |
| SaveNavigationMenuRequest | CMS | API | CMS | propuesto | 0.1 |
| CmsSiteMirrorResponse | API/CMS | CMS/landing | API/CMS | propuesto | 0.1 |
| PermissionCheckRequest | API | API | CMS, sistema hibrido | propuesto | 0.1 |

## Regla

Antes de ampliar endpoints o DTOs, actualizar este documento y `repos/shared-contracts/docs/contracts.md`.

## Contratos faltantes para sistema hibrido

- Implementado en `repos/shared-contracts`: `HybridSession`, `HybridAuthState`,
  `HybridSyncEnvelope`, `StoredOutboxRecordContract`, `SyncConflict`,
  contratos de idempotencia, cifrado y DTOs operativos de inventario/ventas.
- Pendiente: API y sistema hibrido deben consumirlos y validarlos con pruebas
  de cifrado correcto/incorrecto, reconciliacion por batch e idempotencia.

## Contratos pendientes de aceptacion

- `CommitSyncBatchRequest` y `SyncBatchStatus` deben conectarse al modulo API
  `sync/offline`.
- `TransportRequestEnvelope` debe validarse con llaves, rotacion, nonce y AAD.
- `CmsSiteMirrorResponse` debe respaldar el editor espejo: paginas, menu,
  bloques, estilos y vista previa antes de publicar.

## Bloqueo de seguridad y cifrado

Ningun flujo de sincronizacion real debe pasar a `aceptado` hasta documentar formato de cifrado, validacion de payloads, permisos por scope y pruebas de cifrado correcto/incorrecto definidas en `coordinacion/plan-pruebas-integracion.md`.
