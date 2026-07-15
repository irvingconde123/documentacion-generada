# API central

## Propósito

Ser el núcleo de integración y negocio para landing, sistema híbrido y CMS, con soporte multi-tenant, permisos por rol y arquitectura extensible.

## Decisiones consolidadas

- Se implementará en NestJS.
- El tenancy se resolverá por subdominio y dominio, con fallback por header para entornos controlados.
- Los permisos del CMS y del sistema operativo serán distintos.
- PostgreSQL será el motor principal, pero la arquitectura debe permitir adaptadores para otros motores en el futuro.
- La lógica para resolver motor, fuente, query y permisos se desacoplará mediante un executor contextual.
- La observabilidad será seria: logs técnicos y eventos de negocio separados.
- La API deberá estar preparada para integrar Redis, mensajería o workers sin reescribir lógica de negocio.

## Instrucciones de implementación

1. Definir contratos estrictos para entradas y salidas.
2. Centralizar autenticación, permisos y tenancy en módulos core.
3. Separar acceso a datos de lógica de negocio mediante puertos e interfaces.
4. Exponer eventos de negocio para auditar y para que el CMS pueda consumir información de contexto.
5. Mantener el entorno configurable con variables como `DATABASE_OPERATIONAL_URL` y `DATABASE_CMS_URL`.

## Arquitectura propuesta

```text
api/
  src/
    app/
      core/
      modules/
      shared/
      infrastructure/
    test/
    docs/
```

## Responsabilidades por carpeta

- core: configuración, auth, tenancy, interceptores, guards y middleware de observabilidad
- modules: dominios funcionales como ventas, inventario, clientes, contenido y sincronización
- shared: contratos, utilidades, modelos compartidos y DTOs
- infrastructure: adaptadores, puertos, repositorios, observabilidad, workers y servicios de integración

## Reglas de arquitectura

- NestJS como base.
- Todo acceso a datos debe pasar por puertos e interfaces.
- El motor de base de datos debe ser elegido por adaptador, no por la lógica de negocio.
- Debe existir un executor contextual para consultas y acciones desacopladas.
- Debe soportar módulo de sincronización offline y observabilidad de contratos.

## Comunicación esperada

- Recibe del sistema: solicitudes operativas, eventos offline y peticiones de sincronización
- Recibe del CMS: operaciones de contenido, configuración, diseño y permisos
- Recibe de la landing: leads y formularios públicos
- Responde a todos: contratos consistentes, trazabilidad y estados transaccionales
