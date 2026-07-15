# lab-api - errores, mejoras e ideas

## Errores o riesgos vistos

- `README.md` conserva boilerplate de NestJS y no explica el proyecto real.
- `api_documentation_notes.md` menciona rutas antiguas como `public-landing/public-faqs`; el código actual usa `/api/public/*`.
- Soporte de `password` plano sigue como compatibilidad temporal y debe retirarse cuando los clientes usen `encryptedPassword`.
- Rate limit y cache en memoria sirven para local/instancia única, pero no para despliegues multi-instancia.
- Swagger público en producción debe protegerse o deshabilitarse según entorno.

## Mejoras pendientes

- Mover rate limit/cache/session/tenant cache a Redis u otro storage compartido si hay más de una instancia.
- Endurecer media con S3/CDN, antivirus/procesamiento y URLs prefirmadas.
- Agregar pruebas negativas por rol, permiso, módulo y tenant.
- Resolver entregabilidad SMTP si el proyecto depende de correos transaccionales.
- Actualizar MDs antiguos para que no contradigan las rutas actuales.

## Ideas futuras

- `bootstrap` CMS dedicado para reducir llamadas iniciales del panel.
- Preview CMS de landing antes de publicar.
- Drag and drop de navegación/layout.
- Update/delete de media CMS con auditoría.
- JSON Schema más expresivo para secciones editables.
- Mantener estilos/media siempre estructurados, nunca HTML/CSS libre.

## Evidencia de calidad existente

- `reports/api-smoke-test-report.md` registra 30/30 PASS, fechado 2026-06-01. No fue re-ejecutado durante esta documentación.
- Specs detectadas en permisos efectivos, rate limit, landing, tenant/cache/controladores.

## Fuentes

- `api_next_steps_roadmap.md`
- `login_security_rate_limit_changes.md`
- `frontend_cms_implementation_map.md`
- `api_documentation_notes.md`
- `reports/api-smoke-test-report.md`
- `src/common/rate-limit/*`
- `src/modules/site/public-site.service.ts`
