# Mapa de módulos del ecosistema

## Visión general

El ecosistema se organiza en cuatro proyectos que comparten una capa de negocio central a través de la API. Cada proyecto tiene responsabilidades propias, pero su comunicación está definida por contratos claros.

## 1. Landing

### Módulos

- Home Page Module
  - Responsable de mostrar la propuesta de valor del negocio.
- Content Module
  - Responsable de consumir bloques y páginas desde el CMS.
- Lead Capture Module
  - Responsable de capturar leads y enviarlos a la API.
- SEO Module
  - Responsable de meta tags, estructura y optimización básica.

### Comunicación

- Consume contenido del CMS a través de contratos de contenido público.
- Envía leads y formularios a la API.
- No debe manejar lógica compleja ni permisos operativos.

## 2. Sistema híbrido

### Módulos

- Auth Module
  - Responsable de login, sesión, refresh y resolución de tenant.
- Shell Module
  - Responsable de la navegación y layout del sistema.
- Inventory Module
  - Responsable de gestión de inventario y stock.
- Sales Module
  - Responsable de registrar ventas y ver reportes básicos.
- Customer Module
  - Responsable de clientes, perfiles y operaciones asociadas.
- Offline Sync Module
  - Responsable de persistencia local, outbox, reintento y sincronización.
- Design Runtime Module
  - Responsable de interpretar el diseño recibido desde el CMS y renderizarlo localmente.
- Notification Module
  - Responsable de sincronizar cambios de diseño, estado y eventos.

### Comunicación

- Consume la API para operaciones reales y permisos.
- Usa almacenamiento local para operaciones offline.
- Recibe diseño y configuración desde el CMS.
- Puede enviar eventos de sincronización y operaciones pendientes a la API.

## 3. API

### Módulos

- Auth Domain
  - Responsable de autenticación, tokens y validación de identidad.
- Tenant Resolution Domain
  - Responsable de detectar y validar el tenant activo.
- Permission Domain
  - Responsable de definir permisos efectivos por rol y contexto.
- Query Executor Contextual
  - Responsable de resolver la fuente de datos, motor y estrategia de ejecución por intención lógica.
- Inventory Domain
  - Responsable de operaciones de inventario.
- Sales Domain
  - Responsable de ventas, cierres y reportes.
- Customer Domain
  - Responsable de clientes y relaciones.
- Content Domain
  - Responsable de exponer contenido y diseño configurado por CMS.
- Sync Domain
  - Responsable de recibir y procesar operaciones offline.
- Contract Observatory
  - Responsable de métricas, trazas, auditoría y observabilidad.
- Integration Adapters
  - Responsable de encapsular acceso a PostgreSQL, storage, mensajería futura y servicios externos.

### Comunicación

- Recibe solicitudes del landing, CMS y sistema híbrido.
- Valida permisos por tenant y contexto.
- Resuelve operaciones con adaptadores y puertos.
- Emite eventos de negocio y de observabilidad.

## 4. CMS

### Módulos

- Tenant Management Module
  - Responsable de crear y administrar tenants y sus configuraciones.
- Content Management Module
  - Responsable de páginas, bloques y contenido editorial.
- Design Management Module
  - Responsable de definir secciones, formularios y estructura visual.
- Form Builder Module
  - Responsable de crear formularios dinámicos.
- Permission Management Module
  - Responsable de roles y permisos del CMS.
- User Management Module
  - Responsable de usuarios del CMS y de usuarios operativos del sistema.
- Publishing Module
  - Responsable de publicar cambios y notificar actualizaciones a fronts.

### Comunicación

- Consume la API para persistir y validar configuraciones de negocio.
- Publica diseño y contenido a la landing y al sistema híbrido.
- No debe acceder directamente a bases de datos de negocio, sino a través de la API.

## Interacciones transversales

- Landing -> API: envío de leads y formularios.
- Sistema híbrido -> API: operaciones transaccionales y sincronización.
- CMS -> API: administración de contenido, diseño, permisos y tenant.
- API -> CMS: respuesta de configuración, permisos y eventos de negocio.
- CMS -> Landing/Sistema: distribución de diseño y contenido.
- Sistema híbrido -> CMS: solicitud de diseño y actualizaciones de configuración.
