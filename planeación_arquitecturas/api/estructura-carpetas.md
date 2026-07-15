# Estructura de carpetas para la API

## Objetivo

La API será el núcleo del sistema. Debe resolver autenticación, tenant, permisos, negocio, consultas contextuales, sincronización offline y observabilidad.

## Estructura propuesta

```text
api/
  src/
    app/
      bootstrap/
      common/
        decorators/
        enums/
        interfaces/
        dto/
        guards/
        interceptors/
        filters/
        pipes/
        utils/
      modules/
        auth/
          application/
          domain/
          infrastructure/
          presentation/
        tenant/
        permissions/
        inventory/
        sales/
        customers/
        content/
        sync/
        query-executor/
        observability/
      shared/
        contracts/
        ports/
        adapters/
        mappers/
      infrastructure/
        databases/
        repositories/
        cache/
        messaging/
        external-services/
        orm/
    test/
    docs/
```

## Responsabilidades por carpeta

### `bootstrap`

- Inicializa la aplicación.
- Registra módulos, middlewares, interceptores, filtros y configuración global.

### `common`

- Contiene elementos reutilizables del sistema.
- Aquí van guards, interceptores, enums, DTOs base, decoradores y utilidades.

### `modules`

Cada módulo debe seguir esta división:

- `domain`: entidades, value objects y reglas de negocio
- `application`: casos de uso y servicios de aplicación
- `infrastructure`: repositorios, adaptadores y acceso a dependencias externas
- `presentation`: controladores, DTOs de entrada/salida y validadores

### `shared`

- Mantiene contratos compartidos entre módulos.
- Aquí van los puertos e interfaces para repositorios, servicios externos y adaptadores.

### `infrastructure`

- Encapsula todo lo técnico.
- Aquí se implementan los adaptadores que resuelven PostgreSQL, cache, mensajería o servicios terceros.

## Qué hará cada parte importante

### Autenticación

- Validará usuarios, tokens y sesión.
- Devolverá contextos de usuario autenticado.

### Tenant

- Resolverá subdominio, dominio o header.
- Inyectará el contexto del negocio activo.

### Permisos

- Evaluará permisos efectivos por rol y módulo.
- Separará permisos de CMS y sistema operativo.

### Query executor contextual

- Recibirá una intención lógica como: ventas, inventario, contenido o diseño.
- Resolverá motor, fuente, permisos y estrategia de ejecución.
- No permitirá SQL libre desde cliente.

### Sync

- Recibirá operaciones offline desde los fronts.
- Las registrará, validará y procesará con idempotencia.

### Observabilidad

- Capturará logs técnicos y eventos de negocio.
- Debe separar trazas de auditoría.

## DTOs e interfaces recomendados

- `LoginRequestDto`, `LoginResponseDto`
- `TenantContextDto`
- `PermissionCheckDto`
- `QueryIntentDto`
- `SyncOperationDto`
- `SyncAckDto`
- `TenantResolverPort`
- `PermissionCheckerPort`
- `QueryExecutorPort`
- `SyncOutboxPort`
- `ContentProviderPort`
