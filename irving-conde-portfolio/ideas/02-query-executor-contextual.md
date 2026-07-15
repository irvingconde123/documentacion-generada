# Query Executor - Ejecutor desacoplado por contexto

## Problema

Ejecutar consultas o acciones sin acoplar UI, API o modulo de negocio al motor fisico, host, tabla, endpoint o base de datos.

## Idea central

Una peticion declara una intencion logica:

```ts
{
  contexto: "Ventas",
  interfaz: "ResumenDiario",
  parametros: { sucursalId: "MX-01" }
}
```

La arquitectura resuelve permisos, fuente de verdad, motor, conexion, query y formato de salida.

## Stack sugerido

- NestJS
- TypeScript
- PostgreSQL / MySQL / fuentes mock
- TypeORM o drivers por adaptador
- Redis opcional para cache
- Angular para consola visual

## Arquitectura

1. `QueryIntent`
2. Validador de permisos
3. Resolvedor de contexto
4. Selector de interfaz
5. Adaptador de fuente de verdad
6. Ejecutor
7. Normalizador de respuesta
8. Auditoria y trazabilidad

## Features demo

- Consola para ejecutar consultas sanitizadas por recurso logico.
- Cambio de fuente mock/remota/local.
- Politicas por rol.
- Trazabilidad de resolucion.
- Fallos aislados por contexto.

## Evidencia tecnica

- Contratos `QueryIntent`, `ExecutionContext`, `TruthSourceAdapter`.
- Matriz de politicas.
- Pruebas de rutas invalidas.
- Diagrama de resolucion.
- ADR de seguridad: no aceptar SQL libre desde cliente.

## Complejidad

Alta. Debe aterrizarse con casos concretos para no parecer sobreingenieria.
