# Estructura de carpetas para el sistema híbrido

## Objetivo

El sistema híbrido debe ofrecer una experiencia operativa homogénea en web, desktop y móvil, con soporte offline y sincronización bidireccional.

## Estructura propuesta

```text
sistema-hibrido/
  apps/
    web/
    desktop/
    mobile/
  shared/
    domain/
    application/
    infrastructure/
    ui/
    storage/
    sync/
    config/
```

## Responsabilidades por carpeta

### `apps/web`

- Experiencia operativa para navegador.
- Mantiene la integración con la API y con el almacenamiento local.

### `apps/desktop`

- Shell base para Electron.
- Debe reutilizar la misma lógica que la web.

### `apps/mobile`

- Shell base para Ionic + Capacitor.
- Debe usar la misma capa compartida que web y desktop.

### `shared/domain`

- Entidades, value objects y reglas del negocio operativo.
- No depende de frameworks ni de almacenamiento.

### `shared/application`

- Casos de uso como registrar venta, sincronizar inventario o consultar clientes.
- Aquí van los servicios de aplicación.

### `shared/infrastructure`

- Adaptadores para API, almacenamiento local, sincronización y notificaciones.
- Aquí se implementan puertos y adaptadores para la comunicación.

### `shared/ui`

- Componentes visuales compartidos.
- Debe ser agnóstico al canal.

### `shared/storage`

- Persistencia local, SQLite, IndexedDB o equivalente.
- Guarda operaciones pendientes, snapshots y datos offline.

### `shared/sync`

- Outbox, cola de reintento, reconciliación y sincronización.
- Debe manejar estados como pending, syncing, synced y failed.

## Qué hará el sistema

- Permitir al usuario operar sin internet.
- Guardar cambios en cola local.
- Sincronizar cuando exista conectividad.
- Consumir diseño y configuración del CMS.
- Mostrar datos del negocio con el mismo modelo en web, desktop y móvil.

## DTOs e interfaces recomendados

- `CreateSaleDto`
- `InventoryMovementDto`
- `SyncBatchDto`
- `OfflineOperationDto`
- `ApiClientPort`
- `LocalStoragePort`
- `SyncCoordinatorPort`
- `TenantContextPort`

## Comunicación con otros proyectos

- Consume la API para operaciones reales y permisos.
- Usa almacenamiento local para operaciones offline.
- Recibe diseño y contenido del CMS.
- No debe hablar con bases de datos directamente.
