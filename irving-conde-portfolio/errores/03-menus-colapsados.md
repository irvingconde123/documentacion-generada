# Error: menus colapsados en tablet y movil

## Sintoma

Los menus compactos de Adastra, Landing, CMS y Hostlyc aparecian como una franja muy baja, aunque los botones existian en el DOM.

## Causa tecnica observada

Algunos menus calculaban su `max-height` con base en el contenedor equivocado o quedaban dentro de un header sticky con altura limitada. El resultado era un panel visible de aproximadamente 18 a 24 px, con botones fuera del area pintada.

## Evidencia util

Mediciones vistas durante QA:

- Landing movil: `.landing-nav-links` cerca de `302x18`.
- CMS movil/tablet: `.cms-mobile-menu` cerca de `284x21`.
- Adastra movil: `.mobile-nav-panel` cerca de `294x24`.

## Fix aplicado

Los paneles pasaron a ser overlays dentro del dispositivo:

- `position: absolute`
- `top: calc(100% + ...)`
- `z-index` superior al contenido
- `max-height` real
- `overflow-y: auto`
- ancho acotado al marco

## Prevencion

Cada menu movil/tablet debe verificarse con:

- alto mayor al alto de un boton individual;
- botones visibles;
- no empujar el contenido principal;
- no salirse de `.demo-window`;
- cierre al seleccionar opcion o por `Escape`.
