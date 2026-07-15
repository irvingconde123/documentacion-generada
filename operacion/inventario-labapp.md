# Inventario LabApp

Fecha de revisión: 2026-07-12.

## Proyectos revisados

| Proyecto | Tipo | Rol |
| --- | --- | --- |
| `hostlyc-backend-adastra` | API NestJS operativa | Sincronización, reportes, rutas, identidad, RBAC, auditoría e idempotencia. |
| `hostlyc-frontend-adastra` | Angular/Ionic/Capacitor/Electron | App offline/híbrida de operaciones Adastra. |
| `lab-api` | API NestJS + Prisma | API multi-tenant para CMS, landing pública, usuarios, permisos, auditoría y rate limits. |
| `Lab-CMS` | Angular CMS | Panel administrativo separado para contenido, usuarios, media, estilos, SEO y auditoría. |
| `lab-frontend` | Angular landing pública | Landing multi-tenant alimentada por API/CMS con renderers seguros. |
| `irving-conde-portfolio` | Angular/Ionic portfolio | Portafolio y demos, ya documentado previamente por errores/fixes/ideas. |

## Proyecto ignorado

`Sistema_Laboratorio` se ignoró por instrucción explícita, al ser equivalente a `hostlyc-x-adastra`.

## Fuentes consultadas

- `package.json` de cada proyecto para stack, scripts y comandos.
- MDs de arquitectura, ADR, roadmap, notas, seguridad, storage y handoff.
- Búsquedas de código sobre `core`, `data-access`, `guards`, `interceptors`, `tenant`, `permissions`, `sync`, `storage`, `Prisma`, `Audit`, `RateLimit`, `Repository`, `Source`, `Adapter` y `Facade`.

## Lectura recomendada

1. Leer `patrones_reutilizables/limites-calidad.md`.
2. Elegir la arquitectura base según el tipo de producto.
3. Revisar el proyecto más parecido.
4. Copiar estructura y reglas, no necesariamente implementación.
