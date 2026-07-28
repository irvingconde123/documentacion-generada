# Backlog Hostlyc Sprint 2

| ID | Actividad | Propietario | Estado |
|---|---|---|---|
| S2-001 | Crear ramas `hostlyc_reestructuracion` | PM | completado |
| S2-002 | Soportar `DATABASE_URL` y migraciones versionadas | Data Access | completado |
| S2-003 | Ejecutar smoke integrado contra Neon y limpiar fixture | Tester | completado |
| S2-004 | Firmar caller, actor y permisos con HMAC v2 | VPC/Back/Data | completado |
| S2-005 | Auditar API CMS, CMS, tenant y auth | Arquitecto/Integrador | completado |
| S2-006 | Definir contratos IAM, tenant y ContentPort | Arquitecto | completado |
| S2-007 | Modelar users, credentials, sessions y refresh rotation | API Back/Data | completado |
| S2-008 | Modelar memberships, roles, permissions y entitlements | API Back/Data | completado |
| S2-009 | Resolver slug/dominio a provisioning ID | API Back/Data | pendiente |
| S2-010 | Agregar rutas publicas de contenido, busqueda y auth al VPC | VPC Front | completado |
| S2-011 | Crear `CmsContentPort` y adaptador legacy | API Back | completado con fallback de migracion |
| S2-012 | Hacer interna y firmada la API CMS | API CMS | pendiente |
| S2-013 | Separar draft/version/published | API Back/Data | completado para producto padre |
| S2-014 | Sustituir cookie Base64 y usuarios locales | CMS | pendiente |
| S2-015 | Consumir exclusivamente VPC desde CMS BFF | CMS | completado para IAM, producto padre y rendering |
| S2-016 | Agregar replay store y nonce | Seguridad | pendiente |
| S2-017 | Contratos y politicas de rate limit; adaptador Redis | VPC | base completada; Redis pendiente |
| S2-018 | Publicar CI y PR por repositorio | PM | completado |
| S2-019 | Crear `hostlyc-parent-web` con arquitectura hexagonal | Front | completado |
| S2-020 | Implementar inicio CMS con respaldo local | Front | completado |
| S2-021 | Implementar busqueda, registro de tienda, login y alta de cliente | Front | alta, registro y login reales; pago dummy |
| S2-022 | Auditar producto padre en escritorio y movil | Front/Tester | completado |
| S2-023 | Publicar repo, CI y PR de `hostlyc-parent-web` | PM | completado |
| S2-024 | Definir envelope, DTOs, helpers y evento de auditoria comun | Arquitecto | completado |
| S2-025 | Persistir auditoria y estandar HTTP en Data Access | Data Access | completado |
| S2-026 | Agregar filtro/interceptor/DTOs y AuditEventPort en API Back | API Back | completado |
| S2-027 | Validar DTO por ruta y persistir auditoria desde VPC | VPC Front | completado |
| S2-028 | Auditar migracion compatible de la API CMS existente | Integrador | completado |
| S2-029 | Migrar API CMS sin romper consumidores y retirar secretos | API CMS/Integrador | pendiente critico |
| S2-030 | Implementar controladores y adaptadores IAM reales en API Back | API Back | completado |
| S2-031 | Repetir regresion responsive automatizada en cinco fronts | Tester | aprobacion estatica; visual pendiente |
| S2-032 | Implementar invitaciones seguras y membresias M:N | Back/Data/VPC | completado |
| S2-033 | Corregir preview desktop y edicion movil del CMS | Front/Diseno | completado |
| S2-034 | Redisenar reporte HTML y Excel de auditoria | Diseno/API CMS | completado |
| S2-035 | Definir manifiesto declarativo e hidratacion segura | Arquitecto | completado |
| S2-036 | Persistir y publicar rendering por tenant mediante VPC | Back/Data/VPC | completado POC |
| S2-037 | Renderizar tiendas dinamicas y alta real desde front padre | Front | completado |
| S2-038 | Probar dos usuarios y tiendas sin cruce de tenant | Tester | completado; visual pendiente |
| S2-039 | Personalizar estilos y orden por seccion desde CMS | Front/CMS | completado |
| S2-040 | Configurar imagenes, pago informativo y contacto por tienda | Fullstack | completado sin Stripe |
| S2-041 | Persistir solicitudes de contacto por tenant | Back/Data | completado |
| S2-042 | Agregar draft central versionado para tiendas | Back/Data/CMS | completado |
| S2-043 | Conectar storage binario al selector de imagenes | CMS/Storage | selector local completado; storage externo pendiente |
| S2-044 | Historial y restauracion inmutable de tiendas | Back/Data/CMS | completado |
| S2-045 | Adaptadores externos de pagos, correo, media y Redis | Integrador | contratos delimitados; servicios externos pendientes |

## Lotes

1. Seguridad base: S2-001 a S2-006.
2. IAM y tenancy: S2-007 a S2-010.
3. Integracion CMS: S2-011 a S2-015.
4. Endurecimiento: S2-016 a S2-018.
5. Producto padre: S2-019 a S2-023.
6. Estandar HTTP y auditoria: S2-024 a S2-028.
7. Rendering dinamico de tiendas: S2-035 a S2-038.
8. Personalizacion comercial: S2-039 a S2-043.
