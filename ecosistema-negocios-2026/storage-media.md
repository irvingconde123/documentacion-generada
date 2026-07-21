# Storage de Media - base dinamica

Fecha: 2026-07-21

## Objetivo

Preparar el CMS y la API para usar almacenamiento de archivos sin amarrarnos a un proveedor unico. Hoy no hay storage productivo conectado; la base deja listo el contrato para apuntar despues a S3, Firebase Storage o un proveedor compatible.

## Estado actual

- Contratos compartidos agregan metadata opcional de storage en `CmsMediaItem`: `source`, `storageProvider`, `storageKey`, `mimeType`, `sizeBytes`, `checksumSha256`, `originalFileName` y `visibility`.
- API agrega `CmsStorageService` con proveedor dinamico por variables de entorno.
- API expone:
  - `GET /v1/cms/:tenantSlug/storage/status`
  - `POST /v1/cms/:tenantSlug/storage/uploads`
- CMS consulta el estado de storage y muestra un aviso humano en Media cuando no hay proveedor conectado.
- CMS conserva el fallback actual:
  - Enlace publico para archivos que ya estan publicados fuera del CMS.
  - Archivo local pequeno en `data:` solo como respaldo temporal dentro del CMS.
- Biblioteca Media ya separa visualmente estado editorial y disponibilidad:
  - `Activo` / `Archivado`
  - `Enlace publico` / `Solo en este CMS`

## Variables API

Proveedor deshabilitado, estado actual recomendado:

```env
CMS_STORAGE_PROVIDER=disabled
```

Proveedor S3 futuro:

```env
CMS_STORAGE_PROVIDER=s3
CMS_STORAGE_PUBLIC_BASE_URL=https://cdn.ejemplo.com
CMS_STORAGE_MAX_UPLOAD_BYTES=8388608
```

Proveedor Firebase futuro:

```env
CMS_STORAGE_PROVIDER=firebase
CMS_STORAGE_PUBLIC_BASE_URL=https://firebasestorage.googleapis.com/...
CMS_STORAGE_MAX_UPLOAD_BYTES=8388608
```

Proveedor compatible/custom:

```env
CMS_STORAGE_PROVIDER=custom
CMS_STORAGE_UPLOAD_ENDPOINT=https://storage.ejemplo.com/uploads
CMS_STORAGE_PUBLIC_BASE_URL=https://cdn.ejemplo.com
CMS_STORAGE_MAX_UPLOAD_BYTES=8388608
```

## Comportamiento esperado por modo

`disabled`:

- API inicia sin credenciales de storage.
- `status.enabled=false`.
- `uploads` valida actor, tipo, MIME y tamano, pero responde `status=not_configured`.
- CMS informa que aun no hay almacenamiento conectado.

`s3`, `firebase` o `custom` en el estado actual:

- API reporta `not_implemented` si tiene las variables minimas.
- API reporta `misconfigured` si faltan variables minimas.
- API no devuelve `ready`, `uploadUrl` ni `publicUrl` hasta tener un adaptador real.
- Esto evita que el CMS prometa que un archivo ya se puede publicar en internet cuando todavia no existe firma/subida real.

## Seguridad definida

- Solo `admin` y `editor` activos pueden consultar/preparar upload de Media.
- No se aceptan SVG, HTML, JS ni ejecutables.
- MIME permitido actual: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `application/pdf`.
- Video queda deshabilitado para upload; por ahora solo URL publica.
- El nombre de archivo se limpia y se genera una key con tenant, fecha y UUID.
- No se deben guardar ni enviar URLs firmadas completas en reportes de auditoria.

## Pendiente para storage real

- Implementar adaptadores reales:
  - `S3StorageProvider`
  - `FirebaseStorageProvider`
  - `CustomStorageProvider`
- Generar URLs firmadas reales o upload server-side.
- Persistir metadata de storage en PostgreSQL.
- Calcular `checksumSha256` del archivo real.
- Validar MIME por firma de archivo, no solo por `file.type`.
- Conectar el formulario del CMS para subir contra el proveedor cuando `status.enabled=true`.
- Bloquear en selectores publicos los archivos `Solo CMS`, `Pendiente` o `Falló`.
- Agregar auditoria completa: preparado, subido, rechazado, fallido y eliminado.
- Agregar limpieza compensatoria cuando storage sube pero DB falla.
- Mover autorizacion de `requestedByUserId` a auth real por token/sesion antes de produccion.

## Validaciones 2026-07-21

- `repos/shared-contracts`: `npm run check`, `npm run build`.
- `repos/api`: `npm run build`, `npm test -- --runInBand`, `npm run test:e2e -- --runInBand`.
- `repos/cms`: `npm run lint`, `npm run build`.
- Playwright CMS `4200`, seccion Media:
  - Sin overflow horizontal desktop/mobile.
  - Aviso visible de storage no conectado.
- Capturas en `logs/screenshots/cms-storage/cms-media-storage-dynamic-desktop-fixed.png` y `cms-media-storage-dynamic-mobile-fixed.png`.
- Agente UX/UI marco como bloqueante no sobreprometer storage real; se corrigio para que proveedores seleccionados queden en `not_implemented`.
- Agente fullstack/integrador marco que el CMS aun no llama `/storage/uploads`; queda documentado como siguiente paso del entregable 4.

## Decision de producto

No se debe mostrar como "archivo publicado" un archivo que solo vive en el CMS. El texto visible debe ser entendible para una persona no tecnica: si falta storage, el CMS debe decir que puede pegar enlaces publicos o guardar archivos pequenos temporalmente, pero que para publicar imagenes/PDF en internet falta conectar almacenamiento. Por eso el chip para URL HTTP dice `Enlace publico` y el chip para `data:` dice `Solo en este CMS`.
