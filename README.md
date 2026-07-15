# Contexto de documentación generada

Esta carpeta concentra conocimiento reutilizable de los proyectos revisados en `C:\Users\irvin\OneDrive\Documentos\LabApp`.
Sirve como base de consulta para crear proyectos nuevos sin repetir errores de arquitectura, scroll/layout, seguridad, permisos, persistencia local, CMS, tenants o desacoplamiento de acceso a datos.

## Estructura

```text
documentación_generada/
|-- README.md
|-- operacion/
|   `-- inventario-labapp.md
|-- patrones_reutilizables/
|   |-- data-access-adaptadores.md
|   |-- limites-calidad.md
|   |-- seguridad-permisos-tenancy.md
|   `-- offline-sync-persistencia.md
|-- hostlyc-backend-adastra/
|   |-- arquitectura.md
|   `-- errores-mejoras-ideas.md
|-- hostlyc-frontend-adastra/
|   |-- arquitectura.md
|   `-- errores-mejoras-ideas.md
|-- lab-api/
|   |-- arquitectura.md
|   `-- errores-mejoras-ideas.md
|-- Lab-CMS/
|   |-- arquitectura.md
|   `-- errores-mejoras-ideas.md
|-- lab-frontend/
|   |-- arquitectura.md
|   `-- errores-mejoras-ideas.md
`-- irving-conde-portfolio/
    |-- errores/
    |-- soluciones/
    |-- ideas/
    `-- patrones-reutilizables.md
```

## Dónde buscar

- `operacion/inventario-labapp.md`: mapa rápido de los proyectos revisados y qué se ignoró.
- `*/arquitectura.md`: arquitectura, responsabilidades, carpetas, seguridad, calidad, errores y mejoras por proyecto.
- `*/errores-mejoras-ideas.md`: riesgos, pendientes y oportunidades extraídas de MDs y código.
- `patrones_reutilizables/`: decisiones que conviene copiar a proyectos nuevos: `data-access`, límites de tamaño, permisos, tenancy, offline y sincronización.
- `gobernanza_proyectos/`: reglas y plantillas reutilizables para gobierno, coordinación de agentes, contratos y seguimiento de estado.
- `irving-conde-portfolio/errores`: problemas vistos en demos, scroll, navegación y visuales.
- `irving-conde-portfolio/soluciones`: fixes implementados y checklist de QA.
- `irving-conde-portfolio/ideas`: ideas de proyectos para exponer en el portafolio.

## Regla de uso

Antes de iniciar un proyecto nuevo, revisar primero `patrones_reutilizables`. Después buscar un proyecto parecido:

- App offline/híbrida: `hostlyc-frontend-adastra`.
- API operativa con sync, auditoría e idempotencia: `hostlyc-backend-adastra`.
- API multi-tenant CMS/publica: `lab-api`.
- Panel administrativo Angular: `Lab-CMS`.
- Landing pública CMS-driven: `lab-frontend`.
- Portafolio/demos visuales y QA de scroll: `irving-conde-portfolio`.

## Proyectos ignorados

`Sistema_Laboratorio` se dejó fuera porque el usuario indicó que es equivalente a `hostlyc-x-adastra`.
