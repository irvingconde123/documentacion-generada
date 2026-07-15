# Estructura real de carpetas para el ecosistema

## 1. Principios de la estructura

La idea es trabajar con un modelo claro, desacoplado y escalable. Cada proyecto tendrá capas y carpetas específicas para:

- dominio y reglas de negocio
- casos de uso y servicios de aplicación
- infraestructura y adaptadores
- transporte y contratos
- lógica reutilizable compartida
- sincronización offline
- observabilidad y seguridad

## 2. Estructura base de coordinación por proyectos separados

```text
proyectos/
  landing/
  sistema-hibrido/
  cms/
  api/
shared/
  shared-contracts/
  shared-ui/
  shared-core/
```

## 3. Librería compartida de contratos

La carpeta `shared/shared-contracts` debe contener todo lo reutilizable entre proyectos, pero siempre como recurso compartido externo que cada proyecto pueda consumir de forma independiente:

```text
shared/shared-contracts/
  src/
    common/
      enums/
      interfaces/
      dto/
      constants/
      types/
      utils/
    tenant/
    auth/
    sync/
    content/
    observability/
```

### Qué debe ir aquí

- enums: `TenantMode`, `PermissionScope`, `SyncStatus`, `VisibilityMode`
- interfaces: `TenantContext`, `PermissionContext`, `QueryIntent`, `SyncOperation`, `RepositoryPort`
- dto: `LoginRequestDto`, `CreateLeadDto`, `PublishContentDto`, `SyncAckDto`
- constants: rutas, mensajes, códigos de error, claves de headers
- utils: normalizadores, serializadores, parseadores

## 4. Cómo se comunicarán los proyectos

### Comunicación principal

- Landing -> API: HTTP REST con contratos versionados
- CMS -> API: HTTP REST para contenido, diseño y configuración
- Sistema híbrido -> API: HTTP REST + cola local para sincronización offline
- API -> CMS: respuestas de configuración, contenido y eventos
- CMS -> Landing y sistema: contenido y diseño publicado

### Reglas de comunicación

- Nunca se debe comunicar un proyecto directamente con otra base de datos.
- Toda comunicación debe pasar por la API o por contratos explícitos.
- Los fronts no deben depender de estructuras internas del backend.
- La API será la única fuente de verdad para operaciones reales.

## 5. Reglas de desacoplamiento

- Todo acceso a datos debe pasar por puertos e interfaces.
- Los módulos de negocio no deben conocer detalles de PostgreSQL, SQLite o HTTP.
- El motor se elige en infraestructura y no en el dominio.
- Los DTOs de transporte deben separarse de los modelos de dominio.

## 6. Qué debe contener cada carpeta reutilizable

### `common/enums`

Contiene valores fijos y semánticos del sistema:

- estados de sincronización
- roles y scopes
- tipos de operación
- modos de resolución de tenant

### `common/interfaces`

Define contratos para dependencias externas o puertos:

- `TenantResolverPort`
- `PermissionCheckerPort`
- `QueryExecutorPort`
- `SyncQueuePort`
- `ContentProviderPort`

### `common/dto`

Contiene contratos de entrada y salida compartidos:

- login
- lead capture
- publish content
- sync request/response
- tenant context

### `common/constants`

Contiene nombres de headers, rutas, códigos de error, claves de cache o eventos.

### `common/utils`

Contiene helpers reutilizables como sanitización, parseo de fechas, normalización de tenant o serialización.
