# irving-conde-portfolio - patrones reutilizables

## Scroll y fondos

- En rutas oscuras, pintar toda la cadena visual: `html`, `body`, `app-root` y componente raíz.
- Si hay demos embebidas, separar el scroll del dispositivo simulado y el scroll de la página padre.
- Evitar que overscroll del padre revele fondos blancos por defecto.
- `scroll-behavior: smooth` debe reservarse para navegación programática; en scroll manual continuo puede sentirse lento.

## Demos responsivas

- Menús móviles dentro de simuladores deben ser overlays/drawers con scroll propio.
- El marco de dispositivo no debe ser el que decide legibilidad; el contenido interno debe validar escritorio, tablet y móvil.
- Cada demo debe probar navegación, scroll, lectura y estados de menú.

## Contenido y evidencia

- Slugs, SEO, sitemap, prerender y casos deberían derivarse de una sola fuente de verdad.
- Toda afirmación fuerte del portafolio necesita evidencia pública sanitizada o copy más prudente.
- Cada fix visual debe documentar síntoma, causa, archivos, verificación y prevención.

## Fuentes

- `irving-conde-portfolio/docs/DEMO-COVERAGE.md`
- `irving-conde-portfolio/docs/notas_errores.md`
- `documentación_generada/irving-conde-portfolio/errores/*`
- `documentación_generada/irving-conde-portfolio/soluciones/*`
