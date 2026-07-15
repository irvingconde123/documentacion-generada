# Estado real del proyecto

## Estado actual

- Implementado: carpeta de trabajo, contratos compartidos, contratos de sync batch/outbox/idempotencia/cifrado/sesión híbrida/DTOs operativos, API base, módulo API `sync/offline`, API pública `site` y páginas por slug, persistencia PostgreSQL/Neon para el espejo CMS usando `DATABASE_URL`, rama Neon `production_ecosistemaNegocio`, CMS con login local, selector de negocio, shell lateral izquierda desplegable con iconos y scroll responsive, edición visual de bloques con alta/baja/reordenamiento, editor de diseño separado, páginas/menú/vista espejo conectados a API, presets de laboratorio, reportes de auditoría simulados, alertas temporales, landing renderizando menú, páginas, hero, servicios, texto, galería/imágenes, métricas, organismos, misión, acreditaciones, CTA, footer y contacto desde API, y sistema híbrido web inicial con Vite/Ionic React, Capacitor/Electron base y modo offline forzado visible.
- En progreso: integración de auth/permisos reales, refinamiento UX del CMS y sistema híbrido, adopción runtime de contratos nuevos por API/sistema híbrido, plan transversal de pruebas de integracion y versionado draft/publish.
- Pendiente: SMTP real con adjunto XLSX, publicación versionada draft/publish, módulo formal de Media/upload, SEO administrable, cache incremental, query executor contextual, outbox real, idempotencia runtime, persistencia local y empaquetado nativo.
- Bloqueado: sync real y publicación productiva quedan bloqueados hasta cerrar contratos de cifrado, auth/permisos runtime, outbox/idempotencia y validación de payloads.

## Agentes activos

| Agente | Proyecto | Estado | Meta inmediata |
|---|---|---|---|
| Agente 1 - API y core | `repos/api` | Activo | Cerrar auth/permisos reales, validación runtime y preparar sync/outbox |
| Agente 2 - CMS | `repos/cms` | Activo | Formalizar Media/SEO, permisos Admin/Editor y publicación versionada |
| Agente 3 - Landing | `repos/landing` | Activo | Preparar cache incremental, SEO desde CMS y manejo formal de assets |
| Agente 4 - Sistema hibrido | `repos/sistema-hibrido` | Activo | Conectar contratos compartidos, outbox real y persistencia local |
| Agente 5 - Contratos y coordinacion | `repos/shared-contracts`, `coordinacion` | Activo | Registrar contratos, estado real, riesgos y siguientes metas |

## Plan de trabajo inmediato

1. Agente 1 agrega auth/permisos, validación runtime de payloads y formaliza cifrado.
2. Agente 2 completa Media/SEO, permisos visibles por rol y separación real de borrador/publicación.
3. Agente 1 configura SMTP real y generacion XLSX para auditoria.
4. Agente 3 agrega cache incremental y SEO desde CMS.
5. Agente 5 marca contratos aceptados cuando API/CMS/Landing/Sistema híbrido los validen.

## Validaciones

- `shared-contracts`: `npm run build`.
- `api`: `npm run build`, `npm test -- --runInBand`.
- `cms`: `npm run build`, `npm run lint`.
- `landing`: `npm run build`, `npm run lint`.
- `sistema-hibrido`: `npm run check`, `npm test`, `npm run build`.
- Integracion transversal: ejecutar `coordinacion/plan-pruebas-integracion.md` antes de promover cambios a `release`.
- UX/UI: todo cambio frontend requiere auditoría de diseño y repetición de ciclo si hay hallazgos bloqueantes.
- Smoke Neon: publicar sitio de laboratorio por API, reiniciar API y verificar que marca, menú y bloques siguen persistidos.
- Responsive CMS/Landing: auditoría UX/UI en `1366x768`, `1024x640` y `375x667`, con scroll forzado y sin overflow horizontal bloqueante.
- Auditoría UX/UI 2026-07-15: landing validada en desktop/tablet/mobile sin overflow horizontal ni elementos fuera de viewport; capturas en `logs/auditoria-final-ux`. CMS pasó build/lint y revisión de código, pero la captura autenticada por navegador quedó bloqueada por timeout operativo del dev server en esta corrida.

## Decisiones aplicadas

- Repos separados, no monorepo.
- Repos remotos privados creados en GitHub con ramas `master`, `release` y `develop`.
- Contratos compartidos como paquete independiente.
- El plan de pruebas de integracion vive en `coordinacion/plan-pruebas-integracion.md` y bloquea release cuando hay fallos criticos de cifrado, contratos, penetracion o inyeccion SQL.
- API usa Neon/PostgreSQL para conservar el espejo público CMS; conserva fallback en memoria/demo si no hay `DATABASE_OPERATIONAL_URL`.
- CMS y landing tienen fallback local para compilar sin API encendida.
- `sistema-hibrido` queda preparado con modo offline forzado, sin robar foco al primer entregable.
- El CMS ya no concentra contenido, diseño y auditoría en una sola vista: usa shell lateral izquierda y navegación por secciones.
- Los avisos de guardado/publicación desaparecen automáticamente y distinguen publicación confirmada de guardado local sin confirmación de API.
- CMS publica páginas/menú/vista espejo hacia API y landing consume `GET /v1/public/:tenantSlug/site`.
- Landing soporta menú público y páginas dinámicas por slug, por ejemplo `/servicios`.
- La API expone un primer módulo `sync/offline` para estado y ack de operaciones.
- El sistema híbrido ya tiene shell web inicial, modo offline forzado visible y base Capacitor/Electron.
- El sistema híbrido ya consume `@ecosistema/shared-contracts` para estado API sync y resumen de outbox local.
- Neon tiene rama separada `production_ecosistemaNegocio` para este ecosistema; no se debe mezclar con Adastra. El 2026-07-15 se recreó/confirmó la rama en la cuenta Neon actualmente conectada por CLI.
- API prefiere `DATABASE_URL`; `DATABASE_OPERATIONAL_URL` queda solo como compatibilidad temporal.
- La landing de laboratorio ya incorpora la estructura tomada de `Captura_*_Landing`: hero oscuro con overlays, métricas, organismos, servicios, misión, acreditaciones, CTA regulatorio, contacto y footer.

## Pendientes de alcance CMS

- Separar guardar borrador de publicar cuando exista versionado en API.
- Permitir ocultar bloques desde la UI; agregar, eliminar y reordenar ya está implementado.
- Ocultar o mover a modo avanzado los datos técnicos como `slug`, ids internos y JSON.
- Definir tokens visuales globales para primario, éxito, advertencia, error, bordes y texto secundario.
- Agregar estados vacíos/error en selección de negocio y flujos de auditoría.
- Reemplazar placeholders de `Mi cuenta`, `Usuarios`, `Media` y `SEO` por módulos reales.
- Convertir imágenes por URL en un módulo Media real con carga, biblioteca, texto alternativo y reutilización.
- Mejorar todavía más el editor espejo para modificar columnas/posiciones finas del layout sin depender de convenciones en `settings`.

## Bloqueos técnicos antes de integración real

- Auditoría visual autenticada del CMS debe repetirse cuando el dev server de `localhost:3001` responda estable en navegador; build/lint ya pasan.
- `sistema-hibrido` ya consume `@ecosistema/shared-contracts`; falta persistencia local real y envío de batches.
- API debe migrar de `SyncOperation` genérico a `CommitSyncBatchRequest`, `SyncCommitAck`, `SyncBatchStatus` y validación de `HybridSyncEnvelope`.
- Separar consumidores hacia `SaveContentPageDraftRequest`; `SaveContentPageRequest` queda solo por compatibilidad.
- Implementar runtime de `HybridSession`, `HybridSyncEnvelope`, `StoredOutboxRecordContract`, `SyncConflict` y DTOs operativos de inventario/ventas.
- Cerrar formato de cifrado: headers, algoritmo, versionado, rotación, nonce y manejo de cifrado incorrecto.
- Bloquear writes CMS/auditoría/sync hasta tener auth real, permisos por scope y validación runtime de payloads.

## Referencia Lab-CMS

- Para la prueba integrada actual, `http://localhost:3000` quedó ocupado por
  `repos/api` de este ecosistema.
- `lab-api` fue detenido temporalmente; si se vuelve a revisar `Lab-CMS`, debe
  levantarse otra vez en `3000`.
- Capturas autenticadas guardadas en `logs/screenshots/lab-cms-dashboard-desktop.png`
  y `logs/screenshots/lab-cms-dashboard-mobile.png`.
