# Reporte inicial - Hostlyc Clone Test

Fecha: 2026-07-20

## Estado de arranque

- Tenant creado: `hostlyc-clon`.
- Negocio visible esperado en CMS: `Hostlyc Clone Test`.
- Landing nueva creada: `repos/landing-hostlyc`.
- Landing local: `http://localhost:3101`.
- API local: `http://localhost:3000/v1`.
- CMS local: `http://localhost:4200`.

## Verificacion tecnica inicial

- `GET /v1/public/hostlyc-clon/site` responde con la pagina `Tu negocio, visible y creciendo.`.
- La landing `http://localhost:3101` contiene texto Hostlyc y no contiene fallback `Laboratorio Conde`.
- El usuario local `irving.condem@gmail.com` quedo ligado a `hostlyc-clon`.

## Dificultades detectadas antes de prueba manual

### Hallazgo 1

- Seccion: Alta de negocio/tenant.
- Que intentaba hacer: crear una landing nueva desde CMS con un nombre.
- Que paso: no existe UI ni endpoint publico de alta de tenant listo para cliente.
- Que esperaba: boton tipo "Crear nueva landing" con nombre, slug, usuario admin y proyecto landing listo.
- Gravedad: alta.
- Es entendible para una persona no tecnica: no.
- Funcion necesaria: modulo de provisioning con UI, validacion de slug, asignacion de admin, publicacion inicial y URL de landing.

### Hallazgo 2

- Seccion: Vista espejo / renderer.
- Que intentaba hacer: replicar visualmente `https://hostlyc.com/`.
- Que paso: el renderer compartido todavia tiene decisiones visuales orientadas a laboratorio en textos/layouts.
- Que esperaba: elegir plantilla "agencia digital" o modificar layout visual sin tocar codigo.
- Gravedad: alta.
- Es entendible para una persona no tecnica: parcialmente.
- Funcion necesaria: sistema de templates por industria y secciones genericas: hero agencia, proyectos, proceso, FAQ, footer comercial y WhatsApp.

### Hallazgo 3

- Seccion: Edicion fina.
- Que intentaba hacer: preparar prueba para cambiar color de una letra, botones con modales, cards de proyecto y FAQ tipo acordeon.
- Que paso: esos controles no estan garantizados en CMS actual.
- Que esperaba: controles visibles para estilos por texto, botones con accion/modal, acordeones y tarjetas de proyecto.
- Gravedad: media/alta.
- Es entendible para una persona no tecnica: no.
- Funcion necesaria: editor de componentes con propiedades visibles por componente.

## Siguiente paso del tester

Entrar a `http://localhost:4200`, seleccionar `Hostlyc Clone Test` y llenar el reporte completo usando `coordinacion/tester-hostlyc-clone.md`.

## Actualizacion de prueba real

Fecha/hora local: 2026-07-20.

### Acciones ejecutadas

- Proyecto landing nuevo: `repos/landing-hostlyc`.
- URL local de landing: `http://localhost:3101`.
- Tenant de prueba: `hostlyc-clon`.
- Script repetible: `scripts/run-hostlyc-cms-smoke.mjs`.
- Evidencia previa al smoke: `logs/hostlyc-clone-site-before-smoke.json`.
- Capturas:
  - `logs/screenshots/hostlyc-clone-test/reference-hostlyc.png`.
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-public-desktop-after-renderer.png`.
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-public-mobile-after-renderer.png`.
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-after-smoke-desktop.png`.
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-after-smoke-mobile.png`.

### Resultado tecnico

- La landing nueva consume `GET /v1/public/hostlyc-clon/site`.
- La landing refleja cambios publicados: marca `Hostlyc`, acento rojo `#ef233c` y enlace de menu `PDF prueba`.
- Se corrigio el renderer compartido para que el publico no muestre controles de CMS:
  - No aparece `Vista previa publicada`.
  - No aparece `Editar servicios`.
  - No aparece contenido editable editorial en el HTML publico.
- Validaciones ejecutadas:
  - `repos/site-renderer npm run check`.
  - `repos/site-renderer npm run build`.
  - `repos/cms npm run build`.
  - `repos/landing npm run build`.
  - `repos/landing-hostlyc npm run build`.

### Auditoria y respaldos

El smoke test ejecuto movimientos reales por API:

- Login exitoso y login fallido.
- Alta de 2 usuarios.
- Actualizacion de 2 usuarios.
- Bloqueo logico de 1 usuario.
- Solicitudes de contrasena temporal.
- Alta de 2 items de Media: imagen y PDF.
- Actualizacion de Media.
- Publicacion de espejo CMS.
- Publicacion de diseno.
- Operacion de sync.
- Preview de reporte de auditoria.

Resultado observado:

- Eventos recientes: 16.
- Backups recientes: 5.
- Reporte local generado:
  `logs/audit-reports/auditoria-hostlyc-clon-2026-07-20T20-06-01-238Z.xlsx`.

### Hallazgo bloqueante para clonar Hostlyc al 100%

- Seccion: motor de secciones / renderer compartido.
- Que intentaba hacer: replicar `https://hostlyc.com/` usando solo CMS.
- Que paso: la pagina cambia texto, colores, media y menu, pero el renderer fuerza composicion de laboratorio: subtitulo `Laboratorio profesional`, CTA `Solicitar analisis`, boton `Ver acreditaciones`, imagen hero obligatoria y metricas flotantes `99.8%` / `24-72h`.
- Que esperaba: poder elegir una plantilla tipo agencia digital con hero centrado, paleta blanco/negro/rojo, palabras destacadas en rojo, secciones de servicios/proceso/FAQ/CTA como Hostlyc y sin claims de laboratorio.
- Gravedad: alta.
- Es entendible para una persona no tecnica: no; el usuario cree que esta editando Hostlyc, pero el sistema conserva mensajes de otra industria.
- Funcion necesaria: modelo CMS/API de secciones genericas con `variant`, `theme`, `layout`, `richText`, `cards`, `steps`, `faqItems`, `ctaActions`, `showImage`, `showMetrics` y `sectionAccentColor`.

### Hallazgos UX del diseñador

- El clon actual se siente como dark SaaS/laboratorio, no como Hostlyc.
- Falta soporte para resaltar una palabra dentro del H1, por ejemplo `visible` en rojo.
- Faltan layouts: hero centrado sin imagen, servicios tipo mosaico, proceso vertical, FAQ acordeon, CTA rojo y footer negro.
- Falta control de color por seccion y por texto especifico.
- Los textos tecnicos no deben salir en sitios comerciales: `Area de analisis`, `Instalaciones`, `Acreditaciones`, `Laboratorio profesional`.
- La navegacion movil existe, pero no replica la presencia visual de Hostlyc.

### Tareas solicitadas a Front/API/CMS

- Front: crear variantes de renderer para agencia digital y mover los hardcodes de laboratorio a configuracion editable.
- API/contratos: ampliar `ContentBlockSettings` con campos estructurados para layouts, temas, acciones, pasos, FAQs y texto enriquecido seguro.
- CMS: agregar plantilla `Agencia digital / Hostlyc`, controles visibles para ocultar imagen/metricas, cambiar CTA secundaria, editar color por seccion y gestionar modales/acciones.
- Tester: continuar prueba manual desde CMS y registrar cada accion imposible o confusa en este mismo formato.

## Cierre parcial del entregable 1

Fecha: 2026-07-20.

Se corrigio la base tecnica que bloqueaba la clonacion comercial:

- Renderer publico separado de vista espejo CMS.
- Contratos/API preservan settings para variantes comerciales.
- Landing Hostlyc renderiza hero centrado, servicios claros, proyectos, nosotros,
  proceso, FAQ, contacto y footer sin textos de laboratorio.
- Se eliminaron textos internos visibles: `tester`, `referencia publica`,
  `Clone Test`, `Laboratorio profesional`, `Solicitar analisis`,
  `Ver acreditaciones`, `Areas de analisis` y lista de laboratorio del footer.
- Capturas finales:
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-deliverable-1-final2-desktop.png`.
  - `logs/screenshots/hostlyc-clone-test/landing-hostlyc-deliverable-1-final2-mobile.png`.

Pendiente para la siguiente prueba manual:

- Los controles CMS todavia no exponen de forma humana todas las variantes
  nuevas. El usuario puede publicar la plantilla, pero no todos los ajustes se
  pueden modificar sin tocar campos tecnicos o convenciones en `settings`.
