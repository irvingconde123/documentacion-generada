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
- Flujo de contrasena temporal para usuarios. En esta fase queda en modo prueba local; cuando exista SMTP/API de usuarios se debe enviar por correo.
- Modulo Media: biblioteca local por URL con titulo, texto alternativo, tipo, estado, etiquetas, edicion y eliminacion.
- El CMS arranca leyendo `GET /v1/public/:tenantSlug/site`, el mismo espejo que consume la landing, para evitar editar una copia distinta.
- El formulario de Pagina principal sincroniza titulo/descripcion con el bloque Hero visible al publicar.
- Los bloques `metricStrip` y `logoStrip` ya no muestran campos de titulo/descripcion como editables visibles porque la landing solo renderiza sus listas.
- Vista espejo con renderer visual tipo landing: hero, menu, servicios, metricas, organismos, mision, acreditaciones, CTA y footer en el mismo orden publicado.
- Vista espejo responsive: en movil aparece antes del formulario de edicion; en escritorio usa un marco escalado con scroll interno como respaldo para evitar recortes/overflow global.
- Vista espejo con edicion inline: textos editables desde el render, listas editables por linea, controles de color/marca/fuente, cambio de imagen principal/galeria por URL, subir/bajar secciones y quitar secciones desde la previsualizacion.
- Guardar borrador desde Vista espejo tambien guarda y publica cambios de diseno cuando se editaron marca, colores o fuente desde el preview.
- Menu de navegacion permite enlaces a paginas internas, URL externa y PDF/archivo descargable.
- El menu de navegacion permite elegir un documento activo desde Media para enlaces PDF/archivo descargable; al elegirlo toma el nombre del archivo y publica `linkType: "download"`.
- Reordenamiento de secciones publica el orden real que la landing renderiza.

## Proximo bloque

- Sustituir login local por auth real de API.
- Integrar permisos Admin/Editor.
- Configurar envio SMTP real y adjunto XLSX.
- Separar borrador de publicacion real.
- Formalizar upload real de Media y persistencia API para biblioteca compartida entre entornos.
- Conectar selector de Media dentro de hero, galeria, SEO y foto de perfil.
- Validar imagenes SEO desde el modulo Media cuando exista biblioteca formal.
- Extraer el renderer de landing a paquete compartido para que Vista espejo y landing usen exactamente el mismo codigo visual.
- Revisar claims comerciales/regulatorios antes de publicar sitios reales: precision, volumen anual, acreditaciones y aceptacion por autoridades deben tener evidencia o texto menos absoluto.
- Refinar UX de Vista espejo: hacer colapsable el editor tradicional, mejorar edicion de tarjetas individuales y conectar selector Media a los controles inline de imagen.

## Validacion reciente

- 2026-07-17: `npm run lint` y `npm run build` pasan en `repos/cms`.
- 2026-07-17: validacion Playwright local contra CMS `4200`, API `3000` y landing `3100`.
- Evidencia visual: `logs/screenshots/cms-inline-mirror`.
- Resultado: Vista espejo muestra controles inline, publica borrador, landing responde y no hay overflow horizontal movil.
