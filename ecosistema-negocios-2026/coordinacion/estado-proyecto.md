# Estado real del proyecto

## Estado actual

- Implementado: carpeta de trabajo, contratos compartidos, contratos de sync batch/outbox/idempotencia/cifrado/sesión híbrida/DTOs operativos, API base, módulo API `sync/offline`, API pública `site` y páginas por slug, persistencia PostgreSQL/Neon para el espejo CMS usando `DATABASE_URL`, endpoints API reales para Mi cuenta, Usuarios y Media por URL/metadatos con validación runtime de `requestedByUserId`/rol/tenant, SMTP real para reportes de auditoría con adjunto CSV, guía Gmail SMTP, rama Neon `production_ecosistemaNegocio`, CMS con login local, selector de negocio, shell lateral izquierda desplegable con iconos y scroll responsive, edición visual de bloques con alta/baja/reordenamiento, editor de diseño separado, SEO básico por página, páginas/menú/vista espejo conectados a API, menú con páginas internas/URL externa/PDF descargable, selector de Media para enlaces descargables, presets de laboratorio, reportes de auditoría simulados o SMTP según variables, alertas temporales, Mi cuenta editable, gestión local de usuarios por correo único e inmutable, contraseña temporal en modo prueba local, biblioteca Media por URL o archivo local pequeño `data:` como fallback, Vista espejo visual tipo landing con preview arriba en móvil y marco escalado en escritorio, edición inline desde Vista espejo para textos, listas, colores, imagen principal/galería, mover y quitar secciones, CMS leyendo el mismo espejo `/site` que la landing, landing renderizando menú, páginas, hero, servicios, texto, galería/imágenes, métricas, organismos, misión, acreditaciones, CTA, footer, contacto y metadata SEO desde API, orden de secciones publicado por CMS, repositorios remotos de documentación creados en GitHub, y sistema híbrido web inicial con Vite/Ionic React, Capacitor/Electron base y modo offline forzado visible.
- En progreso: integración de auth/login real, SMTP real para temporales, refinamiento UX del CMS y sistema híbrido, adopción runtime de contratos nuevos por sistema híbrido, plan transversal de pruebas de integracion y versionado draft/publish.
- Pendiente: SMTP real para contrasenas temporales, adjunto XLSX opcional para auditoria, publicación versionada draft/publish, upload real de Media con storage binario, cache incremental, query executor contextual, outbox real, idempotencia runtime, persistencia local y empaquetado nativo.
- Bloqueado: sync real y publicación productiva quedan bloqueados hasta cerrar contratos de cifrado, auth/permisos runtime, outbox/idempotencia y validación de payloads.

## Agentes activos

| Agente | Proyecto | Estado | Meta inmediata |
|---|---|---|---|
| Agente 1 - API y core | `repos/api` | Activo | Cerrar auth/permisos reales, validación runtime y preparar sync/outbox |
| Agente 2 - CMS | `repos/cms` | Activo | Conectar auth/permisos reales, upload Media y publicación versionada |
| Agente 3 - Landing | `repos/landing` | Activo | Preparar cache incremental y manejo formal de assets |
| Agente 4 - Sistema hibrido | `repos/sistema-hibrido` | Activo | Conectar contratos compartidos, outbox real y persistencia local |
| Agente 5 - Contratos y coordinacion | `repos/shared-contracts`, `coordinacion` | Activo | Registrar contratos, estado real, riesgos y siguientes metas |

## Plan de trabajo inmediato

1. Agente 1 agrega auth/permisos, validación runtime de payloads y formaliza cifrado.
2. Agente 2 conecta Mi cuenta/Usuarios/Media a los endpoints API reales, permisos visibles por rol y separación real de borrador/publicación.
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
- Auditoría UX/UI 2026-07-15: landing validada en desktop/tablet/mobile sin overflow horizontal ni elementos fuera de viewport; capturas en `logs/auditoria-final-ux`. CMS validado por navegador en `1366x768` y `390x844`, sin overflow horizontal móvil, con capturas en `logs/screenshots/cms-account-users-media`. Nueva auditoría CMS/Landing: menú externo/PDF, anclas, orden de secciones y ocultamiento de títulos invisibles validado en `logs/screenshots/cms-menu-parity`. Vista espejo auditada por agente UX y Playwright temporal: capturas en `logs/screenshots/cms-mirror-1to1`; se corrigió recorte desktop, preview móvil demasiado abajo y nombres técnicos visibles. Media/PDF validado en `logs/screenshots/cms-media-menu`: documento guardado en Media, elegido en menú, publicado a API y visible en landing con atributo `download`.
- Validación 2026-07-17: Vista espejo inline validada con CMS `4200`, API `3000` y landing `3100`; capturas en `logs/screenshots/cms-inline-mirror`. Resultado: 18 textos editables, 2 controles de color, controles de imagen/listas, botones de subir/bajar/quitar, publicación confirmada, landing visible y sin overflow horizontal móvil.
- Validación 2026-07-17: renderer compartido y editor humano de listas validados con `npm run lint/build` en CMS y landing; capturas en `logs/screenshots/cms-shared-renderer`. Resultado: `@ecosistema/site-renderer` alimenta CMS Vista espejo y landing, el editor tradicional queda colapsable, y acreditaciones/listas se editan por tarjetas con campos separados.
- Validación 2026-07-17: API/CMS admin reforzados con permisos runtime y SMTP de auditoría. Comandos: `repos/api npm run build`, `npm test -- --runInBand`, `npm run test:e2e -- --runInBand`, `repos/cms npm run lint`, `npm run build`. Resultado: API exige actor activo por tenant/rol; CMS manda `requestedByUserId`; Media acepta URL pública o archivo local pequeño como fallback documentado.
- Validación 2026-07-17: reporte de auditoría SMTP enviado realmente a `irving.condem@gmail.com`. Antes del envío se generó preview local en `logs/audit-reports`, agente backend/security aprobó CSV/HTML sin secretos, y Gmail SMTP respondió `250 OK`. Vista espejo corrigió paneles inline para que no usen `absolute/z-index` ni se encimen sobre otros controles.
- Validación 2026-07-20: prueba real `Hostlyc Clone Test`. Se creó `repos/landing-hostlyc`, se provisionó tenant `hostlyc-clon`, se levantó landing en `3101`, CMS en `4200` y API en `3000`. El renderer compartido se corrigió para separar modo público de `cms-preview`; el público ya no muestra `Vista previa publicada`, `Editar servicios` ni controles editoriales. Builds ejecutados: `repos/site-renderer npm run check/build`, `repos/cms npm run build`, `repos/landing npm run build`, `repos/landing-hostlyc npm run build`. Smoke API: `scripts/run-hostlyc-cms-smoke.mjs` generó 16 eventos de auditoría, 5 backups y reporte local `logs/audit-reports/auditoria-hostlyc-clon-2026-07-20T20-06-01-238Z.xlsx`. Capturas en `logs/screenshots/hostlyc-clone-test`.
- Auditoría UX/UI 2026-07-20: no se puede clonar `https://hostlyc.com/` al 100% usando solo CMS todavía. Aunque CMS/API publican texto, media, menú, PDF y diseño, el renderer conserva composición y textos de laboratorio (`Laboratorio profesional`, `Solicitar análisis`, métricas flotantes, `Ver acreditaciones`). Se requiere generalizar contratos y renderer por variantes de sección.
- Entregable 1 Hostlyc cerrado 2026-07-20: contratos compartidos documentan settings de variantes (`layout`, `variant`, `theme`, `richText`, `cards`, `steps`, `faq`, `cta`, `flags`), API prueba que los preserva en site mirror, y `@ecosistema/site-renderer` renderiza variantes comerciales para hero centrado, servicios claros, proyectos, nosotros, proceso, FAQ, contacto y footer. Hallazgos UX corregidos: se eliminaron textos internos de tester, copy de laboratorio/listas de laboratorio y se reforzo jerarquia del H1 con `clamp()`. Evidencia final: `logs/screenshots/hostlyc-clone-test/landing-hostlyc-deliverable-1-final2-desktop.png` y `landing-hostlyc-deliverable-1-final2-mobile.png`. HTML publico verificado sin `Clone Test`, `tester`, `referencia publica` ni textos de laboratorio.
- Entregable 2 Hostlyc cerrado como primera version operable 2026-07-21: CMS permite agregar `Plantilla comercial tipo Hostlyc` desde Contenido del sitio y Vista espejo, con presets visibles para inicio comercial, servicios, proyectos, acerca del negocio, proceso, FAQ, contacto y footer. Se agregaron etiquetas humanas para editar listas sin JSON y se corrigieron paneles inline de Vista espejo para que crezcan en flujo normal y no se encimen ni oculten contenido. Auditoria de diseño detecto controles de seccion cortados en el borde derecho; se corrigieron alineandolos dentro del lienzo, con labels accesibles por seccion, copy de ayuda mas claro y `Color principal`/`Color de apoyo`. Validaciones: `repos/site-renderer npm run check/build`, `npm pack`, `repos/cms npm run lint/build`, Playwright en CMS `4200` con negocio `Hostlyc Clone Test`. Evidencias: `logs/screenshots/cms-commercial-controls/desktop-mirror-commercial-controls-hostlyc-fixed.png` y `mobile-mirror-commercial-controls-hostlyc-fixed.png`. Resultado automatico: aparecen `Plantilla comercial tipo Hostlyc`, `Aplicar plantilla comercial` y `Color principal`; mobile sin overflow horizontal.
- Revalidacion tester 2026-07-21: el tester rechazo inicialmente por bloqueo de navegacion hacia `Vista espejo`; la UI podia mostrar hover/seleccion en el menu pero quedarse en `Resumen`, y mobile no tenia ruta alternativa clara. Se corrigio el CMS para usar enlaces reales `?section=...`, estado inicial server-side por querystring y menu nativo mobile `Ir a otra seccion`. Evidencias de fix: `logs/screenshots/cms-commercial-controls/direct-section-mirror-2026-07-21.png`, `sidebar-section-mirror-2026-07-21.png` y `mobile-section-mirror-native-menu-2026-07-21.png`. Reporte: `coordinacion/reportes-tester/cms-commercial-controls-2026-07-21.md`.

## Decisiones aplicadas

- Repos separados, no monorepo.
- Repos remotos privados creados en GitHub con ramas `master`, `release` y `develop`.
- Contratos compartidos como paquete independiente.
- El plan de pruebas de integracion vive en `coordinacion/plan-pruebas-integracion.md` y bloquea release cuando hay fallos criticos de cifrado, contratos, penetracion o inyeccion SQL.
- API usa Neon/PostgreSQL para conservar el espejo público CMS; conserva fallback en memoria/demo si no hay `DATABASE_OPERATIONAL_URL`.
- CMS y landing tienen fallback local para compilar sin API encendida.
- CMS carga inicialmente desde `GET /v1/public/:tenantSlug/site`; con API arriba, Contenido, Paginas/menu y Vista espejo parten de la misma verdad que la landing.
- La landing respeta el orden de bloques publicado. `metricStrip` y `logoStrip`
  ya no son forzados arriba por el renderer.
- El menú normaliza `Servicios`, `Acreditaciones` y `Contacto` a anclas cuando
  apuntan a la home, y conserva enlaces externos/PDF con `linkType`.
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
- SEO básico por página ya se transporta en `page.seo` y la landing lo usa en `generateMetadata`.
- `documentación_generada` quedó conectado a `https://github.com/irvingconde123/documentacion-generada` como repositorio público.
- `coordinacion` quedó conectado a `https://github.com/irvingconde123/ecosistema-negocios-2026-docs` como repositorio privado.
- API admin CMS nuevo: `GET/PATCH /v1/cms/:tenantSlug/account/:userId`, `GET/POST/PATCH /v1/cms/:tenantSlug/users`, temporales en `/password/temporary`, y `GET/POST/PUT/DELETE /v1/cms/:tenantSlug/media`.
- Renderer compartido nuevo: `repos/site-renderer`, remoto `https://github.com/irvingconde123/ecosistema-site-renderer`, consumido por CMS y landing mediante paquete local.
- La documentación relevante de este proyecto debe sincronizarse también en `C:\Users\irvin\OneDrive\Escritorio\documentación_generada\ecosistema-negocios-2026` antes de cerrar una función.

## Pendientes de alcance CMS

- Separar guardar borrador de publicar cuando exista versionado en API.
- Permitir ocultar bloques desde la UI; agregar, eliminar y reordenar ya está implementado.
- Refinar Vista espejo inline: agregar indicador de cambios sin guardar.
- Ocultar o mover a modo avanzado los datos técnicos como `slug`, ids internos y JSON.
- Definir tokens visuales globales para primario, éxito, advertencia, error, bordes y texto secundario.
- Agregar estados vacíos/error en selección de negocio y flujos de auditoría.
- Convertir Media por URL/metadatos en carga real de archivos con selector reutilizable en hero, galería, SEO y perfil.
- Publicar `@ecosistema/site-renderer` como paquete interno versionado en vez de depender de tarball local.
- Revisar claims comerciales/regulatorios antes de publicar sitios reales: porcentajes, volumen anual, acreditaciones y aceptación por autoridades requieren evidencia.
- Mejorar todavía más el editor espejo para modificar columnas/posiciones finas del layout sin depender de convenciones en `settings`.
- Refinar plantilla `Agencia digital / Hostlyc`: cambiar color de fragmentos arbitrarios de texto desde CMS, no solo mediante `highlight`.
- Extender CMS/API para controlar `theme`, `richText`, `cards`, `steps`, `faqItems`, `ctaActions`, `showImage`, `showMetrics`, modales, WhatsApp y validacion visible de enlaces rotos.
- Agregar al provisioning una UI de negocio nuevo: nombre, slug, plantilla, usuario admin y URL de landing generada. Hoy existe script base, falta experiencia de un clic.
- Ejecutar plan de entregables Hostlyc en `coordinacion/plan-trabajo-hostlyc-cms.md`; siguiente prioridad: provisioning de negocio nuevo en un clic y acciones avanzadas de Media/botones.

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
