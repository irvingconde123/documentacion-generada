# lab-frontend - arquitectura

## Propósito

Landing pública Angular multi-tenant. Usa un solo bundle para distintos negocios; el contenido, módulos, navegación, estilos, media y SEO vienen desde `lab-api`.

## Stack y comandos

- Angular 20, standalone components, RxJS.
- Scripts clave: `start:local`, `start:stage`, `build:local`, `build:stage`, `test`.
- Fuente: `lab-frontend/package.json`.

## Arquitectura vista

```text
src/app/
|-- core/http/
|   `-- tenant-context.interceptor.ts
|-- data-access/
|   |-- adapters/
|   |-- contracts/
|   |-- models/
|   |-- repositories/
|   |-- resolvers/
|   `-- sources/
|-- features/
|   |-- landing/
|   `-- site/
|       |-- navigation/
|       |-- pages/
|       |-- rendering/
|       |   |-- sections/
|       |   |-- section-renderer.registry.ts
|       |   `-- section-style.resolver.ts
|       `-- services/
`-- shared/media/
```

## Responsabilidades

- `core/http/tenant-context.interceptor.ts`: agrega `X-Tenant-Slug` solo en local.
- `data-access/contracts`: DTOs externos de `/api/public/site`.
- `data-access/adapters`: normalización de DTO a modelo interno.
- `data-access/repositories`: consume sources y entrega modelos listos.
- `features/site/services/site.facade.ts`: estado de bootstrap público.
- `features/site/pages/site-page.resolver.ts`: resuelve ruta pública contra páginas del CMS.
- `features/site/rendering/section-renderer.registry.ts`: mapea `sectionType` a componente Angular.
- `shared/media/safe-media.ts`: render seguro de imagen/video/documento.

## Data-access CMS/local/API

Hay dos líneas:

1. Línea actual CMS/API: `PublicSiteApiSource -> adaptPublicSite -> PublicSiteRepository -> SiteFacade -> Page/Renderer`.
2. Línea previa/local: `LandingLocalSource` y `LandingApiSource` con `LandingContentRepository`.

La regla reutilizable es no usar DTOs externos directo en templates. Adaptar primero a modelos internos con defaults, mapas y sets.

## Render dinámico seguro

El CMS decide contenido y `sectionType`, pero Angular decide qué componente renderiza. Si llega un tipo desconocido, el registro usa `InfoSection` como fallback.

Renderers actuales detectados:

- `hero-section`
- `info-section`
- `contact-section`
- `services-grid-section`
- `mission-section`

`SectionStyleResolver` filtra estilos permitidos. No se ejecuta HTML arbitrario ni CSS libre.

## Tenancy y contenido

La landing no debe condicionar diseño por `tenant.slug`. El tenant se resuelve en API por dominio; en local se envía `X-Tenant-Slug: default`. El bootstrap público debe incluir solo módulos habilitados para ese tenant.

## Seguridad y calidad

- URLs de media pasan por `SafeMedia` y pipes de URL segura.
- Protocolos peligrosos como `javascript:`/`data:` deben bloquearse.
- SEO centralizado en `SeoMetadataService`.
- Tests en adapter, renderer registry, style resolver y page resolver.
- La landing pública no debe importar código CMS ni exponer endpoints administrativos.

## Errores y mejoras detectadas

- `README.md` aún es boilerplate de Angular; el handoff real está en `PUBLIC_LANDING_FRONTEND_HANDOFF.md`.
- Mantener dos líneas (`features/landing` y `features/site`) puede confundir; conviene marcar la línea nueva como oficial y deprecar la anterior.
- Para media, no adivinar URLs por ID; resolver siempre vía DTO público o fallback local.
- No renderizar todo por `sortOrder` sin estrategia; encapsular placement por página/región.

## Rutas fuente clave

- `PUBLIC_LANDING_FRONTEND_HANDOFF.md`
- `src/app/data-access/sources/public-site-api.source.ts`
- `src/app/data-access/adapters/public-site.adapter.ts`
- `src/app/data-access/repositories/public-site.repository.ts`
- `src/app/features/site/services/site.facade.ts`
- `src/app/features/site/rendering/section-renderer.registry.ts`
- `src/app/features/site/rendering/section-style.resolver.ts`
- `src/app/shared/media/safe-media.ts`
