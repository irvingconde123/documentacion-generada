# Arquitectura de invitaciones y outbox

Fecha: 2026-07-27

## Decisiones

- El navegador y el CMS llaman unicamente a VPC Front.
- API Back conserva casos de uso y puertos; no ejecuta SQL.
- Data Access acepta solamente query keys allowlisted.
- El correo es generico y no contiene negocio, rol ni destinatario.
- El front obtiene el contexto por `POST /invitations/preview`.
- El payload del correo se cifra con AES-256-GCM antes de persistirse.
- PostgreSQL es el outbox durable. Redis queda fuera de este sprint.
- La entrega es al menos una vez y usa un `messageId` determinista.

## Componentes

```mermaid
flowchart LR
  Client[Front padre o CMS] -->|HTTPS| VPC[Hostlyc VPC Front]
  VPC -->|HMAC v2| Back[Hostlyc API Back]
  Back -->|contrato Data Access| Data[Hostlyc Data Access]
  Data --> Neon[(Neon PostgreSQL)]
  Worker[Invitation Delivery Worker] -->|claim/mark por puerto| Data
  Worker -->|InvitationDeliveryPort| SMTP[SMTP]
  Back -. cifra/descifra .-> Crypto[AES-256-GCM adapter]
```

## Crear y entregar

```mermaid
sequenceDiagram
  participant CMS
  participant VPC
  participant Back
  participant Data
  participant DB as PostgreSQL
  participant Worker
  participant SMTP

  CMS->>VPC: POST /cms/businesses/{id}/invitations
  VPC->>Back: HMAC + actor + permisos
  Back->>Back: autoriza tenant y cifra payload
  Back->>Data: platform.invitations.resend
  Data->>DB: invitacion + outbox, una transaccion
  DB-->>CMS: 201 pending
  Worker->>Data: claimNext
  Data->>DB: FOR UPDATE SKIP LOCKED
  Worker->>SMTP: mensaje generico
  alt entrega aceptada
    Worker->>Data: markDelivered
  else fallo temporal
    Worker->>Data: markRetry con backoff
  end
```

## Consultar y canjear

```mermaid
sequenceDiagram
  participant User
  participant Parent as Front padre
  participant VPC
  participant Back
  participant Data

  User->>Parent: abre enlace con token
  Parent->>VPC: POST /invitations/preview
  VPC->>Back: HMAC, actor anonymous, permiso public
  Back->>Back: SHA-256(token)
  Back->>Data: platform.invitations.preview
  Data-->>Parent: negocio, rol, estado, correo enmascarado
  User->>Parent: inicia sesion y acepta/rechaza
  Parent->>VPC: POST /cms/invitations/{decision} + bearer
  VPC->>Back: identidad autenticada
  Back->>Data: valida correo y muta invitacion
  Data->>Data: cancela outbox activo en la misma transaccion
```

## Estados

Outbox: `pending`, `processing`, `delivered`, `dead`, `cancelled`.

Invitacion: `pending`, `accepted`, `rejected`, `revoked`; `expired` se calcula
contra `expiresAt` sin reescribir el registro durante una consulta.
