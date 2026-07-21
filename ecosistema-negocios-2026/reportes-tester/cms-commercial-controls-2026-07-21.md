# Reporte tester - CMS controles comerciales Hostlyc

Fecha: 2026-07-21

## Alcance probado

- CMS local: `http://127.0.0.1:4200` y `http://localhost:4200`.
- Negocio: `Hostlyc Clone Test`.
- Vista objetivo: `Vista espejo`.
- Evidencia inicial del tester:
  - `logs/screenshots/cms-commercial-controls/tester-desktop-nav-blocked-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/tester-mobile-summary-menu-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/tester-mobile-menu-open-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/tester-mobile-vista-espejo-timeout-2026-07-21.png`.
- Evidencia posterior al fix:
  - `logs/screenshots/cms-commercial-controls/direct-section-mirror-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/sidebar-section-mirror-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/mobile-section-mirror-native-menu-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/desktop-mirror-commercial-controls-hostlyc-fixed.png`.
  - `logs/screenshots/cms-commercial-controls/mobile-mirror-commercial-controls-hostlyc-fixed.png`.

## Resultado del tester

Resultado inicial: rechazado.

El tester pudo iniciar sesion con el seed local, seleccionar `Hostlyc Clone Test`
y localizar `Vista espejo`, pero al intentar navegar desde el menu el contenido
seguia mostrando `Resumen`. En mobile tampoco pudo entrar a `Vista espejo` de
forma confiable desde el menu/hamburguesa.

## Correccion aplicada

- Los items del sidebar ahora son enlaces reales con `?section=...`, no solo
  botones dependientes de estado React.
- La pagina servidor lee `?section=mirror` y abre esa seccion como estado inicial.
- En mobile se agrego un menu nativo `Ir a otra seccion` con enlaces directos,
  para no depender exclusivamente del drawer/hamburguesa.
- El click cliente sigue actualizando estado sin recargar, pero si React no esta
  hidratado el enlace igual navega a la seccion correcta.

## Revalidacion posterior

La prueba automatica posterior confirmo:

- URL directa `/?section=mirror` abre `Vista espejo`.
- Link desktop del sidebar abre `Vista espejo`.
- Menu nativo mobile abre `Vista espejo`.
- Aparece `Vista previa publicada`.
- Aparece `Plantilla comercial tipo Hostlyc`.
- No hay overflow horizontal en mobile.

## Lo que si puede hacerse

- Agregar una plantilla comercial completa desde el CMS.
- Agregar secciones individuales: inicio, servicios, proyectos, nosotros,
  proceso, preguntas, contacto y footer.
- Editar titulo y texto visible de secciones.
- Editar listas mediante campos separados o controles inline.
- Reordenar secciones agregadas por error.
- Quitar secciones.
- Cambiar colores globales de marca.
- Usar el mismo renderer compartido en CMS y landing.
- Entrar a Vista espejo por sidebar, URL directa y menu nativo mobile.

## Lo que sigue sin poder hacerse o no esta completo

- Cambiar el color de una palabra arbitraria desde una seleccion visual. Hoy la
  palabra destacada depende del campo `highlight`.
- Configurar botones avanzados por tipo de accion: abrir modal, enviar WhatsApp,
  descargar archivo, llamar por telefono o navegar a una URL con validacion clara.
- Validar visualmente enlaces rotos o URLs incorrectas antes de publicar.
- Elegir imagen por cada card de servicio/proyecto desde un selector dedicado.
  Hoy existen imagenes por lista/galeria, pero falta control por tarjeta.
- Subir media a storage real. Los archivos locales pequenos existen como fallback,
  pero no sustituyen almacenamiento de produccion.
- Separar formalmente `Guardar borrador` de `Publicar`.
- Cambiar layout fino desde CMS: columnas, alineacion exacta, espaciados,
  posicion de imagen y orden interno de elementos dentro de una seccion.
- Crear un negocio nuevo en un clic desde UI con tenant, landing y usuario admin.
- Guardar presets reutilizables por industria o por negocio.

## Fricciones para usuario no tecnico

- Los formatos con `Titulo | descripcion` son entendibles, pero no tan amigables
  como editar cada card con campos dedicados permanentes.
- `Vista espejo` ya ayuda, pero falta un indicador claro de cambios sin guardar.
- Los botones `Subir`, `Bajar` y `Quitar` son claros, pero aun se sienten como
  controles de administracion; conviene agruparlos en un menu de acciones por
  seccion cuando haya mas opciones.

## Recomendacion de siguiente entregable

Priorizar editor visual de cards y botones:

- Card con titulo, descripcion, imagen, etiqueta y enlace.
- Boton con tipo de accion: URL, seccion interna, WhatsApp, modal, descarga o
  telefono.
- Validacion previa a publicar.
- Selector Media real conectado a cada card/boton.

