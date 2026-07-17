# CMS MVP

## Implementado

- Lectura de contenido publico desde API.
- Lectura de configuracion visual por tenant.
- Lectura de campos de formulario de leads.
- Fallback local para desarrollo sin API.
- Login local con usuario seed `irving.condem@gmail.com`.
- Login en entorno no productivo precarga correo y contrasena seed para agilizar entrada local; en produccion no se envian valores por defecto al formulario.
- Seleccion de negocio antes de entrar al dashboard.
- Editor de contenido y diseno con publicacion hacia API.
- Solicitud de reportes de auditoria por correo en modo simulado o SMTP.
- Navegacion lateral por secciones.
- Editor visual de bloques sin depender de JSON para el usuario normal.
- Alta, baja y reordenamiento de bloques.
- Vista espejo conectada a API para paginas, menu y contenido publicado.
- Alertas temporales de guardado/publicacion.
- Campos basicos para imagen por URL y texto alternativo en hero/galeria.
- Presets de laboratorio para metricas, organismos de respaldo, mision, acreditaciones, CTA y footer.
- Accion "Aplicar plantilla laboratorio" para insertar los bloques base en orden.
- Modulo SEO por pagina con titulo SEO, descripcion SEO e imagen para compartir usando el contrato `page.seo`.
- Modulo Mi cuenta: nombre y foto editables, correo visible no editable.
- Modulo Usuarios: alta de usuarios por correo unico, correo inmutable, edicion de nombre/foto/rol/estado.
- Flujo de contrasena temporal para usuarios. En esta fase queda en modo prueba local; el API ya puede proteger permisos, pero falta enviar temporales por SMTP.
- Modulo Media: biblioteca local por URL o carga local pequena como data URL/base64, con titulo, texto alternativo, tipo, estado, etiquetas, edicion y eliminacion. Los archivos `data:` quedan en CMS local hasta conectar storage binario.
- El CMS arranca leyendo `GET /v1/public/:tenantSlug/site`, el mismo espejo que consume la landing, para evitar editar una copia distinta.
- El formulario de Pagina principal sincroniza titulo/descripcion con el bloque Hero visible al publicar.
- Los bloques `metricStrip` y `logoStrip` ya no muestran campos de titulo/descripcion como editables visibles porque la landing solo renderiza sus listas.
- Vista espejo con renderer visual tipo landing: hero, menu, servicios, metricas, organismos, mision, acreditaciones, CTA y footer en el mismo orden publicado.
- Vista espejo responsive: en movil aparece antes del formulario de edicion; en escritorio usa un marco escalado con scroll interno como respaldo para evitar recortes/overflow global.
- Vista espejo con edicion inline: textos editables desde el render, listas editables por linea, controles de color/marca/fuente, cambio de imagen principal/galeria por URL, subir/bajar secciones y quitar secciones desde la previsualizacion.
- Vista espejo con editor tradicional colapsable para dejar el preview como foco principal.
- Listas complejas en Vista espejo se editan por tarjetas con campos humanos, no por textarea tecnico.
- Selector Media disponible en imagen principal, galeria, SEO y fotos de perfil.
- Renderer visual compartido en `repos/site-renderer`, usado por CMS Vista espejo y landing publica.
- Acciones de Mi cuenta, Usuarios y Media escriben hacia endpoints API reales y conservan fallback local si la API no responde.
- Guardar borrador desde Vista espejo tambien guarda y publica cambios de diseno cuando se editaron marca, colores o fuente desde el preview.
- Menu de navegacion permite enlaces a paginas internas, URL externa y PDF/archivo descargable.
- El menu de navegacion permite elegir un documento activo desde Media para enlaces PDF/archivo descargable; al elegirlo toma el nombre del archivo y publica `linkType: "download"`.
- Reordenamiento de secciones publica el orden real que la landing renderiza.

## Proximo bloque

- Sustituir login local por auth real de API.
- Integrar auth real de API en login CMS y permisos visibles por rol.
- Conectar envio SMTP real para contrasenas temporales; reportes de auditoria ya tienen SMTP real con CSV, XLSX queda opcional.
- Separar borrador de publicacion real.
- Formalizar upload real de Media binaria. Contrato pendiente sugerido:
  `POST /v1/cms/:tenantSlug/media/uploads` con `multipart/form-data` (`file`, `title?`, `altText?`, `type: image|document|video`, `tags?`) debe validar MIME/tamano, guardar el binario en storage, devolver `{ id?, url, title, altText, type, status, tags }` y dejar `url` como enlace publico/firmado usable por landing, SEO, menu y perfiles. El CMS ya guarda metadatos via `/cms/:tenantSlug/media`; cuando exista este endpoint, primero sube el binario y despues persiste la respuesta como item Media.
- Publicar `@ecosistema/site-renderer` como paquete interno versionado en vez de tarball local.
- Revisar claims comerciales/regulatorios antes de publicar sitios reales: precision, volumen anual, acreditaciones y aceptacion por autoridades deben tener evidencia o texto menos absoluto.
- Refinar UX de Vista espejo: agregar indicador de cambios sin guardar, mejorar posicionamiento de paneles cuando el preview sea angosto y permitir ajustes finos de layout sin depender de convenciones en `settings`.

## Validacion reciente

- 2026-07-17: `npm run lint` y `npm run build` pasan en `repos/cms`.
- 2026-07-17: validacion Playwright local contra CMS `4200`, API `3000` y landing `3100`.
- Evidencia visual: `logs/screenshots/cms-inline-mirror`.
- Resultado: Vista espejo muestra controles inline, publica borrador, landing responde y no hay overflow horizontal movil.
- 2026-07-17: `repos/site-renderer npm run build`, `repos/cms npm run lint/build` y `repos/landing npm run lint/build` pasan con renderer compartido.
- Evidencia visual adicional: `logs/screenshots/cms-shared-renderer`.
