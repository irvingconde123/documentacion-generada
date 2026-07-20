# Plan de trabajo - CMS para clonar Hostlyc

Fecha: 2026-07-20

## Objetivo

Lograr que una persona no tecnica pueda crear una landing nueva y replicar una
pagina comercial como `https://hostlyc.com/` usando solo CMS, sin tocar codigo.

## Entregable 1 - Base de plantillas comerciales

Estado: completado como base tecnica inicial.

Alcance:

- Extender contratos sin romper compatibilidad para transportar `layout`,
  `variant`, `theme`, `richText`, `cards`, `steps`, `faq`, `cta` y `flags`.
- Hacer que API conserve esos `settings` en el espejo publico.
- Hacer que `@ecosistema/site-renderer` deje de forzar textos/layouts de
  laboratorio cuando el bloque indique plantilla comercial.
- Soportar en renderer:
  - Hero centrado con palabra destacada.
  - Servicios comerciales en fondo claro.
  - Proyectos como tarjetas con imagen.
  - Nosotros comercial sin metricas de laboratorio.
  - Proceso tipo timeline.
  - FAQ tipo acordeon.
  - Contacto y footer sin claims de laboratorio.
- Actualizar provisioning `hostlyc-clon`.

Criterios de aceptacion:

- Landing publica no contiene `Laboratorio profesional`, `Solicitar analisis`,
  `Ver acreditaciones` ni `Areas de analisis`.
- Landing muestra `Hostlyc`, hero centrado, rojo como acento, servicios,
  proyectos, proceso y FAQ.
- Builds pasan en contratos, API, renderer, CMS y landings.
- Auditoria UX/UI queda documentada con capturas desktop/mobile.

Resultado 2026-07-20:

- Cumplido. HTML publico validado sin `tester`, `referencia publica`,
  `Clone Test` ni textos/listas de laboratorio.
- Capturas finales:
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-deliverable-1-final2-desktop.png`.
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-deliverable-1-final2-mobile.png`.
- El diseñador marco como pendiente para siguientes entregables igualar con mayor
  precision el hero real de Hostlyc y agregar controles CMS visibles; el H1 se
  reforzo con `clamp()` para corregir jerarquia desktop.
- Scripts operativos versionados en `coordinacion/scripts`.

## Entregable 2 - Controles CMS visibles para plantilla Hostlyc

Estado: siguiente.

Funciones faltantes:

- Selector de plantilla por pagina: `Laboratorio`, `Agencia digital / Hostlyc`,
  y despues otras industrias.
- Controles por seccion:
  - Variante visual.
  - Tema claro/oscuro/color propio.
  - Mostrar/ocultar imagen.
  - Mostrar/ocultar metricas.
  - CTA principal/secundario.
  - Palabra destacada en titulo.
  - Cards, pasos y FAQ editables sin escribir JSON.
- Botones de accion:
  - Enlace interno.
  - URL externa.
  - PDF descargable.
  - Modal flotante.
  - WhatsApp.
- Panel de errores entendibles:
  - "Falta texto del boton".
  - "Este enlace no abre".
  - "Esta imagen no se puede cargar".

Criterios de aceptacion:

- Tester puede modificar hero, servicios, proyectos, proceso, FAQ y contacto
  sin abrir JSON.
- Tester puede mover una seccion agregada por error al final.
- Tester puede cambiar una palabra del titulo a rojo desde CMS.

## Entregable 3 - Provisioning de negocio nuevo en un clic

Estado: pendiente.

Funciones faltantes:

- UI o endpoint administrativo para crear negocio:
  - Nombre visible.
  - Slug.
  - Plantilla inicial.
  - Usuario admin.
  - URL landing.
- Crear automaticamente:
  - Registro de negocio.
  - Relacion usuario-negocio.
  - Espejo CMS inicial.
  - Diseno inicial.
  - Landing preparada para consumir el tenant.
- Validaciones:
  - Slug unico.
  - Correo admin unico.
  - Plantilla existente.
  - No mezclar ramas/tenants de otros proyectos.

Criterios de aceptacion:

- Con un nombre y plantilla se obtiene tenant listo en CMS y landing local.
- Auditoria registra alta de negocio y usuario admin.

## Entregable 4 - Media real y acciones avanzadas

Estado: pendiente.

Funciones faltantes:

- Storage binario real para imagenes/PDF.
- Selector Media reusable en hero, galeria, SEO, perfil, proyectos y botones.
- Modales flotantes configurables desde CMS.
- Imagen por card/proyecto, no solo galeria general.
- Texto alternativo obligatorio para imagenes publicas.

Criterios de aceptacion:

- Tester puede subir o elegir imagenes sin pegar URL.
- Tester puede agregar PDF descargable y boton modal desde CMS.

## Entregable 5 - Prueba tester completa y reporte

Estado: pendiente.

Flujo:

1. Ingresar al CMS como usuario no tecnico.
2. Crear o seleccionar landing Hostlyc.
3. Replicar `https://hostlyc.com/` lo mas cercano posible.
4. Forzar errores:
   - Agregar seccion en posicion equivocada y moverla.
   - Agregar URL incorrecta.
   - Agregar PDF.
   - Cambiar color especifico.
   - Editar menu.
   - Probar mobile.
5. Registrar todo lo que no se pueda hacer.

Criterios de aceptacion:

- Reporte del tester separa: logrado, dificil, imposible y bug.
- Auditoria muestra movimientos reales.
- Diseñador aprueba textos y responsive o genera tareas.

## Pendientes tecnicos transversales

- Publicar `@ecosistema/site-renderer` como paquete interno versionado.
- Separar borrador vs publicado.
- Auth real con permisos por scope.
- Validacion runtime de payloads.
- Backups de contenido completo, no solo usuarios.
- Pruebas automatizadas de responsive, seguridad, stress e inyeccion SQL.
