# Personalizacion CMS Y Tiendas Dinamicas

Fecha: 2026-07-28

## Resultado

El CMS ahora edita el producto padre y las tiendas con un contrato declarativo.
No almacena HTML, CSS ni JavaScript de tenant. Cada seccion admite:

- color de fondo y texto;
- fuente allowlisted;
- tamano y peso de titulos/cuerpo;
- alineacion;
- orden por arrastre y botones accesibles;
- negritas limitadas a `**texto**`;
- imagen HTTPS y texto alternativo.

Las tiendas agregan productos, datos de contacto, informacion de pago y un
formulario configurable. Pago es solo informativo: no guarda credenciales ni
procesa cobros. Stripe sigue detras de un puerto pendiente de adaptador real.

## Publicacion

```text
CMS -> VPC Front -> API Back -> Data Access -> Neon
```

Producto padre:

- `GET /cms/businesses/:businessId/content/platform-home`
- `PUT /cms/businesses/:businessId/content/platform-home/draft`
- `POST /cms/businesses/:businessId/content/platform-home/publish`
- `GET /cms/businesses/:businessId/content/platform-home/versions`
- `GET /platform/content/home`

Tiendas:

- `PUT /cms/businesses/:businessId/rendering`
- `GET /stores/:tenantSlug/render-manifest`
- `GET /stores/:tenantSlug/hydration?contentVersion=N`
- `POST /stores/:tenantSlug/contact-requests`

El front padre solicita primero el manifiesto y muestra esqueletos. La
hidratacion se carga con la misma `contentVersion`; una version distinta falla
cerrada. El CMS usa la hidratacion publicada como respaldo inicial cuando no
existe borrador local.

## Persistencia

La migracion `007_create_cms_content_and_contact_requests.sql` fue aplicada a
Neon. Agrega:

- `platform_cms_documents`;
- `platform_cms_document_versions` inmutables;
- punteros `draft_version` y `published_version`;
- concurrencia optimista con `expectedDraftVersion`;
- `platform_store_contact_requests`.

Los borradores no modifican la lectura publica. `owner/admin` publican;
`editor` puede guardar borradores. Las solicitudes de contacto exigen
consentimiento y una tienda `ready`.

## Pruebas Ejecutadas

- Escritura obsoleta de contenido padre: `409`.
- Borrador temporal: la lectura publica no cambio.
- Publicacion temporal: la lectura publica cambio.
- Restauracion del documento real: publicada en version 4.
- Documento final: ocho estilos y orden de secciones.
- Tienda Invitaciones: rendering version 2.
- Taller Verde: rendering version 3.
- Aislamiento: productos, imagenes, colores y contacto distintos por slug.
- Contacto: filas separadas para ambos tenants en Neon.
- Auditoria: eventos VPC y API Back para publicacion, conflictos y contacto.
- Snapshot editorial grande: truncado antes de persistir auditoria.
- Archivos TypeScript: maximo 300 lineas.

Calidad:

| Proyecto | Resultado |
|---|---|
| Data Access | 19 suites, 114 pruebas, lint y build |
| API Back | 31 suites, 100 pruebas, lint y build |
| VPC Front | 43 unitarias, 9 E2E, lint y build |
| Hostlyc padre | 21 archivos, 70 pruebas, lint, tipos y build |
| CMS | lint, limite de lineas y build |

## Pendientes Reales

- Storage binario y selector de Media para reemplazar captura de URL HTTPS.
- Historial/rollback visible desde el CMS; la API ya lista versiones.
- Draft central para tiendas; hoy el publicado es central y el borrador de
  recuperacion del editor de tienda es local.
- Adaptador real de Stripe y webhooks.
- Notificacion de solicitudes de contacto por correo.
- ETag/304, rollback de rendering y `publicationId` para una fase posterior.
- Redis para rate limit productivo; el contrato existe y desarrollo usa
  adaptador local.
