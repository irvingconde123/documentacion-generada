# Fixes implementados

## Scroll y fondos de demos

Archivo principal:

- `src/global.scss`

Accion:

- Se pinto `html`, `body`, `app-root`, `app-demo` y `app-architecture` con fondo oscuro en rutas de demo/arquitectura.
- Se contuvo el overscroll del `html` solo en esas rutas.

Resultado esperado:

- No aparece fondo blanco al forzar scroll.
- El scroll fuera del dispositivo sigue funcionando.
- El scroll dentro de `.demo-window` no mueve la pagina padre.

## Menus tablet/movil

Archivo principal:

- `src/styles/demo/_shell.scss`

Accion:

- Landing y Hostlyc usan panel de navegacion con altura real.
- CMS usa `.cms-mobile-menu` como overlay dentro del dispositivo.
- Adastra usa `.mobile-nav-panel` con alto real y scroll propio.

Resultado esperado:

- Paneles visibles en tablet y movil.
- Botones legibles.
- El menu no empuja el contenido.

## Scroll fluido

Accion:

- En tablet/movil, `.demo-window` usa `scroll-behavior: auto`.

Resultado esperado:

- El scroll con touchpad o gesto tactil responde sin animaciones acumuladas.
