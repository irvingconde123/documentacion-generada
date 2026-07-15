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
- Coordinacion: `coordinacion`

## Base de datos

- Variable actual: `DATABASE_URL`.
- Compatibilidad temporal: el API tambien debe aceptar `DATABASE_OPERATIONAL_URL`
  mientras se migran scripts/documentacion viejos.
- Rama Neon objetivo: `production_ecosistemaNegocio`.
- El CLI de Neon fue reapuntado por el usuario a otra cuenta/proyecto; la rama
  `production_ecosistemaNegocio` tambien fue creada/confirmada ahi el
  2026-07-15.
- Tabla usada por CMS/Landing: `public_site_mirrors`.
- No escribir connection strings con secretos en documentacion, commits ni logs.

## Servidores locales esperados

```powershell
cd repos/api
$env:DATABASE_URL="<neon-postgres-url>"
npm run start:prod

cd repos/cms
npm run dev -- -p 4200

cd repos/landing
npm run dev -- -p 3002
```

Puertos:

- API: `http://localhost:3000/v1`
- Swagger: `http://localhost:3000/docs`
- CMS: `http://localhost:4200`
- Landing: `http://localhost:3002`

## Usuario local CMS

- Correo: `irving.condem@gmail.com`
- Password local seed: revisar `repos/cms/src/lib/session.ts`.

## Flujo que debe seguir funcionando

1. Entrar al CMS.
2. Editar paginas, menu, estilos y bloques.
3. Agregar/reordenar/eliminar secciones.
4. Publicar sitio.
5. Reiniciar API.
6. Confirmar que `GET /v1/public/demo/site` conserva marca, menu, paginas y bloques.
7. Abrir landing y confirmar que renderiza el contenido publicado.
8. Confirmar metadata SEO en landing: title, description y `og:image` deben
   salir desde `page.seo` cuando exista.

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
2. Crear modulo Media real: biblioteca, URLs, alt text y reutilizacion.
3. Endurecer endpoints CMS: auth/guards, permisos y validacion runtime.
4. Ajustar editor espejo para posicionamiento fino sin depender de convenciones
   en `settings`.
5. Automatizar pruebas de integracion, seguridad, SQL injection y estres.
