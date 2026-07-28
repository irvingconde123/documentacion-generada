# Evidencias Hostlyc Sprint 2

Fecha: 2026-07-27

## Repositorios Y Pull Requests

| Proyecto | PR draft |
|---|---|
| VPC Front | `https://github.com/irvingconde123/hostlyc-vpc-front/pull/2` |
| API Back | `https://github.com/irvingconde123/hostlyc-api-back/pull/2` |
| Data Access | `https://github.com/irvingconde123/hostlyc-data-access/pull/2` |
| API CMS existente | `https://github.com/irvingconde123/ecosistema-api/pull/1` |
| CMS frontend | `https://github.com/irvingconde123/ecosistema-cms/pull/1` |
| Hostlyc padre | `https://github.com/irvingconde123/hostlyc-parent-web/pull/1` |
| Coordinacion | `https://github.com/irvingconde123/ecosistema-negocios-2026-docs/pull/2` |

VPC Front, API Back y Data Access tienen GitHub Actions en verde. API CMS, CMS
y coordinacion no tienen checks remotos configurados para estas ramas; sus
validaciones se ejecutaron localmente.

Commits de rendering dinamico:

- Data Access: `f75ebf5`, correccion de auditoria `4d44258`.
- API Back: `6476556`.
- VPC Front: `26bcaf9`.
- Hostlyc padre: `b5113b3`, registro seguido de login `7797bc8`.

## Neon

- Conexion TLS completada desde proceso servidor.
- Base y rol fueron verificados sin imprimir credenciales.
- Migraciones `001_create_platform_stores.sql`,
  `002_create_platform_identities_and_sessions.sql`,
  `004_create_store_memberships_and_invitations.sql` y
  `005_create_dynamic_store_rendering.sql` aplicadas por runner versionado.
- Migracion `003_create_platform_audit_events.sql` aplicada; segunda ejecucion
  reporto `0 applied`.
- Segunda ejecucion del runner: `0 applied`; checksum estable.
- `platform_stores` y `hostlyc_schema_migrations` existen.
- Smoke integrado persistio una fila para diez requests concurrentes.
- El fixture `smoke-store-request-0001` se elimino al terminar.
- Servicios actualizados activos en 4100, 4200, 4300 y 4400.

La URL real vive solamente en
`hostlyc/hostlyc-data-access/.env`, archivo ignorado por Git. No se copia a
documentacion ni a `.env.example`.

## Codigo

| Proyecto | Validacion | Resultado |
|---|---|---|
| VPC Front | `npm run quality` | 38 unitarias + 9 e2e, build correcto |
| API Back | `npm run quality` | 69 pruebas en 22 suites, build correcto |
| Data Access | `npm run quality` | 86 pruebas en 15 suites, build correcto |
| Data Access | `npm run test:e2e` | 5 e2e correctas |
| API CMS existente | `npm test -- --runInBand && npm run build` | 30 pruebas y build correctos |
| Hostlyc padre | `npm run quality` | 32 pruebas, lint, tipos, formato, tamano y build correctos |
| CMS frontend | `npm run lint && npm run build` | correcto |
| Landing | `npm run lint && npm run build` | correcto |
| Landing Hostlyc | `npm run lint && npm run build` | correcto |
| Sistema hibrido | `npm run build` | tipos y build Vite correctos |
| Integracion Neon | smoke de 10 checks | aprobado |

## Seguridad

- HMAC v2 incluye caller, actor y permisos.
- HMAC y autorizacion por ruta son guards independientes en API Back.
- Identidades usan scrypt; sesiones persisten solo hash de refresh y rotan con
  version optimista.
- Invitaciones persisten solo hash, son de un uso, expiran y validan el correo
  de la identidad autenticada.
- Tienda y membresia `owner` se crean en una sola transaccion SQL.
- Rate limit local esta activo para desarrollo; produccion exige Redis y falla
  al arrancar mientras el adaptador no exista.
- Version de firma distinta de `2` se rechaza.
- Smoke integrado con HMAC v2 y PostgreSQL real aprobado.
- Smoke VPC de registro, login, tienda e invitacion a usuario existente
  aprobado. Neon confirmo owner activo, invitacion por hash y evento de dominio.
- Rendering publico no expone `provisioningId`; el `PUT` CMS lo deriva de la
  membresia y valida slots, componentes, URLs y tamano.
- Manifiesto e hidratacion comparten versiones; las carreras se rechazan con
  `409` y no combinan publicaciones.
- Regresiones posteriores `8f9ccab6-905a-4b42-b7f0-df1fd75d4784` y
  `69fd651c-843f-4ed3-8a59-e018e433c379` persistieron eventos completos de
  VPC, API Back y Data Access sin `UNSAFE_AUDIT_JSON`.
- La URL de base no aparece en cambios Git.
- VPC y API Back redactan cuerpos, headers, tokens, firmas y URLs de base antes
  de persistir auditoria. `origin` y `stackTrace` nunca forman parte del
  envelope publico.
- Regresion integrada: un snapshot con contenedor HTTP `query` se acepta, pero
  una cadena SQL bajo `query` se redacta. La prueba publica genero dos inserts
  de auditoria correctos sin `unsafe_audit_json`.
- La credencial compartida en chat debe rotarse antes de uso compartido o
  productivo.

## Logs Locales

```text
logs/hostlyc-sprint-2/
```

Los logs no contienen la connection string.

## Reportes

- `coordinacion/entregables/sprint-2/reporte-auditoria-invitaciones-2026-07-27.md`
- `coordinacion/entregables/sprint-2/reporte-responsive-cms-hostlyc.md`
- `coordinacion/entregables/sprint-2/reporte-prueba-dos-tiendas-dinamicas-2026-07-27.md`
- `coordinacion/sprints/hostlyc-sprint-2/arquitectura-rendering-tiendas-dinamicas.md`
- `logs/audit-reports/auditoria-demo-2026-07-27T23-19-19-012Z.xlsx`
- `logs/audit-reports/auditoria-demo-2026-07-27T23-19-19-012Z.html`

## Personalizacion CMS 2026-07-28

- Migracion Neon `007` aplicada: documentos CMS versionados y contacto.
- Producto padre: conflicto optimista `409`, borrador aislado, publicacion y
  restauracion final en version 4.
- Tiendas:
  `tienda-invitaciones-ms40llyy-7w7sqnbe` y
  `taller-verde-e2e-dzf9rc85`.
- Rendering publicado con cinco slots, estilos por seccion, imagenes, pago
  informativo y formulario.
- Neon confirmo solicitudes de contacto separadas para ambos tenants.
- API Back persiste el evento de dominio `store-rendering.published`; snapshots
  HTTP grandes se truncan a 80 campos para cumplir el contrato de auditoria.
- Reporte:
  `coordinacion/entregables/sprint-2/reporte-personalizacion-cms-tiendas-2026-07-28.md`.
- Capturas y reporte responsive:
  `test-results/cms-personalization/` y
  `coordinacion/reportes-tester/personalizacion-cms-tiendas-2026-07-28.md`.

## Versionado De Tiendas 2026-07-28

- Documento central: `store-site`.
- Escritura obsoleta: `409`.
- Historial inmutable y restauracion a borrador nuevo.
- Publicacion CMS/rendering atomica en Data Access.
- Taller Verde final: CMS version 6, rendering version 7.
- Browser mobile `320x700`: `320/320`, 1071 px de alto y sin overlay.
- Data Access: 119 pruebas.
- API Back: 105 pruebas.
- VPC: 45 unitarias y 9 E2E.
- Reporte:
  `coordinacion/entregables/sprint-2/reporte-versionado-tiendas-adaptadores-2026-07-28.md`.
- Tester:
  `coordinacion/reportes-tester/versionado-tiendas-cms-2026-07-28.md`.
