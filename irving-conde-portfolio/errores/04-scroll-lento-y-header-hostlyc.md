# Error: scroll lento y header Hostlyc grande

## Sintoma

La demo Hostlyc se sentia lenta en dispositivo simulado y el header interno consumia demasiado espacio en movil.

## Causa probable

El contenedor de scroll usaba `scroll-behavior: smooth`, lo que acumula animaciones cuando llegan muchos eventos de rueda o touch. Ademas, el nav de Hostlyc reutilizaba proporciones de desktop.

## Fix aplicado

- En tablet/movil, `.demo-window` usa `scroll-behavior: auto`.
- El nav de Hostlyc/Landing se compacto en tablet/movil.
- El boton de menu queda alineado a la derecha y el panel se abre como overlay.

## Prevencion

Regla practica:

- Scroll manual continuo: `scroll-behavior: auto`.
- Saltos por boton a una seccion: `scrollTo({ behavior: 'smooth' })` esta permitido.

Presupuesto recomendado de header movil:

- Mantenerlo alrededor de 50 a 60 px.
- Evitar que ocupe mas del 10% del alto visible del dispositivo.
