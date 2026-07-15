# Error: fondo blanco al forzar scroll

## Sintoma

Al forzar el scroll hasta arriba o hasta abajo en una demo, aparece una franja blanca fuera del area oscura del portafolio.

## Causa tecnica observada

La ruta demo pintaba oscuro `body` y `.demo-shell`, pero `html` conservaba el fondo claro global `#f8fafc`. Cuando el navegador muestra rebote, overscroll o el limite del documento, puede exponer el fondo de `html` o de `app-root`.

## Evidencia util

Medicion local en `/demos/hostlyc`:

- `htmlBg`: antes era `rgb(248, 250, 252)`.
- `bodyBg`: `rgb(7, 17, 31)`.
- `.demo-shell`: `rgb(7, 17, 31)`.
- El punto inferior de la pantalla caia sobre `.demo-page`, pero el rebote visual podia exponer `html`.

## Fix aplicado

Pintar tambien la capa raiz en rutas demo/arquitectura:

- `html:has(app-demo)`
- `html:has(app-architecture)`
- `body:has(...) app-root`
- `app-demo`
- `app-architecture`

Ademas, contener `overscroll-behavior-y` en `html` solo para esas rutas.

## Prevencion

En pantallas con fondos oscuros, no basta con pintar el componente visible. Tambien se debe pintar:

- `html`
- `body`
- `app-root`
- componente raiz de la ruta

Prueba recomendada: forzar scroll al final y al inicio, y verificar que ningun fondo de la captura sea blanco fuera del contenido.
