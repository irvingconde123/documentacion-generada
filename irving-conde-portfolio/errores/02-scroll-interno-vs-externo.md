# Error: scroll interno vs scroll externo

## Sintoma

El contenido dentro del telefono/tablet simulado no se desplazaba correctamente, o el scroll movia la pagina padre en lugar del contenido de la demo.

## Causa probable

El contenedor visual del dispositivo no siempre era el verdadero contenedor de scroll. Si el evento de rueda o touch cae fuera de `.demo-window`, el documento padre puede moverse. Si se bloquea demasiado el padre, el touchpad o el scroll fuera del dispositivo dejan de funcionar.

## Evidencia util

Medir antes/despues de hacer scroll:

- `window.scrollY`
- `.demo-window.scrollTop`
- `.demo-window.scrollHeight`
- `.demo-window.clientHeight`
- `getComputedStyle(.demo-window).overflowY`

Comportamiento esperado:

- Scroll sobre el dispositivo: cambia `.demo-window.scrollTop`, no cambia `window.scrollY`.
- Scroll fuera del dispositivo: puede cambiar `window.scrollY`.

## Prevencion

Separar tres responsabilidades:

1. `.demo-window` recibe el scroll de la demo.
2. El documento padre puede desplazarse si el usuario esta fuera del dispositivo.
3. El overscroll de limite no debe exponer fondos incorrectos.
