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

Estado: completado como primera version operable.

Alcance cerrado 2026-07-20:

- CMS agrega una plantilla comercial tipo Hostlyc desde `Contenido del sitio`
  y desde `Vista espejo`.
- Se agregaron presets visibles por seccion:
  - Inicio comercial.
  - Servicios comerciales.
  - Proyectos o casos.
  - Acerca del negocio.
  - Proceso de trabajo.
  - Preguntas frecuentes.
  - Contacto comercial.
  - Pie de pagina comercial.
- Cada preset crea `settings` compatibles con el renderer compartido:
  `variant`, `layout`, `highlight`, `ctaLabel`, `secondaryCtaLabel`,
  `itemCtaLabel`, `backgroundColor`, `items`, `images`, `subtitle`,
  `note` y campos de navegacion del hero.
- Las etiquetas del editor tradicional ahora explican formatos entendibles:
  `Titulo | descripcion`, `Titulo | descripcion | etiqueta` y
  `Pregunta | respuesta`.
- Los paneles inline de Vista espejo ya no usan scroll interno con altura fija;
  crecen en flujo normal para no quedar encima o detras de otras secciones.
- Auditoria de diseño detecto controles de seccion cortados en el borde derecho;
  se corrigieron alineandolos dentro del lienzo y agregando etiquetas accesibles
  por seccion.
- El texto de ayuda de Vista espejo ahora explica que `Subir`, `Bajar` y
  `Quitar` mueven secciones completas.
- Los controles de color ahora dicen `Color principal` y `Color de apoyo`.
- Tester rechazo inicialmente por navegacion: al tocar `Vista espejo` podia
  quedar en `Resumen`. Se corrigio con enlaces reales `?section=...`, lectura
  server-side de la seccion inicial y menu nativo mobile `Ir a otra seccion`.
- `@ecosistema/site-renderer` fue reconstruido y reinstalado en CMS.

Criterios de aceptacion:

- Cumplido parcialmente: tester puede agregar plantilla comercial, mover
  secciones, editar textos, listas, colores globales, imagenes, menu y publicar
  sin tocar JSON.
- Pendiente fino: cambiar el color de una sola palabra arbitraria desde CMS
  aun depende de `highlight`; falta selector visual por fragmento de texto.
- Pendiente fino: acciones avanzadas por boton (`modal`, WhatsApp y validacion
  visible de enlace roto) pasan al entregable 4.

Validacion:

- `repos/site-renderer`: `npm run check`, `npm run build`, `npm pack`.
- `repos/cms`: `npm run lint`, `npm run build`.
- Playwright local en CMS `4200`, negocio `Hostlyc Clone Test`, Vista espejo:
  - `logs/screenshots/cms-commercial-controls/desktop-mirror-commercial-controls-hostlyc-fixed.png`.
  - `logs/screenshots/cms-commercial-controls/mobile-mirror-commercial-controls-hostlyc-fixed.png`.
  - `logs/screenshots/cms-commercial-controls/direct-section-mirror-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/sidebar-section-mirror-2026-07-21.png`.
  - `logs/screenshots/cms-commercial-controls/mobile-section-mirror-native-menu-2026-07-21.png`.
- Resultado automatico: aparece `Plantilla comercial tipo Hostlyc`, aparece
  `Aplicar plantilla comercial`, aparece `Color principal`, URL directa y menu
  mobile abren Vista espejo, sin overflow horizontal en mobile.

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

Estado: en progreso como base tecnica de storage dinamico.

Base cerrada 2026-07-21:

- Contratos `CmsStorage*` agregados en `@ecosistema/shared-contracts`.
- `CmsMediaItem` ya admite metadata opcional de provider, key, MIME, tamano, checksum, filename y visibilidad.
- API agrega servicio dinamico `CmsStorageService`.
- API agrega:
  - `GET /v1/cms/:tenantSlug/storage/status`
  - `POST /v1/cms/:tenantSlug/storage/uploads`
- CMS consulta el estado y explica cuando no hay almacenamiento conectado.
- Biblioteca Media muestra si un archivo es `Enlace publico` o `Solo en este CMS`.
- UX/UI e integracion auditaron que no se debe devolver `ready` con URLs placeholder. Se corrigio: proveedores S3/Firebase/custom quedan en `not_implemented` hasta implementar adaptador real.
- Documento operativo: `coordinacion/storage-media.md`.

Funciones faltantes:

- Adaptadores reales para S3, Firebase Storage y proveedor compatible/custom.
- Storage binario real para imagenes/PDF.
- Upload desde CMS contra provider configurado cuando `storage/status.enabled=true`.
- Persistir metadata de storage en PostgreSQL.
- Selector Media reusable en hero, galeria, SEO, perfil, proyectos y botones.
- Modales flotantes configurables desde CMS.
- Imagen por card/proyecto, no solo galeria general.
- Texto alternativo obligatorio para imagenes publicas.
- Ocultar o bloquear archivos `Solo CMS`, `Pendiente` o `Falló` cuando se eligen assets para landing publica.

Criterios de aceptacion:

- Tester puede subir o elegir imagenes sin pegar URL.
- Tester puede agregar PDF descargable y boton modal desde CMS.
- API rechaza SVG/HTML/JS, exceso de tamano, MIME falso y usuarios sin permiso.

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
