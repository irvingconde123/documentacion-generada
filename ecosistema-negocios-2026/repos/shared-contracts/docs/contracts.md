# Contratos iniciales

## Version

`0.1.0`

## Estado

Propuestos para Sprint 0 y listos para consumo inicial por API, CMS y landing.

## Contratos incluidos

| Nombre | Origen | Consume | Produce | Estado | Version |
|---|---|---|---|---|---|
| LoginRequest | API | API | CMS, sistema hibrido | propuesto | 0.1 |
| LoginResponse | API | CMS, sistema hibrido | API | propuesto | 0.1 |
| TenantContext | API | Todos | API | propuesto | 0.1 |
| ContentPageSeo | CMS | Landing, sistema hibrido | API/CMS | propuesto | 0.1 |
| ContentPageResponse | CMS | Landing, sistema hibrido | API/CMS | propuesto | 0.1 |
| DesignConfigResponse | CMS | Landing, sistema hibrido | API/CMS | propuesto | 0.1 |
| SaveContentPageRequest | CMS | API | CMS | propuesto | 0.1 |
| SaveDesignConfigRequest | CMS | API | CMS | propuesto | 0.1 |
| RequestAuditReportRequest | CMS | API | CMS | propuesto | 0.1 |
| RequestAuditReportResponse | API | CMS | API | propuesto | 0.1 |
| CreateLeadRequest | Landing | API | Landing | propuesto | 0.1 |
| CreateLeadResponse | API | Landing | API | propuesto | 0.1 |
| SyncOperation | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| HybridSession | API | Sistema hibrido | API | propuesto | 0.1 |
| HybridAuthState | Sistema hibrido | Sistema hibrido | Sistema hibrido | propuesto | 0.1 |
| HybridSyncEnvelope | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| CommitSyncBatchRequest | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| QuerySyncStatusRequest | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| SyncCommitAck | API | Sistema hibrido | API | propuesto | 0.1 |
| SyncBatchStatus | API | Sistema hibrido | API | propuesto | 0.1 |
| SyncConflict | API | Sistema hibrido | API | propuesto | 0.1 |
| ApiSyncStatus | API | Sistema hibrido | API | propuesto | 0.1 |
| TransportRequestEnvelope | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| TransportResponseEnvelope | API | Sistema hibrido | API | propuesto | 0.1 |
| EncryptedPayload | Sistema hibrido | Sistema hibrido/API | Sistema hibrido/API | propuesto | 0.1 |
| IdempotencyOperation | Sistema hibrido | Sistema hibrido/API | Sistema hibrido | propuesto | 0.1 |
| IdempotencyRequest | Sistema hibrido | API | Sistema hibrido | propuesto | 0.1 |
| StoredOutboxRecordContract | Sistema hibrido | Sistema hibrido | Sistema hibrido | propuesto | 0.1 |
| OperationalStorageSnapshot | Sistema hibrido | Sistema hibrido | Sistema hibrido | propuesto | 0.1 |
| InventoryItemDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| SaleDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| CustomerDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| PaymentDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| StockMovementDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| EvidenceAttachmentDto | Sistema hibrido | API/sistema hibrido | API/sistema hibrido | propuesto | 0.1 |
| SaveContentPageDraftRequest | CMS | API | CMS | propuesto | 0.1 |
| SaveNavigationMenuRequest | CMS | API | CMS | propuesto | 0.1 |
| CmsSiteMirrorResponse | API/CMS | CMS/landing | API/CMS | propuesto | 0.1 |
| NavigationMenuItemResponse | CMS | API/CMS/landing | API/CMS | propuesto | 0.1 |
| PermissionCheckRequest | API | API | CMS, sistema hibrido | propuesto | 0.1 |
| CmsManagedUser | API/CMS | CMS | API/CMS | propuesto | 0.1 |
| UpdateCmsAccountRequest | CMS | API | CMS | propuesto | 0.1 |
| ChangeCmsPasswordRequest | CMS | API | CMS | propuesto | 0.1 |
| CreateCmsUserRequest | CMS | API | CMS | propuesto | 0.1 |
| UpdateCmsUserRequest | CMS | API | CMS | propuesto | 0.1 |
| CmsPasswordResetRequest | API | CMS | API | propuesto | 0.1 |
| CmsMediaItem | API/CMS | CMS | API/CMS | propuesto | 0.1 |
| UpsertCmsMediaRequest | CMS | API | CMS | propuesto | 0.1 |

## Decisiones de compatibilidad

- `SyncOperation` y `SyncAck` se mantienen para no romper el API actual.
- Los flujos nuevos deben preferir `CommitSyncBatchRequest`, `SyncCommitAck`,
  `SyncBatchStatus`, `HybridSyncEnvelope` y `ApiSyncStatus`.
- El contenido mantiene `SaveContentPageRequest`, pero el flujo nuevo debe usar
  `SaveContentPageDraftRequest` para no mezclar modelos de lectura y escritura.
- `CmsSiteMirrorResponse` representa el espejo editable del sitio: paginas,
  menu de navegacion y diseno en una sola respuesta para vista previa y publicacion.
- `NavigationMenuItemResponse.linkType` distingue `page`, `external` y
  `download`; esto permite menu interno, URL externa y PDF/archivo descargable
  sin forzar que todo enlace pertenezca a una pagina CMS.
- `ContentPageResponse` y `ContentPageDraftInput` aceptan `seo` opcional para
  metadatos administrables por pagina. El objeto estable es `ContentPageSeo`
  con `seoTitle`, `seoDescription` y `ogImageUrl` opcionales; si no existe, los
  consumidores deben seguir usando `title` y `description` como fallback.
- `ContentBlockKind` mantiene compatibilidad con `hero`, `text`, `features`,
  `gallery` y `contactForm`, y agrega bloques para landing de laboratorio:
  `metricStrip`, `logoStrip`, `mission`, `accreditations`, `ctaBand` y `footer`.
- `ContentBlockResponse.settings` y `ContentBlockInput.settings` aceptan valores
  JSON para permitir listas de metricas, logos, enlaces, acreditaciones y
  llamadas a la accion sin transformar el payload en API.

## ContentBlockKind

Bloques compatibles:

| Kind | Uso esperado |
|---|---|
| `hero` | Encabezado principal existente de landing. |
| `text` | Bloque editorial simple existente. |
| `features` | Lista de servicios o beneficios existente. |
| `gallery` | Imagenes publicas existentes. |
| `contactForm` | Captura de lead existente. |
| `metricStrip` | Tira de indicadores numericos de laboratorio. |
| `logoStrip` | Tira de logos de clientes, aliados o normas. |
| `mission` | Mision, promesa operativa o enfoque institucional. |
| `accreditations` | Acreditaciones, certificaciones y respaldos. |
| `ctaBand` | Franja de llamada a la accion. |
| `footer` | Cierre de pagina con datos, enlaces y contacto. |

El API debe conservar los bloques como JSON del sitio publicado. Los consumidores
deciden como renderizar cada `kind`; los `kind` desconocidos fuera del contrato
no se introducen en esta version.

## NavigationMenuItemResponse

Campos relevantes:

```ts
{
  label: string;
  path: string;
  pageSlug: string;
  linkType?: "page" | "external" | "download";
  target: "self" | "blank";
}
```

Reglas:

- `page` navega dentro de la landing o a una pagina CMS por slug.
- `external` conserva `path` como URL completa y normalmente usa `target: "blank"`.
- `download` conserva `path` como URL de archivo, por ejemplo PDF, y landing lo
  renderiza con atributo `download`.
- Para compatibilidad, `linkType` es opcional; consumidores deben tratarlo como
  `page` cuando no exista.

## SEO por pagina

`ContentPageResponse` y `ContentPageDraftInput` pueden incluir:

```ts
seo?: {
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
}
```

El campo es opcional para mantener compatibilidad con paginas existentes. El CMS
puede enviarlo en borradores y en el espejo publicado; API debe conservarlo
dentro de cada pagina del sitio, y landing/sistema hibrido pueden usarlo para
`title`, `meta description` y Open Graph cuando este presente.

## CMS administracion

Los contratos de `src/cms` cubren los endpoints reales de administracion usados
por el CMS:

- `CmsManagedUser.email` es inmutable despues de crear el usuario.
- `CmsManagedUser.role` acepta `admin` y `editor`.
- `CmsManagedUser.status` acepta `active` e `inactive`.
- Los cambios administrativos usan `requestedByUserId`; mientras no existan
  guards de autenticacion, API valida permisos contra el usuario persistido.
- `CmsPasswordResetRequest.temporaryPassword` solo se devuelve en `testMode`.
  Cuando exista SMTP real, el contrato debe conservar el campo opcional y enviar
  el secreto por correo, no en la respuesta.
- `CmsMediaItem` representa metadatos y URL publica. Upload binario queda fuera
  de este contrato inicial; el campo `url` debe apuntar a un recurso existente.
