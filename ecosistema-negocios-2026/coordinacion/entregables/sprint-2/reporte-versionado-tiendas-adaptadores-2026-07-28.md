# Versionado Central De Tiendas Y Adaptadores Diferidos

Fecha: 2026-07-28

## Resultado

Las tiendas ya no dependen de un borrador local para su flujo principal. El
CMS administra documentos `store-site` versionados e inmutables en Neon:

```text
CMS -> VPC Front -> API Back -> Data Access -> Neon
```

Rutas nuevas:

- `GET /cms/businesses/:businessId/rendering/workspace`
- `PUT /cms/businesses/:businessId/rendering/draft`
- `POST /cms/businesses/:businessId/rendering/publish`
- `GET /cms/businesses/:businessId/rendering/versions`
- `POST /cms/businesses/:businessId/rendering/restore`

`expectedDraftVersion` aplica concurrencia optimista. Una restauracion no
modifica la version historica: copia su payload a un borrador nuevo.

La publicacion es una sola operacion CTE en Data Access. Actualiza el puntero
publicado y `platform_store_rendering`, incrementa `renderingContentVersion` y
marca la tienda `ready`.

## CMS

- Muestra borrador y version publicada.
- Guarda centralmente y mantiene archivo local solo como contingencia.
- `Publicar` guarda primero el formulario actual y publica esa version.
- Lista historial y permite restaurar.
- Selecciona imagenes activas HTTPS desde Biblioteca Media.
- Mantiene URL manual para imagenes externas.
- Rechaza `data:` como recurso publicable.
- Drag desktop inicia solo desde el asa.
- Mobile usa selector de posicion y conserva flechas accesibles.
- Contenido, presentacion e historial usan acordeones.

## Prueba E2E

Tienda: `taller-verde-e2e-dzf9rc85`.

1. Se migro el rendering publico a borrador central version 1.
2. Una escritura con version obsoleta devolvio `409`.
3. Se guardo una modificacion temporal en version 2.
4. Antes de publicar, la lectura publica no cambio.
5. La publicacion temporal produjo rendering version 5.
6. Restaurar version 1 creo borrador version 3.
7. El publico no cambio hasta republicar.
8. La republicacion restauro el contenido original en rendering version 6.
9. Desde el CMS se guardo version 5 y se publico version 6.
10. El rendering final quedo en version 7 con el contenido original.

No se generaron nuevos errores de persistencia de auditoria. El sanitizador de
Data Access acepta ahora su marcador `_truncated` al alcanzar el limite global
de campos.

## Responsive

En `320x700`:

- ancho documento/viewport: `320/320`;
- alto inicial del editor: `1071 px`, `1.53` viewports;
- acordeones abiertos inicialmente: 1;
- selectores tactiles al abrir presentacion: 5;
- asas desktop visibles en mobile: 0;
- overlay de Next.js: no;
- errores de navegador: no.

Evidencias: `test-results/cms-versioning/`.

## Limites De Servicios Externos

| Capacidad | Puerto/adaptador actual | Estado |
|---|---|---|
| Rate limit | `RateLimitPort`, local y deferred | Redis no conectado |
| Media | biblioteca local y selector HTTPS | storage binario no conectado |
| Pagos | contenido informativo por tienda | Stripe no conectado |
| Contacto | persistencia por tenant | correo externo no conectado |
| Invitaciones | outbox y delivery port existentes | sin cambios en este lote |

No se agregaron SDKs, credenciales ni llamadas a Stripe, Redis, S3, Firebase o
un proveedor nuevo de correo.

## Calidad

| Proyecto | Resultado |
|---|---|
| Data Access | 19 suites, 119 pruebas, lint, size y build |
| API Back | 32 suites, 105 pruebas, lint, size y build |
| VPC Front | 45 unitarias, 9 E2E, lint, format, size y build |
| CMS | lint, 103 archivos dentro del limite y build |

