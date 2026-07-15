# lab-frontend - errores, mejoras e ideas

## Errores o riesgos vistos

- `README.md` es boilerplate; el documento útil es `PUBLIC_LANDING_FRONTEND_HANDOFF.md`.
- Existen dos líneas de implementación (`features/landing` y `features/site`), lo que puede confundir ownership futuro.
- Renderizar automáticamente todo por `sortOrder` sin una estrategia de placement puede romper diseño.
- Construir URLs adivinando IDs de media es frágil; media debe venir expandida o resolverse por servicio.
- Aceptar HTML/CSS libre desde CMS rompería seguridad y consistencia responsive.

## Mejoras pendientes

- Declarar `features/site` como línea oficial y marcar `features/landing` como legado si ya no se usa.
- Crear README real con arquitectura, bootstrap, renderers, media, SEO y comandos.
- Mantener o ampliar tests de adapter, renderer registry, style resolver y page resolver.
- Agregar contratos públicos de media completos antes de depender de uploads en landing.
- Agregar estados visuales consistentes: loading, empty, error y 404.

## Ideas reutilizables

- Un solo bundle multi-tenant alimentado por `/api/public/site`.
- `sectionType` desde CMS, pero renderer compilado y seguro en Angular.
- DTO externo nunca llega directo a template; pasa por adapter y modelo interno.
- Estilos del CMS pasan por allowlist y tokens.
- SEO centralizado por ruta desde bootstrap público.

## Fuentes

- `PUBLIC_LANDING_FRONTEND_HANDOFF.md`
- `src/app/data-access/adapters/public-site.adapter.ts`
- `src/app/features/site/rendering/section-renderer.registry.ts`
- `src/app/features/site/rendering/section-style.resolver.ts`
- `src/app/features/site/pages/site-page.resolver.ts`
- `src/app/shared/media/safe-media.ts`
