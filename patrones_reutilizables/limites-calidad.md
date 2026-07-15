# Patrón reutilizable: límites y calidad

## Límites de archivo

Los proyectos `hostlyc-backend-adastra`, `hostlyc-frontend-adastra` e `irving-conde-portfolio` usan scripts `quality:size`. La intención es evitar archivos difíciles de revisar, testear y reutilizar.

Regla propuesta para proyectos nuevos:

- Componentes Angular: máximo 250-300 líneas por TS y 300-400 por SCSS/HTML.
- Servicios/facades: máximo 250-350 líneas.
- Repositorios/API services: máximo 300 líneas.
- Controladores NestJS: máximo 200-250 líneas.
- Servicios NestJS: máximo 300-400 líneas; extraer repositorio o policy si crece.
- Repositorios SQL: máximo 300-400 líneas; separar por caso de uso.
- Si un archivo excede el límite, documentar excepción o dividir por responsabilidad.

## Comandos mínimos

Angular:

```bash
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

NestJS:

```bash
npm run build
npm test -- --runInBand
```

Cuando exista:

```bash
npm run quality:size
npm run lint:check
```

## Documentación esperada por proyecto

Cada repo debería tener:

- `README.md` real, no boilerplate.
- `docs/architecture.md` o carpeta `docs/architecture/`.
- `docs/errors.md` o carpeta de errores conocidos.
- `docs/decisions/ADR-xxx.md` para decisiones importantes.
- `docs/qa.md` con comandos y vistas a validar.

## Checklist antes de cerrar cambios

- Build pasa.
- Tests relevantes pasan o se documenta por qué no se ejecutaron.
- No se agregaron secretos.
- No hay endpoints administrativos expuestos al público.
- Los componentes no rompen móvil/tablet/escritorio.
- Scroll y overscroll se prueban en contenedores reales, no solo en simuladores.
- No se duplicó lógica de acceso a datos en UI.
