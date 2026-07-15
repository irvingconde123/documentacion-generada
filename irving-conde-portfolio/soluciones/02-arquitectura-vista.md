# Arquitectura vista del portafolio

## Proposito

Portafolio profesional construido con Angular, Ionic, TypeScript y SCSS. Presenta perfil, experiencia, casos de estudio y demos sanitizadas.

## Organizacion

- `src/app/home`: landing principal.
- `src/app/demo`: shell de demos y componentes interactivos.
- `src/app/case-study`: casos de estudio con arquitectura, evidencia y decisiones.
- `src/app/data`: contenido tipado del portafolio.
- `src/app/seo`: metadatos, rutas SEO y redirecciones legacy.
- `src/styles`: estilos globales y parciales por dominio visual.

## Rutas principales

- `/`
- `/casos/adastra`
- `/casos/plataforma-contenido`
- `/casos/gateway-datos`
- `/casos/hostlyc`
- `/demos/adastra`
- `/demos/landing`
- `/demos/cms`
- `/demos/hostlyc`

## Demos

- `DemoPage` selecciona demo por `slug` y controla viewport simulado.
- `AdastraDemoComponent`: operacion offline-first, reportes, capturas y borradores.
- `CmsDemoComponent`: CMS editorial, modulos, medios, SEO y publicacion.
- `LandingDemoComponent`: landing de laboratorio con secciones.
- `HostlycDemoComponent`: landing comercial con navegacion y conversion.

## Riesgos de mantenimiento

- `_shell.scss` concentra muchas excepciones responsive.
- `PROJECTS`, `CASE_STUDIES`, SEO, sitemap y prerender pueden desincronizarse.
- `src/app/architecture` parece legado frente a la ruta actual de casos.
- Las demos usan DOM directo para scroll; aceptable para demo, pero debe probarse muy bien.

## Recomendacion

Crear una fuente unica de slugs/casos para derivar rutas, SEO, sitemap y prerender. Separar progresivamente `_shell.scss` por responsabilidades: dispositivo, overlays, demo-specific y responsive.
