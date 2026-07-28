# E2E CMS Hostlyc E Hidratacion

Fecha: 2026-07-28

## Resultado

Estado: aprobado.

- La cuenta del propietario autentica mediante VPC.
- La identidad administra varios negocios y aparece como `owner` de Hostlyc.
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

CMS, VPC y el HTML del front devolvieron el mismo contenido editorial. Al
detener CMS temporalmente, el front mostro el respaldo local; al restaurarlo,
volvio al contenido administrado sin recompilar ni redesplegar.

## Responsive Y Scroll

Viewports: `390x844`, `768x1024`, `1440x900`.

- Login, selector, editor, acceso y front padre sin overflow horizontal.
- Scroll vertical completo en movil y tableta.
- En escritorio se corrigieron inputs que excedian el panel derecho; la
  medicion final fue `scrollWidth=innerWidth` y cero elementos fuera del
  viewport.

Evidencia:

- `logs/screenshots/e2e-cms-hostlyc-2026-07-28`
- `logs/screenshots/e2e-cms-hostlyc-final-2026-07-28`

## Seguridad Y Calidad

- La contraseña no se guarda en documentacion ni aparece en HTML.
- La sesion CMS usa AES-256-GCM y cookie `HttpOnly`.
- API Back rechaza HTML, campos adicionales y URLs inseguras.
- Se revisaron 25 campos sensibles de auditoria: cero sin redaccion.
- API Back: 31 suites, 98 pruebas y 175 archivos TypeScript bajo 300 lineas.
- CMS: lint y build aprobados.

## Pendiente

Persistir versiones draft/published del contenido CMS en la ruta Hostlyc
protegida; hoy la escritura editorial usa estado local y sincronizacion legada.
