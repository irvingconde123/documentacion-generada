# Landing MVP

## Implementado

- Render de contenido publico desde API.
- Aplicacion de configuracion visual por tenant.
- Captura de leads por contrato `CreateLeadRequest`.
- Fallback local para desarrollo sin API.
- Rutas dinamicas por slug.
- Render de menu publicado desde CMS.
- Menu publico con enlaces a paginas internas, anclas de seccion, URL externa y PDF/archivo descargable.
- Render de bloques `hero`, `features`, `text`, `gallery` y `contactForm`.
- Imagen hero y galeria por URL con texto alternativo.
- Tema profesional oscuro para laboratorio con roles compatibles sobre bloques
  existentes: `metricStrip`, `logoStrip`, `services`, `mission`,
  `accreditations`, `ctaBand` y `footer`.
- Fallback local de laboratorio con textos claros, metricas, organismos,
  servicios, mision, acreditaciones, CTA regulatorio, contacto y footer.
- Metadata dinamica para home y rutas por slug usando `page.seo.seoTitle`,
  `page.seo.seoDescription` y `page.seo.ogImageUrl`, con fallback al titulo y
  descripcion visibles.
- Render de secciones en el orden publicado por CMS; la landing ya no fuerza
  metricas/organismos arriba ignorando el orden del editor.
- Acreditaciones interpretan items como `clave | nombre | descripcion`.
- Menu movil basico para navegar enlaces publicados.

## Proximo bloque

- Cache incremental por publicacion del CMS.
- Manejo formal de assets cuando CMS tenga modulo Media.
- Reutilizar renderer real en CMS para que Vista espejo sea 1:1.
