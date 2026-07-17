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

1. Completar publicacion versionada: borrador vs publicado.
2. Completar SMTP para contrasenas temporales y sumar storage binario para Media.
3. Publicar `@ecosistema/site-renderer` como paquete interno versionado en vez de tarball local.
4. Endurecer endpoints CMS: auth/guards, permisos y validacion runtime. Hoy las mutaciones administrativas usan `requestedByUserId` y validacion de rol contra usuarios persistidos.
5. Ajustar editor espejo para posicionamiento fino sin depender de convenciones
   en `settings`.
6. Automatizar pruebas de integracion, seguridad, SQL injection y estres.
7. Refinar UX de Vista espejo: agregar indicador de cambios sin guardar y mejorar
   posicionamiento de paneles flotantes cuando el preview esta angosto.

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

## Repositorios de documentacion

- Documentacion generada publica:
  `https://github.com/irvingconde123/documentacion-generada`
- Coordinacion privada del proyecto:
  `https://github.com/irvingconde123/ecosistema-negocios-2026-docs`
- Antes de cerrar una funcion, sincronizar `coordinacion` y docs relevantes en:
  `C:\Users\irvin\OneDrive\Escritorio\documentación_generada\ecosistema-negocios-2026`
