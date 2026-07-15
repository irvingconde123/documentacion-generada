# Lab-CMS - errores, mejoras e ideas

## Errores o riesgos vistos

- `README.md` es boilerplate de Angular CLI y no explica el CMS real.
- Algunas pantallas consumen servicios API directamente; si crece el estado, se puede volver difícil coordinar loading/error/dirty state.
- Permisos duplicados en frontend pueden desincronizarse si no se siguen leyendo enums/defaults desde la API.
- Operar sin tenant activo puede contaminar contexto; por eso existe `tenantSelectionGuard`.

## Mejoras pendientes

- Crear README real del CMS: flujos, permisos, tenants, módulos, comandos y arquitectura.
- Agregar facades por feature cuando los formularios crezcan.
- Mantener navegación y formularios alimentados por `SystemApiService` para evitar enums hardcodeados.
- Agregar pruebas de rutas protegidas por combinaciones de permiso + módulo.
- Agregar preview de landing y validaciones visuales antes de publicar cambios.

## Ideas reutilizables

- Panel CMS separado de landing pública para aislar bundle, seguridad, SEO y despliegues.
- `cms-shell` con navegación filtrada por permisos.
- `sessionStorage` para sesión inicial y limpieza automática ante `401`.
- `X-Tenant-Slug` desde tenant activo en local/test, nunca como decisión visual.

## Fuentes

- `src/app/app.routes.ts`
- `src/app/core/auth/guards/*`
- `src/app/core/context/*`
- `src/app/core/layout/cms-shell/cms-navigation.ts`
- `src/app/data-access/services/*`
