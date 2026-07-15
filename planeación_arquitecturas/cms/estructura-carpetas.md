# Estructura de carpetas para el CMS

## Objetivo

El CMS será la capa de administración del negocio. Debe permitir crear contenido, diseñar páginas, controlar formularios, definir permisos y publicar cambios a los fronts.

## Estructura propuesta

```text
cms/
  src/
    app/
      common/
        enums/
        interfaces/
        dto/
        guards/
        interceptors/
        utils/
      modules/
        auth/
        tenant/
        content/
        design/
        forms/
        permissions/
        users/
        publishing/
      shared/
        services/
        adapters/
        hooks/
      shell/
      config/
    public/
    styles/
```

## Responsabilidades por carpeta

### `common`

- Contiene código reutilizable: enums, interfaces, DTOs base, guards, filtros y utilidades.
- Aquí se centralizan los contratos compartidos con la API.

### `modules`

- Cada módulo representa una capacidad del CMS.
- `content`: páginas, secciones y bloques.
- `design`: estructura visual del negocio para landing y sistema.
- `forms`: formularios dinámicos y reglas de validación.
- `permissions`: roles y permisos del CMS.
- `publishing`: publicación de cambios y notificaciones.

### `shared`

- Servicios transversales, adaptadores de API y helpers de UI.
- Debe aislar la comunicación con la API para que los módulos no dependan del cliente HTTP directamente.

### `shell`

- Layout principal, navegación, barra lateral y estructura global.

## Qué hará el CMS

- Recogerá y administrará contenido público y privado.
- Definirá qué diseñar, qué mostrar y qué permisos asignar.
- Publicará cambios al landing y al sistema híbrido.
- No debe tener lógica transaccional intensa; su función principal es administración y configuración.

## DTOs e interfaces recomendados

- `CreatePageDto`
- `UpdateContentDto`
- `PublishContentDto`
- `TenantConfigDto`
- `PermissionRuleDto`
- `ApiContentClientPort`
- `PublishingServicePort`

## Comunicación con otros proyectos

- Se comunica con la API para crear, editar y publicar contenido.
- Envía respuestas de diseño y contenido a landing y sistema.
- No debe hablar directamente con bases de datos de negocio.
