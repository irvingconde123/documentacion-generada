# Estado real del proyecto

## Estado actual

- Implementado: carpeta de trabajo, contratos compartidos, contratos de sync batch/outbox/idempotencia/cifrado/sesión híbrida/DTOs operativos, API base, módulo API `sync/offline`, API pública `site` y páginas por slug, persistencia PostgreSQL/Neon para el espejo CMS usando `DATABASE_URL`, endpoints API reales para Mi cuenta, Usuarios y Media por URL/metadatos con validación runtime de `requestedByUserId`/rol/tenant, base dinámica de storage Media con estado/preparación de upload para `disabled`/S3/Firebase/custom, SMTP real para reportes de auditoría con adjunto CSV, guía Gmail SMTP, rama Neon `production_ecosistemaNegocio`, CMS con login local, selector de negocio, shell lateral izquierda desplegable con iconos y scroll responsive, edición visual de bloques con alta/baja/reordenamiento, editor de diseño separado, SEO básico por página, páginas/menú/vista espejo conectados a API, menú con páginas internas/URL externa/PDF descargable, selector de Media para enlaces descargables, presets de laboratorio, reportes de auditoría simulados o SMTP según variables, alertas temporales, Mi cuenta editable, gestión local de usuarios por correo único e inmutable, contraseña temporal en modo prueba local, biblioteca Media por URL o archivo local pequeño `data:` como fallback, Vista espejo visual tipo landing con preview arriba en móvil y marco escalado en escritorio, edición inline desde Vista espejo para textos, listas, colores, imagen principal/galería, mover y quitar secciones, CMS leyendo el mismo espejo `/site` que la landing, landing renderizando menú, páginas, hero, servicios, texto, galería/imágenes, métricas, organismos, misión, acreditaciones, CTA, footer, contacto y metadata SEO desde API, orden de secciones publicado por CMS, repositorios remotos de documentación creados en GitHub, y sistema híbrido web inicial con Vite/Ionic React, Capacitor/Electron base y modo offline forzado visible.
- En progreso: integración de auth/login real, SMTP real para temporales, refinamiento UX del CMS y sistema híbrido, adopción runtime de contratos nuevos por sistema híbrido, plan transversal de pruebas de integracion y versionado draft/publish.
- Pendiente: SMTP real para contrasenas temporales, adjunto XLSX opcional para auditoria, publicación versionada draft/publish, adaptadores reales de Media para S3/Firebase/custom, upload binario desde CMS contra proveedor configurado, cache incremental, query executor contextual, outbox real, idempotencia runtime, persistencia local y empaquetado nativo.
- Bloqueado: sync real y publicación productiva quedan bloqueados hasta cerrar contratos de cifrado, auth/permisos runtime, outbox/idempotencia y validación de payloads.

## Hostlyc Sprint 1 - Corte Vertical

Estado 2026-07-27:

- Implementado: `hostlyc-vpc-front`, `hostlyc-api-back` y
  `hostlyc-data-access` como repositorios independientes y arquitectura
  hexagonal.
- Validado: 41 pruebas de repositorio y smoke integrado de 10 checks.
- Publicado: repos privados con `master`, `release`, `develop`,
  `feat/s1-foundation` y PR draft #1 hacia `develop`.
- Completado: JWT/permisos en VPC, firma HMAC entre servicios,
  `StoreRepositoryPort`, provisioning idempotente `prv_<ULID>`, catalogo
  allowlisted, SQL en archivos y adaptadores memory/PostgreSQL.
- Pendiente: PostgreSQL real, replay store, rate limit distribuido, route
  catalog persistido, outbox/worker y entitlements.
- Evidencia: `coordinacion/sprints/hostlyc-sprint-1/evidencias.md`.

## Hostlyc Sprint 2 - Seguridad, Neon Y CMS

Estado 2026-07-27:

- Implementado: ramas `hostlyc_reestructuracion`, soporte seguro de
  `DATABASE_URL`, runner de migraciones con checksum y HMAC v2.
- Validado: conexion, migracion y smoke integrado contra Neon; diez requests
  concurrentes produjeron una fila y el fixture se elimino.
- Corregido: caller, actor y permisos ya forman parte de la firma interna.
- Decidido: VPC es ingress unico; API Back es autoridad de Identity/tenant;
  `repos/api` se reutiliza solo como servicio interno por `CmsContentPort`.
- Auditada: la cookie Base64, passwords locales, actores en payload, tenant
  sintetico y fallback demo no son compatibles con produccion.
- Pendiente: IAM, memberships, roles, permisos, entitlements, tenant canonico,
  adaptador de contenido, draft/publish, replay store y CMS BFF seguro.
- Evidencia: `coordinacion/sprints/hostlyc-sprint-2/evidencias.md`.

### Corte De Correo De Invitaciones

- Implementado: SMTP real detras de `InvitationDeliveryPort`, plantilla Hostlyc
  texto/HTML, envio y reenvio, y ruta de canje en el front padre.
- Validado: crear, reenviar y revocar por VPC con correos reales; 26 eventos
  exitosos por corrida entre VPC, API Back y Data Access.
- Seguridad: el canje exige sesion del correo destino, es de un uso, expira y
  no expone API Back. `tokenHash` queda redactado en auditoria.
- Calidad: API Back 76 pruebas, Data Access 86 y front padre 39; builds y limite
  de 300 lineas aprobados.
- Pendiente: outbox/reintentos del proveedor y gestion visual conectada desde
  el CMS.

### Corte CMS Hostlyc E Hidratacion

Estado 2026-07-28:

- Corregido: la cuenta del propietario autentica por VPC y administra el
  negocio canónico Hostlyc con membresia `owner`.
- Corregido: el CMS aprovisiona workspaces por `tenantSlug` y no mezcla el
  contenido demo de otro tenant.
- Implementado: `hostlyc-parent-web -> VPC -> API Back -> CMS` para
  `HomeContent` estructurado, sin HTML ejecutable.
- Validado: cambio editorial visible en `4400` sin redespliegue y fallback
  local al detener CMS.
- Calidad CMS: lint, build y 77 archivos TypeScript dentro del limite de 300
  lineas; commit `7d8fcf0` publicado en `hostlyc_reestructuracion`.
- Responsive: editor y front aprobados en 390x844, 768x1024 y 1440x900; cero
  elementos fuera del viewport en la medicion final.
- Evidencia:
  `coordinacion/reportes-tester/e2e-cms-hostlyc-hidratacion-2026-07-28.md`.

### Editor CMS Del Front Padre

Estado 2026-07-28:

- Corregido: `Mi sitio` reconoce el tipo inmutable `hostlyc-parent` y deja de
  usar el preview genérico de landings para el tenant canónico.
- Implementado: edición completa de aviso, hero, confianza, servicios, pasos,
  planes, FAQ y CTA final con validación de payload.
- Implementado: preview del front real `4400` dentro del CMS y recarga después
  de publicar.
- Corregido: la raíz del front padre es dinámica y recibe cambios CMS en la
  siguiente solicitud, sin build ni redespliegue.
- Validado: publicación reversible CMS -> VPC -> front, responsive 390x844 y
  1440x900, sin overflow ni errores de consola.
- Evidencia:
  `coordinacion/reportes-tester/cms-editor-front-padre-real-2026-07-28.md`.

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
- Validación 2026-07-21: base dinámica de storage Media. Contratos compartidos agregan tipos `CmsStorage*`, modo `not_implemented` y metadata opcional en `CmsMediaItem`; API expone `GET /v1/cms/:tenantSlug/storage/status` y `POST /v1/cms/:tenantSlug/storage/uploads`; CMS muestra estado de almacenamiento en Media y diferencia `Enlace público` de `Solo en este CMS`. Agentes UX/UI e integrador marcaron como bloqueante no devolver URLs placeholder; se corrigió para que S3/Firebase/custom no respondan `ready` hasta tener adaptador real. Comandos: `repos/shared-contracts npm run check/build`, `repos/api npm run build`, `npm test -- --runInBand`, `npm run test:e2e -- --runInBand`, `repos/cms npm run lint/build`. Playwright CMS `4200` validó Media sin overflow horizontal desktop/mobile; capturas en `logs/screenshots/cms-storage/cms-media-storage-dynamic-desktop-fixed.png` y `cms-media-storage-dynamic-mobile-fixed.png`. Documento operativo: `coordinacion/storage-media.md`.
- Auditoria UX/tester 2026-07-26: antes de continuar storage, diseñador y tester auditaron CMS pestaña por pestaña. Acuerdo: crear una pestaña principal `Editor del sitio` o `Mi sitio` para agrupar páginas, menú, vista espejo, secciones, estilos, SEO, links/PDF e imágenes usadas por la página. Mantener separadas `Mi cuenta`, `Usuarios`, `Auditoria` y `Biblioteca de archivos`. Debe mostrar siempre `Estas editando`, URL pública, `Abrir página publicada` y `Copiar URL`. Reporte: `coordinacion/reportes-tester/cms-editor-unificado-2026-07-26.md`.
- Implementación CMS 2026-07-26: entregable `Mi sitio` unificado aplicado. La navegación lateral quedó reducida a `Resumen`, `Mi sitio`, `Biblioteca`, `Usuarios`, `Mi cuenta` y `Auditoría`. `Mi sitio` agrupa páginas, menú, URL pública, acciones `Copiar URL`/`Abrir página publicada`, vista espejo, ajustes de página, SEO, marca/colores y secciones. Se agregó reordenamiento del menú, duplicar/ocultar/eliminar secciones y selector humano de acomodo como `Texto izquierda, imagen derecha`. `Ocultar` se volvió real en `@ecosistema/site-renderer`, por lo que aplica en CMS y landing. `Guardar sin publicar` queda visible pero bloqueado hasta implementar versionado borrador/publicado.
- Corrección CMS 2026-07-26: al hacer login y seleccionar `Hostlyc Clone Test`, React/Next podía mostrar warning de hidratación en modo dev. Se movió el formateo de `Última actualización` al Server Component con zona horaria fija `America/Mexico_City`, evitando recalcular `Intl.DateTimeFormat` dentro del componente cliente durante hidratación. Validado con `repos/cms npm run lint/build` y Playwright limpio en `http://localhost:4300/login -> /systems -> Hostlyc Clone Test`; captura en `logs/screenshots/cms-login-hostlyc-localhost-summary-after-hydration-fix.png`.
- Ajuste UX CMS 2026-07-26: la barra de `Mi sitio` se compactó porque en mobile ocupaba demasiada pantalla. Ahora muestra pagina actual y `Publicar cambios`; enlace publicado, copiar, abrir pagina y `Guardar sin publicar` viven en el desplegable `Enlace y opciones`. Validado con Playwright desktop/mobile sin overflow horizontal ni errores de consola; capturas en `logs/screenshots/cms-unified-editor/desktop-1366-compact-link-options.png` y `logs/screenshots/cms-unified-editor/mobile-390-compact-link-options.png`.
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

- Mostrar historial y rollback del producto padre; borrador/publicacion central
  ya estan implementados.
- Permitir ocultar bloques desde la UI; agregar, eliminar y reordenar ya está implementado.
- Refinar Vista espejo inline: agregar indicador de cambios sin guardar.
- Ocultar o mover a modo avanzado los datos técnicos como `slug`, ids internos y JSON.
- Definir tokens visuales globales para primario, éxito, advertencia, error, bordes y texto secundario.
- Agregar estados vacíos/error en selección de negocio y flujos de auditoría.
- Convertir Media por URL/metadatos en carga real de archivos con selector reutilizable en hero, galería, SEO y perfil.
- Implementar adaptadores reales de storage Media (`S3StorageProvider`, `FirebaseStorageProvider`, `CustomStorageProvider`) y conectar el formulario CMS para subir cuando `storage/status.enabled=true`.
- Publicar `@ecosistema/site-renderer` como paquete interno versionado en vez de depender de tarball local.
- Revisar claims comerciales/regulatorios antes de publicar sitios reales: porcentajes, volumen anual, acreditaciones y aceptación por autoridades requieren evidencia.
- Mejorar todavía más el editor espejo para modificar columnas/posiciones finas del layout sin depender de convenciones en `settings`.
- Refinar plantilla `Agencia digital / Hostlyc`: cambiar color de fragmentos arbitrarios de texto desde CMS, no solo mediante `highlight`.
- Extender CMS/API para controlar `theme`, `richText`, `cards`, `steps`, `faqItems`, `ctaActions`, `showImage`, `showMetrics`, modales, WhatsApp y validacion visible de enlaces rotos.
- Crear `Editor del sitio` unificado: páginas, menú, vista espejo, secciones, estilos, SEO y links de la página en una sola experiencia con URL pública visible y botones `Abrir página publicada`/`Copiar URL`.
- Separar publicación versionada: activar `Guardar sin publicar` y mantener `Publicar cambios en mi sitio` como acción distinta. Hoy el botón se muestra bloqueado para no prometer borradores inexistentes.
- Agregar al provisioning una UI de negocio nuevo: nombre, slug, plantilla, usuario admin y URL de landing generada. Hoy existe script base, falta experiencia de un clic.
- Ejecutar plan de entregables Hostlyc en `coordinacion/plan-trabajo-hostlyc-cms.md`; siguiente prioridad: provisioning de negocio nuevo en un clic y acciones avanzadas de Media/botones.

## Actualizacion Hostlyc 2026-07-28

- El producto padre se hidrata desde contenido publicado versionado en Neon.
- CMS separa `Borrador` y `Publicar` con control de version obsoleta.
- Personalizacion por seccion: fondo, texto, fuente, tamanos, pesos, alineacion,
  orden por drag/drop y botones, y negritas seguras.
- Tiendas dinamicas: imagenes HTTPS, productos, pago informativo y formulario
  de contacto persistente.
- Dos tiendas reales comparten plantilla y conservan hidrataciones aisladas.
- Migracion `007` aplicada sin exponer la URL de Neon.
- Stripe, Redis y storage binario permanecen desacoplados y pendientes de
  adaptador real.
- Reporte: `entregables/sprint-2/reporte-personalizacion-cms-tiendas-2026-07-28.md`.

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
