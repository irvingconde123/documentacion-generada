# API contracts

## Base URL local

`http://localhost:3000/v1`

## Endpoints iniciales

- `GET /v1`: health check.
- `GET /v1/tenant/resolve`: resuelve tenant por header, query o host.
- `GET /v1/public/:tenantSlug/content/home`: contenido publico para landing.
- `GET /v1/public/:tenantSlug/site`: sitio publico agregado con paginas, menu y diseno.
- `GET /v1/public/:tenantSlug/pages/:slug`: pagina publica por direccion visible.
- `GET /v1/public/:tenantSlug/design`: configuracion visual publicada.
- `GET /v1/public/:tenantSlug/lead-form`: formulario publico de lead.
- `PUT /v1/public/:tenantSlug/cms/content/home`: publica contenido home desde CMS.
- `PUT /v1/public/:tenantSlug/cms/site`: publica paginas y menu desde la vista espejo del CMS.
- `PUT /v1/public/:tenantSlug/cms/design`: publica diseno desde CMS.
- `GET /v1/cms/:tenantSlug/audit-reports/recent`: ultimos eventos de auditoria.
- `POST /v1/cms/:tenantSlug/audit-reports/email`: solicita reporte de auditoria por correo o simulacion local.
- `POST /v1/leads`: captura lead desde landing.
- `GET /v1/leads`: inspeccion local temporal de leads recibidos.
- `GET /v1/sync/:tenantSlug/status`: estado de sincronizacion para clientes offline-first.
- `POST /v1/sync/:tenantSlug/operations`: recibe una operacion offline y devuelve acuse `SyncAck`.

## SEO administrable por pagina

Las paginas dentro de `ContentPageResponse` y del mirror publicado pueden incluir
un objeto `seo` opcional:

```json
{
  "seo": {
    "seoTitle": "Servicios de laboratorio | Conde",
    "seoDescription": "Analisis acreditados y trazables para equipos operativos.",
    "ogImageUrl": "https://example.test/og/servicios.jpg"
  }
}
```

Los tres campos son opcionales. Si `seo` no existe, los consumidores deben seguir
usando `title` y `description` como fallback.

## Menu publico

`NavigationMenuItemResponse` soporta:

- `linkType: "page"` para paginas internas o anclas de la home.
- `linkType: "external"` para URL completa abierta en nueva pestaña.
- `linkType: "download"` para PDF o archivo descargable.

Compatibilidad aplicada: si un enlace existente apunta a `home` y su etiqueta es
`Servicios`, `Acreditaciones` o `Contacto`, el API normaliza la ruta a
`#servicios`, `#acreditaciones` o `#contacto` para que el menu publicado navegue
a la seccion real de la landing.

## Contrato sync inicial

`POST /v1/sync/:tenantSlug/operations` usa `SyncOperation` de `@ecosistema/shared-contracts`.
El `tenantSlug` del path es la fuente de verdad. Las mutaciones con tenant distinto se rechazan en el acuse.

Si `API_FORCE_OFFLINE=true`, la API responde no disponible para que el cliente hibrido conserve su outbox local y reintente despues.
El cifrado de transporte debe cubrirse con HTTPS/TLS; un interceptor de cifrado de payload queda pendiente hasta cerrar llaves, formato de sobre y compatibilidad entre clientes.

## Swagger

`http://localhost:3000/docs`

## Persistencia CMS

El espejo publico del CMS se conserva en PostgreSQL/Neon cuando existe una URL
de base de datos configurada.

- Variable preferida: `DATABASE_URL`.
- Variable legacy aceptada temporalmente: `DATABASE_OPERATIONAL_URL`.
- Tabla: `public_site_mirrors`.
- Los bloques de contenido se guardan dentro de `pages` como JSONB sin
  transformacion por `kind`; esto incluye `hero`, `text`, `features`,
  `gallery`, `contactForm`, `metricStrip`, `logoStrip`, `mission`,
  `accreditations`, `ctaBand` y `footer`.
- El objeto opcional `page.seo` se conserva junto con cada pagina dentro del
  JSONB `pages` al publicar `PUT /v1/public/:tenantSlug/cms/site`.
- Los items de navegacion conservan `linkType`, `target` y `path` para paginas,
  URL externas y descargas.
- Fallback local: si no hay URL de base de datos o la lectura falla, el API usa
  contenido demo/en memoria para no bloquear desarrollo local.

## Estado

API/CMS/Landing ya tienen primer flujo funcional: CMS publica paginas, menu,
diseno y bloques; API persiste el espejo; landing consume
`GET /v1/public/:tenantSlug/site`.

Pendiente para produccion: auth/guards reales, validacion runtime de payloads,
versionado borrador/publicado, Media formal y pruebas de seguridad.
