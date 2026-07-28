# CMS Editor Del Front Padre Real

Fecha: 2026-07-28

## Resultado

Estado: aprobado.

El tenant canónico `hostlyc-fxedvp33` ya no usa el editor ni el preview
genérico de landings. `Mi sitio` detecta `siteKind: hostlyc-parent` y muestra:

- El contrato editorial completo de Hostlyc.
- Aviso, hero, imagen y acciones.
- Elementos de confianza, servicios y pasos.
- Planes, preguntas frecuentes y CTA final.
- Un iframe de `http://localhost:4400` con el front padre real.

Los demás tenants conservan el editor de landings existente.

## Prueba E2E

Flujo autenticado:

1. Login con la cuenta del propietario.
2. Selección del negocio Hostlyc.
3. Apertura de `Mi sitio`.
4. Confirmación de `Front padre Hostlyc` y `Vista real`.
5. Publicación reversible de un texto temporal.
6. Confirmación del cambio en CMS, VPC y HTML de `4400`.
7. Restauración del contenido original.

El front padre se marcó `force-dynamic`; el contenido CMS nuevo aparece en una
solicitud posterior sin recompilar ni redesplegar.

## Responsive

- `390x844`: `scrollWidth=390`, editor y preview sin overflow horizontal.
- `1440x900`: `scrollWidth=1440`, editor de 390 px y preview real visible.
- Consola y errores del navegador: sin hallazgos.

Evidencia:

- `logs/screenshots/cms-platform-editor-2026-07-28/mobile-content.png`
- `logs/screenshots/cms-platform-editor-2026-07-28/mobile-preview.png`
- `logs/screenshots/cms-platform-editor-2026-07-28/desktop-preview.png`

## Calidad Y Versionado

- CMS: lint, build y 83 archivos TypeScript bajo 300 líneas.
- Front padre: lint, typecheck, 41 pruebas, formato, tamaño y build.
- CMS: `ac486be feat: edit parent site content from cms`.
- Front padre: `1eaeb7e fix: hydrate parent home content per request`.

## Persistencia

El contenido queda persistido en el estado local del CMS mediante el puerto de
contenido de plataforma. Sigue pendiente mover borradores y publicaciones a
persistencia central versionada sin cambiar el contrato del editor.
