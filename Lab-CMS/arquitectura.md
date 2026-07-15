# Lab-CMS - arquitectura

## Propósito

Panel administrativo Angular separado de la landing pública. Administra contenido, media, estilos, SEO, FAQs, certificaciones, usuarios, módulos, tenants seleccionados y reportes de auditoría mediante `lab-api`.

## Stack y comandos

- Angular 20 standalone, RxJS, formularios reactivos.
- Scripts clave: `start:local` en puerto 4300, `build:local`, `build:stage`, `test`.
- Fuente: `Lab-CMS/package.json`.

## Arquitectura vista

```text
src/app/
|-- core/
|   |-- auth/
|   |   |-- guards/
|   |   |-- interceptors/
|   |   |-- models/
|   |   |-- services/
|   |   `-- utils/
|   |-- context/
|   |-- http/
|   `-- layout/cms-shell/
|-- data-access/
|   |-- contracts/
|   `-- services/
|-- features/
|   |-- account/
|   |-- audit-reports/
|   |-- certifications/
|   |-- dashboard/
|   |-- faqs/
|   |-- invitation-accept/
|   |-- landing/
|   |-- landing-composition/
|   |-- login/
|   |-- media/
|   |-- seo/
|   |-- styles/
|   |-- systems/
|   `-- users/
`-- shared/
```

## Responsabilidades

- `core/auth/services`: login, sesión, lectura/escritura de `sessionStorage`.
- `core/auth/guards`: autenticación, acceso CMS, permisos y selección de tenant.
- `core/auth/interceptors`: Bearer token y limpieza de sesión ante `401`.
- `core/http/tenant-context.interceptor.ts`: agrega `X-Tenant-Slug` desde tenant activo.
- `core/context`: contexto CMS, enums del sistema y módulos disponibles.
- `core/layout/cms-shell`: shell y navegación filtrada por permisos.
- `data-access/contracts`: DTOs y tipos compartidos con API.
- `data-access/services`: frontera HTTP por módulo.
- `features`: pantallas; coordinan formularios y llaman servicios/facades, pero no deben mezclar contratos complejos en UI.

## Data-access

El CMS concentra consumo HTTP en servicios por módulo:

- `AuthApiService`
- `PublicSiteApiService`
- `SystemApiService`
- `LandingCmsApiService`
- `SettingsCmsApiService`
- `UsersCmsApiService`
- `AuditReportsCmsApiService`
- `FaqsCmsApiService`
- `CertificationsCmsApiService`

Esta separación permite cambiar endpoint/DTO sin tocar todas las páginas. Para módulos con transformación pesada conviene agregar `adapters` y `facades`, como ya se usa en `lab-frontend`.

## Permisos y seguridad

- `authGuard`: requiere sesión.
- `cmsAccessGuard`: valida acceso administrativo.
- `permissionGuard`: valida permiso requerido por ruta.
- `moduleGuard`: valida que el tenant tenga el módulo habilitado.
- `tenantSelectionGuard`: evita operar sin tenant activo.
- Login usa `encryptLoginPassword` antes de enviar credenciales.
- Token Bearer via interceptor.
- `sessionStorage`, no `localStorage`, para sesión inicial.

## Calidad

- Buen aislamiento entre shell, contexto, data-access y features.
- Tests en guards, contexto y crypto de login.
- Navegación filtrada por permisos desde `cms-navigation.ts`.
- Falta documentación propia más allá del README generado; conviene reemplazar el boilerplate por una guía real del CMS.

## Errores y mejoras detectadas

- `README.md` aún es el generado por Angular CLI; no explica arquitectura real ni flujos.
- Algunas páginas consumen servicios API directamente; si crece el estado, agregar facades por feature.
- Duplicar permisos en frontend puede desincronizarse; conviene seguir leyendo enums/defaults desde `SystemApiService`.
- Para media y composición visual, evitar HTML/CSS libre; mantener DTOs estructurados.

## Rutas fuente clave

- `src/app/app.routes.ts`
- `src/app/app.config.ts`
- `src/app/core/auth/*`
- `src/app/core/context/*`
- `src/app/core/layout/cms-shell/*`
- `src/app/data-access/contracts/*`
- `src/app/data-access/services/*`
- `src/app/features/users/users-page.ts`
- `src/app/features/landing-composition/*`
