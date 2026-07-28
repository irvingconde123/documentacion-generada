# E2E CMS Hostlyc E Hidratacion

Fecha: 2026-07-28

## Resultado

Estado: aprobado.

- La identidad indicada por el propietario autentica mediante VPC.
- La cuenta administra varios negocios y aparece como `owner` de Hostlyc.
- El negocio canónico es `prv_01KYKS1GNT3MR0ZW30FXEDVP33`, tenant
  `hostlyc-fxedvp33`.
- `Editar sitio` abre el workspace Hostlyc y `/access` abre miembros e
  invitaciones.
- El CMS materializa de forma idempotente un workspace que aun no exista.
- Las sesiones VPC usan el workspace CMS como fuente editorial; el sitio demo
  de la API legada no puede reemplazarlo.

## Hidratacion

Flujo verificado:

```text
GET parent :4400
  -> GET VPC :4100/platform/content/home
  -> GET API Back :4200/internal/content/platform/home
  -> GET CMS :4500/api/platform/content/home
```

Los tres niveles devolvieron el mismo texto editorial:

```text
Descubre tiendas con identidad propia, compra cerca de ti y administra el
contenido de Hostlyc desde un solo lugar.
```

El HTML de `4400` contiene ese valor y no contiene la descripcion del fallback.
Al detener CMS temporalmente, el front mostro el respaldo local; al restaurar
CMS, volvio al contenido administrado sin recompilar ni redesplegar.

## Responsive Y Scroll

Viewports: `390x844`, `768x1024`, `1440x900`.

- Login, selector, editor, acceso y front padre sin overflow horizontal.
- Scroll vertical completo en movil y tableta.
- En escritorio se corrigieron inputs que excedian el panel derecho; la
  medicion final fue `scrollWidth=innerWidth` y cero elementos fuera del
  viewport.
- El tester detecto una descripcion concatenada en el preview despues de la
  publicacion automatizada. Se corrigieron `pages` y `sitePages`; una sesion
  nueva confirmo el texto final una sola vez.
- El sistema hibrido tambien corrigio su doble padding movil; 390 y 768 px
  terminaron con `scrollWidth` igual al viewport.

Evidencia:

- `logs/screenshots/e2e-cms-hostlyc-2026-07-28`
- `logs/screenshots/e2e-cms-hostlyc-final-2026-07-28`

## Seguridad Y Auditoria

- La contraseña no se guarda en documentacion ni aparece en HTML.
- La sesion CMS se cifra con AES-256-GCM y la cookie es `HttpOnly`.
- La cookie `Secure` solo se desactiva explicitamente para HTTP local.
- API Back limita contenido CMS a 256 KiB y rechaza HTML, campos adicionales y
  URLs inseguras.
- Neon registro login, aprovisionamiento y fallos controlados de contenido.
- Se revisaron 25 campos sensibles en snapshots recientes: cero quedaron sin
  redaccion.

## Calidad

- API Back: 31 suites, 98 pruebas, lint, build y 175 archivos TypeScript bajo
  el limite de 300 lineas.
- CMS: lint, build y control de tamano aprobados; 77 archivos TypeScript
  revisados y ninguno supera 300 lineas.
- Sistema hibrido: typecheck, build Vite y responsive aprobados.

## Revalidacion De Cierre

Despues de compilar y versionar el CMS se repitio la cadena por HTTP:

- `POST :4100/auth/login`: `200`.
- `GET :4100/cms/businesses`: dos negocios; Hostlyc presente como `owner`.
- CMS y VPC: `schemaVersion: 1` y descripcion editorial identica.
- Front padre: `data-content-source="cms"`, descripcion editorial presente y
  fallback ausente.

Commit CMS publicado en `hostlyc_reestructuracion`:
`7d8fcf0 feat: integrate hostlyc cms access and content`.

## Pendiente

La escritura editorial aun se conserva en el estado local del CMS y se
sincroniza con la API legada. El siguiente corte debe persistir versiones
draft/published en la ruta Hostlyc protegida.
