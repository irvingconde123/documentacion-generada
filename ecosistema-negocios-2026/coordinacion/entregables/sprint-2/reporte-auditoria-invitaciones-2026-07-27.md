# Reporte de auditoria de invitaciones Hostlyc

Fecha: 2026-07-27

## Resultado

Estado: aprobado para base de desarrollo con transporte SMTP real y outbox
PostgreSQL durable. Redis no forma parte de esta entrega.

## Cobertura funcional

| Escenario | Resultado |
|---|---|
| Usuario existente recibe invitacion sin crear otra identidad | aprobado |
| Un usuario administra varios negocios | aprobado |
| Un negocio tiene varios usuarios | aprobado |
| Solo el correo autenticado de destino puede canjear | aprobado |
| Canje de una sola vez | aprobado |
| Enlace expirado | rechazado |
| Reenvio revoca el enlace anterior | aprobado |
| Revocacion por invitacion equivocada | aprobado |
| Rechazo por destinatario | aprobado |
| Estados pending/accepted/rejected/revoked/expired | aprobado |
| Viewer sin permiso para gestionar usuarios | aprobado |
| Owner y admin gestionan usuarios | aprobado |
| Correo sin negocio, rol ni destinatario visible | aprobado |
| Preview con negocio, rol y correo enmascarado | aprobado |
| Outbox cifrado, lease y reintentos | aprobado |
| Aceptar/rechazar/revocar cancela entrega activa | aprobado |

Evidencia automatizada actual: `hostlyc-api-back` aprobo 84 pruebas en 27
suites; `hostlyc-parent-web` aprobo 41 pruebas; `hostlyc-data-access` aprobo
109 pruebas; `hostlyc-vpc-front` aprobo 40 pruebas unitarias y 9 e2e. Los
cuatro proyectos compilan y respetan el limite de 300 lineas.

El smoke persistente se ejecuto exclusivamente por el VPC (`4100`):

1. Registro de owner: HTTP 201.
2. Registro previo del futuro miembro: HTTP 201.
3. Login de ambos usuarios: HTTP 200.
4. Creacion de tienda: HTTP 202.
5. Invitacion del usuario ya existente: estado `pending`.
6. Neon confirmo una membresia `owner` activa, una invitacion `editor`
   pendiente con hash de 64 caracteres y un evento
   `business.invitation.created`.

El smoke SMTP del 27 de julio tambien ejecuto crear, reenviar y revocar por el
VPC. Se enviaron correos reales a alias controlados de la cuenta SMTP
configurada. Cada corrida genero 26 eventos exitosos en VPC, API Back y Data
Access, incluidos `business.invitation.created`,
`business.invitation.resent` y `business.invitation.revoked`.
Al terminar se eliminaron las dos tiendas y las dos identidades de prueba; los
eventos sanitizados se conservaron como evidencia.

## Persistencia

- `platform_store_memberships` implementa muchos-a-muchos con unicidad por
  `provisioning_id` e `identity_id`.
- La creacion de tienda inserta tambien la membresia `owner` en una sola
  transaccion allowlisted.
- La invitacion guarda solamente SHA-256 del token.
- Aceptar comprueba hash, estado pendiente, vigencia, identidad activa y correo.
- Aceptar crea o reactiva la membresia en la misma consulta.
- Reenviar revoca invitaciones pendientes anteriores antes de crear la nueva.
- Revocar es borrado logico para conservar trazabilidad.
- La migracion `004_create_store_memberships_and_invitations.sql` fue aplicada
  en Neon; una segunda ejecucion reporto cero migraciones pendientes.
- La migracion `006_create_invitation_delivery_outbox.sql` fue aplicada en
  Neon el 27 de julio.
- Invitacion y entrega cifrada se insertan en una sola sentencia.
- El worker reclama filas con `FOR UPDATE SKIP LOCKED`, recupera leases
  vencidos y aplica backoff exponencial hasta estado `dead`.
- Aceptar, rechazar, revocar y reenviar cancelan entregas activas dentro de la
  misma transaccion.

## Frontera HTTP

El cliente consume exclusivamente el VPC. El VPC resuelve rutas parametrizadas,
valida DTOs, aplica permisos y firma la llamada interna al API Back. Los
controladores internos del API Back exigen HMAC y permisos; la identidad se
obtiene de `x-auth-sub`, no del body.

## Eventos auditables

| Evento | Actor | Negocio | Invitacion | Token/hash |
|---|---|---|---|---|
| `business.invitation.created` | si | si | si | nunca |
| `business.invitation.resent` | si | si | nueva y anterior | nunca |
| `business.invitation.accepted` | destinatario | si | si | nunca |
| `business.invitation.rejected` | destinatario | si | si | nunca |
| `business.invitation.revoked` | owner/admin | si | si | nunca |
| `business.invitation.delivery.succeeded` | worker | si | si | nunca |
| `business.invitation.delivery.retry_scheduled` | worker | si | si | nunca |
| `business.invitation.delivery.dead` | worker | si | si | nunca |

Los eventos se traducen a `POST /domain-events/<tipo>` para cumplir la
restriccion de metodos de `platform_audit_events`. Se registra `requestId`,
fecha, actor, negocio, invitacion, rol y resultado. Las pruebas verifican que el
payload de auditoria no contiene las cadenas `token` ni `hash`.

Durante la prueba real se detecto que el snapshot HTTP de Data Access conservaba
el valor de `tokenHash`. Se agrego `tokenHash` al sanitizador universal, se
repitio el flujo y todos los valores quedaron como `[REDACTED]`. Tambien se
sanearon tres snapshots historicos; la consulta final encontro cero hashes sin
ocultar.

## Transporte de correo

- `InvitationDeliveryPort` sigue siendo el contrato de aplicacion.
- `SmtpInvitationDeliveryAdapter` usa Nodemailer con `MAIL_FROM` y `SMTP_*`.
- La plantilla entrega version texto y HTML con estilo Hostlyc.
- El asunto y cuerpo son genericos: dan la bienvenida y no revelan negocio,
  rol ni correo.
- `INVITATION_ACCEPT_URL` apunta a
  `/invitaciones/aceptar` del front padre.
- La pantalla consulta `POST /invitations/preview` y muestra nombre actual del
  negocio, rol y correo enmascarado.
- Produccion exige SMTP y URL HTTPS; desarrollo conserva adaptador diferido.
- El front canjea exclusivamente por VPC con cookie HttpOnly.

## Smoke outbox y preview

La corrida persistente del 27 de julio comprobo:

1. Login de owner y destinatario por VPC.
2. Invitacion de una identidad ya existente sin error de duplicado.
3. Persistencia de payload AES-256-GCM sin token legible.
4. Preview publica con negocio y rol correctos, correo enmascarado.
5. Intento con correo incorrecto rechazado con HTTP 403 sin consumir enlace.
6. Aceptacion correcta y replay rechazado con HTTP 409.
7. Worker SMTP en un intento y estado `delivered`.
8. Auditorias persistidas para resultados exitosos y rechazados en VPC, API
   Back y Data Access.

## Reporte Hostlyc

Se genero una vista previa real desde el API CMS con 41 registros. El Excel
incluye resumen, pestañas por seccion, filtros, paneles congelados, anchos
controlados, fechas y estados. El HTML usa la jerarquia visual y paleta Hostlyc.
Ambos pasan por sanitizacion de credenciales, cookies, tokens y contrasenas.

Artefactos:

- `logs/audit-reports/auditoria-demo-2026-07-27T23-19-19-012Z.xlsx`
- `logs/audit-reports/auditoria-demo-2026-07-27T23-19-19-012Z.html`

## Pendientes

1. Conectar la gestion visual de usuarios del CMS a estas rutas del VPC.
2. Sustituir la sesion Base64 local del CMS por autenticacion VPC y cookie
   firmada/HttpOnly antes de habilitar el modo productivo.
3. Implementar el adaptador Redis de rate limit cuando exista infraestructura;
   el contrato queda preparado y no se usa un destino simulado.
