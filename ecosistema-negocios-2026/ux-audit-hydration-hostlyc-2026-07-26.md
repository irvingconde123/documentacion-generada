# Auditoria UX/UI - login y seleccion Hostlyc Clone Test

Fecha: 2026-07-26

Alcance: revisar visualmente el CMS en `http://localhost:4300` despues de iniciar sesion y seleccionar `Hostlyc Clone Test`. Se valido escritorio y movil, scroll, overflow visible, alertas persistentes y claridad de textos para un dueno de negocio no tecnico.

## Evidencia

- Escritorio: `logs/screenshots/hydration-repro/hostlyc-summary-desktop-localhost-after-select.png`
- Escritorio con scroll al final: `logs/screenshots/hydration-repro/hostlyc-summary-desktop-localhost-after-select-bottom.png`
- Movil: `logs/screenshots/hydration-repro/hostlyc-summary-mobile-localhost-after-select.png`
- Movil con scroll al final: `logs/screenshots/hydration-repro/hostlyc-summary-mobile-localhost-after-select-bottom.png`

## Resultado

- No se reproduce el error de hidratacion en navegador limpio.
- No hay overflow horizontal en escritorio ni movil.
- No quedan alertas persistentes del CMS despues de cargar el resumen.
- El resumen se entiende: muestra pagina publicada, numero de secciones, marca, ultima actualizacion y colores activos con lenguaje directo.
- El menu lateral en escritorio se lee bien y mantiene acciones de cambio de negocio y cierre de sesion al final.
- En movil, el menu rapido `Ir a otra seccion` es claro para cambiar de herramienta sin ver toda la barra lateral.

## Observaciones

- La captura del usuario muestra atributos de extension de navegador sobre `div` renderizados antes de hidratar. En navegador limpio no aparece el mismatch; la causa probable es una extension activa en el navegador del usuario, no un render inconsistente del CMS.
- En desarrollo aparece el boton flotante rojo de Next dev overlay. En escritorio y movil puede tapar parcialmente la esquina inferior izquierda. No pertenece al CMS ni aparece en build de produccion, pero puede confundir durante pruebas locales.
- La consola limpia muestra mensajes normales de desarrollo: sugerencia de React DevTools y conexion HMR. No se detecto mensaje de hidratacion.

## Recomendacion de producto

- No hacer cambios visuales adicionales por este reporte. Mantener la correccion defensiva de fecha estable en servidor para evitar diferencias de formato entre SSR y navegador.
- Si el usuario vuelve a ver el error en Edge/Chrome, validar con extensiones desactivadas o ventana de invitado antes de abrir un bug de CMS.
