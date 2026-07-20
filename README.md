# Contexto de documentación generada

Esta carpeta concentra conocimiento reutilizable de los proyectos revisados en `C:\Users\irvin\OneDrive\Documentos\LabApp`.
Sirve como base de consulta para crear proyectos nuevos sin repetir errores de arquitectura, scroll/layout, seguridad, permisos, persistencia local, CMS, tenants o desacoplamiento de acceso a datos.

## Estructura

```text
documentación_generada/
|-- README.md
|-- prompt_generar_encarpetado_optimizado.md
|-- agentes/
|   |-- README.md
|   |-- agente_arquitecto.md
|   |-- agente_calidad_qa.md
|   |-- agente_dba.md
|   |-- agente_desarrollador_backend.md
|   |-- agente_desarrollador_frontend.md
|   |-- agente_diseñadorUX_UI.md
|   |-- agente_documentador.md
|   |-- agente_fullstack.md
|   |-- agente_integrador.md
|   |-- agente_project_manager.md
|   `-- agente_tester.md
|-- gobernanza_proyectos/
|   |-- README.md
|   |-- contratos-agentes.md
|   |-- estado-proyecto.md
|   |-- plantillas-trabajo.md
|   `-- reglas-del-juego.md
|-- operacion/
|   `-- inventario-labapp.md
|-- patrones_reutilizables/
|   |-- data-access-adaptadores.md
|   |-- limites-calidad.md
|   |-- seguridad-permisos-tenancy.md
|   `-- offline-sync-persistencia.md
|-- planeación_arquitecturas/
|   |-- README.md
|   |-- arquitectura-c4.md
|   |-- contratos-agentes.md
|   |-- dudas-y-decisiones.md
|   |-- estado-proyecto.md
|   |-- estructura-carpetas-reales.md
|   |-- mapa-modulos.md
|   |-- plantilla-monorepo.md
|   |-- plantillas-trabajo.md
|   |-- reglas-del-juego.md
|   |-- roadmap-sprints.md
|   |-- api/
|   |-- cms/
|   |-- landing/
|   `-- sistema-hibrido/
|-- ecosistema-negocios-2026/
|   |-- README.md
|   |-- coordinacion/
|   |   |-- README.md
|   |   |-- continuidad-operativa.md
|   |   |-- contratos-agentes.md
|   |   |-- estado-proyecto.md
|   |   |-- hostlyc-clone-runbook.md
|   |   |-- plan-pruebas-integracion.md
|   |   |-- smtp-google.md
|   |   |-- tester-hostlyc-clone.md
|   |   `-- reportes-tester/
|   `-- repos/
|       |-- api/docs/api-contracts.md
|       |-- cms/docs/cms-mvp.md
|       |-- landing/docs/landing-mvp.md
|       `-- shared-contracts/docs/contracts.md
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
    |-- README.md
    |-- patrones-reutilizables.md
    |-- errores/
    |-- soluciones/
    `-- ideas/
```

## Dónde buscar

- `agentes/`: roles reutilizables para planear, diseñar, construir, integrar, probar, auditar, documentar y coordinar trabajo. Incluye el nuevo `agente_tester.md` para pruebas de usuario no técnico.
- `prompt_generar_encarpetado_optimizado.md`: prompt base para generar documentación estructurada y reutilizable.
- `operacion/inventario-labapp.md`: mapa rápido de los proyectos revisados y qué se ignoró.
- `*/arquitectura.md`: arquitectura, responsabilidades, carpetas, seguridad, calidad, errores y mejoras por proyecto.
- `*/errores-mejoras-ideas.md`: riesgos, pendientes y oportunidades extraídas de MDs y código.
- `patrones_reutilizables/`: decisiones que conviene copiar a proyectos nuevos: `data-access`, límites de tamaño, permisos, tenancy, offline y sincronización.
- `gobernanza_proyectos/`: reglas y plantillas reutilizables para gobierno, coordinación de agentes, contratos y seguimiento de estado.
- `planeación_arquitecturas/`: blueprint de arquitectura para ecosistema modular con API, CMS, landing, sistema híbrido, contratos, roadmap y estructura de carpetas.
- `ecosistema-negocios-2026/`: documentación viva del ecosistema 2026, coordinación operativa, contratos, pruebas de integración y documentos por repo (`api`, `cms`, `landing`, `shared-contracts`).
- `irving-conde-portfolio/errores`: problemas vistos en demos, scroll, navegación y visuales.
- `irving-conde-portfolio/soluciones`: fixes implementados y checklist de QA.
- `irving-conde-portfolio/ideas`: ideas de proyectos para exponer en el portafolio.

## Regla de uso

Antes de iniciar un proyecto nuevo, revisar en este orden:

1. `agentes/README.md` para elegir los roles correctos.
2. `patrones_reutilizables/` para copiar decisiones ya depuradas.
3. `gobernanza_proyectos/` o `planeación_arquitecturas/` para contratos, reglas, plantillas y estructura.
4. `ecosistema-negocios-2026/` si el trabajo pertenece al ecosistema actual.
5. Un proyecto parecido para tomar contexto concreto:

- App offline/híbrida: `hostlyc-frontend-adastra`.
- API operativa con sync, auditoría e idempotencia: `hostlyc-backend-adastra`.
- API multi-tenant CMS/publica: `lab-api`.
- Panel administrativo Angular: `Lab-CMS`.
- Landing pública CMS-driven: `lab-frontend`.
- Portafolio/demos visuales y QA de scroll: `irving-conde-portfolio`.

Para cerrar una entrega visible, usar `agente_tester.md` además de QA cuando haya que comprobar usabilidad real, scroll, responsive, botones, formularios, interrupciones y manual de usuario.

## Proyectos ignorados

`Sistema_Laboratorio` se dejó fuera porque el usuario indicó que es equivalente a `hostlyc-x-adastra`.
