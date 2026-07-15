# Contract Observatory - Observabilidad de APIs y contratos

## Problema

Detectar fallos de contrato, latencia, errores por contexto y degradacion en APIs desacopladas.

## Stack sugerido

- NestJS
- Angular dashboard
- OpenAPI
- PostgreSQL
- Logs estructurados
- OpenTelemetry opcional

## Arquitectura

Middleware de trazas, recolector de eventos, agregador por recurso logico, dashboard de salud y alertas sanitizadas.

## Features demo

- Latencia por endpoint.
- Errores por politica.
- Contexto en cooldown.
- Comparacion contrato esperado vs respuesta mock.

## Evidencia tecnica

- Esquema de eventos.
- Dashboard.
- Pruebas de logging sin secretos.
- Quality scenarios de observabilidad.

## Complejidad

Media-alta. Evitar infraestructura excesiva; simular lo necesario para que la evidencia sea clara.
