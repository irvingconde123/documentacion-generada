# Checklist QA para demos simuladas

## Scroll

- Sobre `.demo-window`, `scrollTop` debe cambiar.
- Sobre `.demo-window`, `window.scrollY` no debe cambiar.
- Fuera del dispositivo, `window.scrollY` puede cambiar.
- Al inicio y final no debe aparecer fondo blanco.

## Menus

- Abrir menu en tablet y movil.
- Verificar que el panel tenga altura real.
- Verificar que todos los botones sean visibles.
- Verificar que no cambie `offsetTop` del contenido principal.
- Verificar cierre al seleccionar opcion.

## Legibilidad

- Captura en top, medio y final.
- Revisar textos largos.
- Revisar botones y labels.
- Revisar que el header interno no domine el alto visible.

## Consola

- Sin `console.error`.
- Separar errores propios de errores de extensiones del navegador.

## Build y deploy

- `npm run build`
- `npm run qa:e2e`
- Verificar GitHub Pages.
- Verificar Vercel production.
