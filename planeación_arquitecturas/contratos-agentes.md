# Gestión de contratos compartidos entre agentes

## 1. Propósito

Este documento define cómo los agentes deberán proponer, revisar y actualizar los DTOs y contratos compartidos del ecosistema para evitar inconsistencias entre proyectos.

## 2. Regla general

Cada agente podrá proponer contratos cuando:

- esté trabajando en un nuevo módulo,
- necesite intercambiar información con otro proyecto,
- o esté definido un flujo que debe quedar estable para otros agentes.

Los contratos deben registrarse en un lugar público y visible para todos los agentes, para que puedan consultarlos antes de implementar.

## 3. Reglas de seguridad y consistencia

- Todo intercambio de información entre proyectos debe viajar cifrado en tránsito.
- Se recomienda usar un interceptor o middleware de cifrado/desencriptado por proyecto para la información sensible.
- No se debe mezclar español e inglés en nombres de métodos, clases, variables o textos visibles.
- El código debe ser consistente y claro.
- Los nombres deben reflejar lo que hacen, por ejemplo `obtener_usuarios()` o `obtenerUsuarios()`.
- Se debe preferir camelCase en el código.
- Si un componente crece demasiado, se debe desacoplar la lógica a un servicio o capa de aplicación.

## 4. ¿Qué debe registrarse?

Cada propuesta de contrato debe incluir:

- nombre del DTO o interfaz,
- origen del contrato (quién lo propone),
- proyecto que lo consume,
- proyecto que lo produce,
- descripción del uso,
- campos esperados,
- versión inicial,
- estado (`propuesto`, `en revisión`, `aceptado`, `cambio requerido`, `obsoleto`).

## 5. Flujo recomendado para los agentes

### Paso 1: propuesta inicial

El agente que necesite un contrato debe documentarlo con una propuesta mínima:

```md
### Contrato: CreateLeadRequest
- Propuesto por: Landing
- Consume: API
- Produce: Landing
- Estado: propuesto
- Versión: 0.1
```

### Paso 2: definir el contrato

Debe incluir campos como:

```ts
interface CreateLeadRequest {
  tenantSlug: string;
  source: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
}
```

### Paso 3: revisión cruzada

Los otros agentes pueden revisar si:

- el contrato cubre la necesidad real,
- el nombre es claro,
- los campos son suficientes,
- no se mezclan conceptos de negocio con presentación,
- y el contrato es suficientemente estable para implementar.

### Paso 4: aceptación y registro

Cuando el contrato sea aceptado, debe pasar a estado `aceptado` y quedar en la documentación pública como contrato oficial del proyecto.

## 6. Reglas de diseño de DTOs

- Los DTOs deben ser simples y explícitos.
- Deben separar transporte de dominio.
- No deben incluir lógica de negocio.
- No deben depender de estructuras internas del frontend o del backend.
- Deben ser versionados de forma progresiva.
- Si cambian, deben documentar la nueva versión y el impacto.

## 7. Estructura sugerida de registro

```md
## Contratos compartidos

| Nombre | Origen | Consume | Produce | Estado | Versión | Observaciones |
|---|---|---|---|---|---|---|
| CreateLeadRequest | Landing | API | Landing | Propuesto | 0.1 | Pendiente revisión |
| TenantContext | API | CMS, Landing, Sistema | API | Propuesto | 0.1 | Requiere permisos definidos |
| SyncOperation | Sistema híbrido | API | Sistema híbrido | Propuesto | 0.1 | Requiere estado offline |
```

## 8. DTOs iniciales recomendados

### Autenticación y tenant

- `LoginRequest`
- `LoginResponse`
- `TenantContext`
- `TenantResolutionRequest`

### Contenido y diseño

- `ContentPageResponse`
- `ContentBlockResponse`
- `PublishContentRequest`
- `DesignConfigResponse`

### Landing y leads

- `CreateLeadRequest`
- `CreateLeadResponse`
- `LeadFormConfigResponse`

### Sistema híbrido y sincronización

- `SyncOperation`
- `SyncAck`
- `OfflineMutation`
- `SyncStatusResponse`

### Permisos

- `PermissionCheckRequest`
- `PermissionCheckResponse`
- `RoleAssignmentRequest`

## 9. Cómo se gestionan los cambios

Cuando un agente necesite cambiar un contrato:

1. se marca como `cambio requerido` o `en revisión`,
2. se documenta qué cambia y por qué,
3. se notifica al resto de agentes,
4. y se actualiza la versión del contrato.

## 10. Qué debe hacer cada agente

### Agente de API

- definir los DTOs que la API espera recibir y devolver,
- asegurar que los contratos se alineen con permisos y tenant,
- y publicar los contratos base para los otros equipos.

### Agente de CMS

- definir cómo el CMS entrega contenido, diseño y formularios,
- y publicar los contratos que esperan recibir landing y sistema.

### Agente de landing

- proponer los DTOs que necesita para renderizar contenido y capturar leads,
- y verificar que los contratos respeten la API y el CMS.

### Agente de sistema híbrido

- proponer los DTOs de sincronización y negocio operativo,
- y definir cómo se representarán las operaciones offline y las respuestas del backend.

## 11. Rol de coordinación y seguimiento

Debe existir una figura de coordinación o Project Manager que:

- orqueste los contratos compartidos,
- notifique a los agentes cuando otro proyecto solicita confirmación de un DTO,
- registre cuándo un contrato ya fue cerrado o aprobado,
- y recuerde a todos que documenten su avance al terminar una tarea o módulo completo.

## 12. Regla de trabajo

Los contratos no deben implementarse a ciegas ni de forma aislada. Cada nuevo DTO o interfaz debe publicarse en esta documentación antes de comenzar su implementación, para que el resto de agentes pueda consultarlo y dar feedback.

Además, al terminar una tarea o módulo, cada agente debe actualizar la documentación pública con el estado real de lo que quedó implementado, pendiente o bloqueado.
