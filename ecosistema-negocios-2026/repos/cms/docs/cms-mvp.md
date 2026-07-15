# CMS MVP

## Implementado

- Lectura de contenido publico desde API.
- Lectura de configuracion visual por tenant.
- Lectura de campos de formulario de leads.
- Fallback local para desarrollo sin API.
- Login local con usuario seed `irving.condem@gmail.com`.
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
- Vista espejo resumida ajustada para no prometer titulos invisibles en metricas y organismos.
- Menu de navegacion permite enlaces a paginas internas, URL externa y PDF/archivo descargable.
- Reordenamiento de secciones publica el orden real que la landing renderiza.

## Proximo bloque

- Sustituir login local por auth real de API.
- Integrar permisos Admin/Editor.
- Configurar envio SMTP real y adjunto XLSX.
- Separar borrador de publicacion real.
- Formalizar upload real de Media y persistencia API para biblioteca compartida entre entornos.
- Conectar selector de Media dentro de hero, galeria, SEO, foto de perfil y menu PDF descargable.
- Validar imagenes SEO desde el modulo Media cuando exista biblioteca formal.
- Convertir Vista espejo resumida en render 1:1 reutilizando el renderer real de landing o un paquete compartido.
- Revisar claims comerciales/regulatorios antes de publicar sitios reales: precision, volumen anual, acreditaciones y aceptacion por autoridades deben tener evidencia o texto menos absoluto.
