# Continuidad operativa

## Proposito

Este documento permite retomar el trabajo en otro chat sin depender del historial.
La fuente de verdad de estado sigue siendo `coordinacion/estado-proyecto.md`; este
archivo resume como levantar, validar y continuar el primer entregable funcional.

## Entregable prioritario actual

API + CMS + Landing conectados por contratos compartidos, con contenido editable
desde CMS, persistido en Neon y renderizado por la landing.

## Repos involucrados

- API: `repos/api`
- CMS: `repos/cms`
- Landing: `repos/landing`
- Contratos: `repos/shared-contracts`
- Renderer visual compartido: `repos/site-renderer`
- Coordinacion: `coordinacion`
- VPC Front Hostlyc: `hostlyc/hostlyc-vpc-front`
- API Back Hostlyc: `hostlyc/hostlyc-api-back`
- Data Access Hostlyc: `hostlyc/hostlyc-data-access`

## Hostlyc Sprint 1

El corte vertical nuevo vive separado del ecosistema anterior:

```text
POST /pagos/nueva_tienda
  -> VPC Front :4100
  -> API Back :4200
  -> Data Access :4300
```

Comandos de validacion:

```powershell
cd hostlyc/hostlyc-vpc-front
npm ci
npm run quality

cd ../hostlyc-api-back
npm ci
npm run quality

cd ../hostlyc-data-access
npm ci
npm run quality
npm run test:e2e
```

La evidencia, contratos y pendientes estan en
`coordinacion/sprints/hostlyc-sprint-1/`. No copiar secretos de los scripts
locales de smoke a `.env.example` ni GitHub.

## Hostlyc Sprint 2

Rama de trabajo en los repos involucrados:

```text
hostlyc_reestructuracion
```

Fuente de verdad:
`coordinacion/sprints/hostlyc-sprint-2/`.

Estado al 2026-07-27:

- Data Access acepta `DATABASE_URL` o URL por catalogo.
- La migracion versionada fue aplicada y verificada en Neon.
- El smoke VPC -> Back -> Data Access -> Neon paso; el fixture fue eliminado.
- HMAC v2 firma tambien caller, actor y permisos.
- La API CMS existente se reutilizara solo como servicio interno de contenido.
- Identity, tenant canonico, permisos y entitlements viviran en API Back.
- CMS, landings y producto padre deben consumir solamente VPC.

La URL Neon real vive en `hostlyc/hostlyc-data-access/.env`, ignorado por Git.
No copiarla a docs, commits, logs ni variables `NEXT_PUBLIC_*`. Como fue
compartida por chat, debe rotarse antes de un entorno compartido.

## Base de datos

- Variable actual: `DATABASE_URL`.
- La API carga `repos/api/.env` al iniciar mediante `dotenv/config`.
- Compatibilidad temporal: el API tambien debe aceptar `DATABASE_OPERATIONAL_URL`
  mientras se migran scripts/documentacion viejos.
- Rama Neon objetivo: `production_ecosistemaNegocio`.
- El CLI de Neon fue reapuntado por el usuario a otra cuenta/proyecto; la rama
  `production_ecosistemaNegocio` tambien fue creada/confirmada ahi el
  2026-07-15.
- Tabla usada por CMS/Landing: `public_site_mirrors`.
- No escribir connection strings con secretos en documentacion, commits ni logs.

## Correo SMTP

- Guia Google/Gmail: `coordinacion/smtp-google.md`.
- API usa `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`,
  `SMTP_PASSWORD` y `MAIL_FROM`.
- Si faltan variables SMTP, los reportes quedan en modo simulado para no romper
  desarrollo local.
- El `.env` real de `repos/api` es local y esta ignorado por Git; no subir
  secretos a documentacion ni repos.
- Antes de enviar un reporte real puede llamarse
  `POST /v1/cms/:tenantSlug/audit-reports/preview`; guarda HTML y CSV en
  `logs/audit-reports` sin enviar correo.

## Servidores locales esperados

```powershell
cd repos/api
$env:DATABASE_URL="<neon-postgres-url>"
npm run start:prod

cd repos/cms
npm run dev -- -p 4200

cd repos/landing
npm run dev -- -p 3100
```

Puertos:

- API: `http://localhost:3000/v1`
- Swagger: `http://localhost:3000/docs`
- CMS: `http://localhost:4200`
- Landing: `http://localhost:3100`

## Usuario local CMS

- Correo: `irving.condem@gmail.com`
- Password local seed: revisar `repos/cms/src/lib/session.ts`.

Este acceso es legado de desarrollo y no debe promoverse. Sprint 2 lo reemplaza
por Identity compartido y una sesion opaca segura.

## Flujo que debe seguir funcionando

1. Entrar al CMS.
2. Editar paginas, menu, estilos y bloques.
3. Gestionar Mi cuenta, usuarios y media desde sus secciones.
4. Agregar/reordenar/eliminar secciones.
5. Agregar al menu una pagina interna, una URL externa y un PDF/archivo descargable.
6. Para PDF/archivo descargable, crear primero un documento en Media y elegirlo desde
   "Páginas y menú" con "Elegir archivo guardado".
7. Publicar sitio.
8. Reiniciar API.
9. Confirmar que `GET /v1/public/demo/site` conserva marca, menu, paginas, bloques, `linkType` y orden.
10. Abrir landing y confirmar que renderiza el contenido publicado.
11. Confirmar metadata SEO en landing: title, description y `og:image` deben
   salir desde `page.seo` cuando exista.
12. En Vista espejo, probar edición inline sin depender del editor tradicional:
    cambiar un texto visible, cambiar color de botones, abrir "Editar servicios"
    o "Editar acreditaciones", editar tarjetas de lista con campos separados,
    cambiar una imagen por URL o selector Media, mover una sección y quitar una
    sección no crítica en un borrador de prueba.
13. Guardar borrador desde Vista espejo y confirmar que también se sincronizan
    los cambios de diseño cuando se editaron colores o marca desde el preview.

Fixture de prueba recomendado:

```powershell
$body = Get-Content logs\lab-reference-site.json -Raw
Invoke-RestMethod -Uri "http://localhost:3000/v1/public/demo/cms/site" -Method Put -ContentType "application/json; charset=utf-8" -Body $body
```

## Referencia visual obligatoria

Para trabajo de landing/CMS de laboratorio, revisar:

`C:\Users\irvin\OneDrive\Documentos\LabApp\hostlyc-frontend-adastra\docs\reference-images\Captura_*_Landing.jpg`

La landing de referencia no es solo contenido generico. Debe orientar el CMS hacia:

- Hero de laboratorio con imagen real, CTA y badges de confianza.
- Metricas de confianza.
- Franja de organismos/certificaciones.
- Servicios por area de analisis.
- Bloque institucional/mision.
- Acreditaciones y normas.
- CTA regulatorio.
- Footer claro.

El fixture `logs/lab-reference-site.json` ya modela esa estructura con bloques:
`hero`, `metricStrip`, `logoStrip`, `features`, `mission`, `accreditations`,
`ctaBand` y `footer`.

## Regla de agentes

- Si un cambio toca mas de un proyecto, usar agentes en paralelo.
- Antes de abrir agentes, revisar que esta documentacion y
  `coordinacion/estado-proyecto.md` esten al dia.
- Todo cambio frontend debe cerrar con auditoria UX/UI y capturas desktop/mobile.

## Validaciones minimas antes de cerrar turno

```powershell
cd repos/shared-contracts; npm run build
cd repos/site-renderer; npm run build
cd repos/api; npm run build; npm test -- --runInBand; npm run test:e2e -- --runInBand
cd repos/cms; npm run lint; npm run build
cd repos/landing; npm run lint; npm run build
```

Para frontend, tomar capturas al menos en:

- Desktop: `1366x768`
- Tablet: `1024x640`
- Mobile: `375x667`

## Pendientes inmediatos

1. Implementar Identity, sesiones, memberships, permisos y entitlements en API Back.
2. Resolver slug/dominio a provisioning ID sin fallback demo.
3. Crear `CmsContentPort` y adaptar `repos/api` como servicio interno firmado.
4. Sustituir cookie Base64 y usuarios locales del CMS por VPC/Identity.
5. Completar publicacion versionada: borrador vs publicado.
6. Completar SMTP para contrasenas temporales y sumar storage binario para Media.
7. Publicar `@ecosistema/site-renderer` como paquete interno versionado en vez de tarball local.
8. Endurecer endpoints CMS: auth/guards, permisos y validacion runtime.
5. Ajustar editor espejo para posicionamiento fino sin depender de convenciones
   en `settings`.
6. Automatizar pruebas de integracion, seguridad, SQL injection y estres.
7. Refinar UX de Vista espejo: agregar indicador de cambios sin guardar y mejorar
   posicionamiento de paneles flotantes cuando el preview esta angosto.
8. Continuar prueba `Hostlyc Clone Test`: el tenant `hostlyc-clon` ya existe, la landing local vive en `repos/landing-hostlyc` y el script `scripts/run-hostlyc-cms-smoke.mjs` genera movimientos reales. Falta implementar plantilla/contrato de agencia digital para clonar `https://hostlyc.com/` sin hardcodes de laboratorio.
9. Generalizar `@ecosistema/site-renderer`: separar textos/claims de laboratorio de la salida pública, permitir variantes por sección y texto enriquecido seguro para highlights dentro de H1.

## Reanudacion Hostlyc 2026-07-28

Estado funcional:

- APIs nuevas: `4100`, `4200`, `4300`.
- Front padre: `4400`.
- CMS: `4500`.
- Legacy: `3000`, `4600`, `4601`, `4700`.
- Rama: `hostlyc_reestructuracion`.
- Neon tiene migraciones `001` a `007`.
- Front padre usa documento CMS publicado; API CMS legacy queda como fallback.
- CMS permite borrador/publicacion central del producto padre.
- Tiendas publicadas de prueba:
  `tienda-invitaciones-ms40llyy-7w7sqnbe` y
  `taller-verde-e2e-dzf9rc85`.

Para retomar, leer primero:

1. `coordinacion/entregables/sprint-2/reporte-personalizacion-cms-tiendas-2026-07-28.md`.
2. `coordinacion/sprints/hostlyc-sprint-2/evidencias.md`.
3. `coordinacion/sprints/hostlyc-sprint-2/backlog.md`.
4. `coordinacion/reportes-tester/personalizacion-cms-tiendas-2026-07-28.md`.

Siguiente lote:

1. Draft central e historial visible para tiendas.
2. Storage binario y selector Media.
3. Adaptador Stripe y webhooks.
4. Notificacion de contactos por correo.
5. Redis productivo cuando exista infraestructura.

## Evidencia reciente

- Vista espejo CMS: `logs/screenshots/cms-mirror-1to1`.
- Media/PDF en menu y landing: `logs/screenshots/cms-media-menu`.
- Validacion ejecutada el 2026-07-15: `repos/cms npm run build`; Playwright temporal
  contra CMS `4200`, API `3000` y landing `3100`.
- Validacion ejecutada el 2026-07-17: `repos/cms npm run lint`, `repos/cms npm run build`,
  `repos/landing npm run lint`; Playwright local contra CMS `4200`, API `3000` y landing
  `3100`. Capturas: `logs/screenshots/cms-inline-mirror`.
- Validacion ejecutada el 2026-07-17: `repos/site-renderer npm run build`,
  `repos/cms npm run lint/build`, `repos/landing npm run lint/build`; capturas:
  `logs/screenshots/cms-shared-renderer`.
- Validacion ejecutada el 2026-07-20: `repos/site-renderer npm run check/build`,
  `repos/cms npm run build`, `repos/landing npm run build`,
  `repos/landing-hostlyc npm run build`. Servicios locales: API `3000`, CMS `4200`,
  landing Hostlyc `3101`. Capturas y evidencia en
  `logs/screenshots/hostlyc-clone-test` y reporte tester en
  `coordinacion/reportes-tester/hostlyc-clone-2026-07-20-inicial.md`.
  Smoke mutante: `node scripts/run-hostlyc-cms-smoke.mjs` produjo 16 eventos,
  5 backups y reporte local XLSX en `logs/audit-reports`.

## Repositorios de documentacion

- Documentacion generada publica:
  `https://github.com/irvingconde123/documentacion-generada`
- Coordinacion privada del proyecto:
  `https://github.com/irvingconde123/ecosistema-negocios-2026-docs`
- Antes de cerrar una funcion, sincronizar `coordinacion` y docs relevantes en:
  `C:\Users\irvin\OneDrive\Escritorio\documentación_generada\ecosistema-negocios-2026`
